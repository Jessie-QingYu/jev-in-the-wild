// data/*.json -> README.md. The README is a build artifact: edit the data,
// never the markdown, or the next run will overwrite you.
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const data = read("../data/entries.json");
const curated = read("../data/curated.json");
const REPO = "Jessie-QingYu/jev-in-the-wild";

const cell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
const link = (e) => `[${cell(e.title.replace(/[[\]]/g, ""))}](${e.url})`;
const compact = (n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  : n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
  : String(n);

const MARK = { stars: "★", points: "▲", views: "▶", likes: "♥" };
const signal = (e) => (e.metric && e.metric.value > 0 ? `${MARK[e.metric.type]} ${compact(e.metric.value)}` : "—");
// shields.io reads a bare "-" as a field separator; a literal one is "--".
const badge = (s) => String(s).replace(/-/g, "--");
const KIND = { code: "code", usecase: "use case", opinion: "opinion", official: "official" };

// Numbers from different platforms are not comparable - 900 Reddit points and
// 900 stars are not the same event - so entries are ranked against others
// measured the same way, and the percentiles are what get compared.
function ranked(entries) {
  const pools = new Map();
  for (const e of entries) {
    const t = e.metric?.type;
    if (!t) continue;
    if (!pools.has(t)) pools.set(t, []);
    pools.get(t).push(e.metric.value);
  }
  for (const [, values] of pools) values.sort((a, b) => a - b);
  const pct = (e) => {
    if (!e.metric) return -1;
    const values = pools.get(e.metric.type);
    const below = values.filter((v) => v < e.metric.value).length;
    return below / Math.max(values.length - 1, 1);
  };
  return [...entries].sort((a, b) => {
    const d = pct(b) - pct(a);
    if (Math.abs(d) > 1e-9) return d;
    return (b.publishedAt ?? b.addedAt).localeCompare(a.publishedAt ?? a.addedAt);
  });
}

const table = (entries) =>
  [
    "| What | What it does | Kind | Signal | Date |",
    "| --- | --- | --- | --- | --- |",
    ...ranked(entries).map(
      (e) =>
        `| ${link(e)} | ${cell(e.summary)} | ${KIND[e.kind]} | ${signal(e)} | ${e.publishedAt ?? e.addedAt} |`,
    ),
  ].join("\n");

const listed = data.entries.filter((e) => e.tier === "listed");
const listedCount = () => listed.length;
const unproven = data.entries.filter((e) => e.tier === "unproven");
const byId = new Map(data.entries.map((e) => [e.id, e]));
const count = (arr, fn) => arr.filter(fn).length;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const languages = Object.entries(
  data.entries.reduce((acc, e) => {
    if (e.repo?.language) acc[e.repo.language] = (acc[e.repo.language] ?? 0) + 1;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);

// Only meaningful once the index has a past. While it is young, nearly every
// entry was added this week, and a "new this week" section that repeats the
// whole list tells the reader nothing.
const RECENT_MAX_SHARE = 0.25;
const recentAll = data.entries.filter((e) => {
  const days = (Date.parse(data.generatedAt) - Date.parse(e.addedAt)) / 86_400_000;
  return days >= 0 && days <= 7 && e.tier === "listed";
});
const recent = recentAll.length <= Math.max(listedCount() * RECENT_MAX_SHARE, 1) ? recentAll : [];

// Anything a human called mixed or negative. Every other list about Jev is
// promotional by construction; this section is the reason this one is not.
const critical = data.entries.filter((e) => e.sentiment === "negative" || e.sentiment === "mixed");

const out = [];
const w = (...lines) => out.push(...lines);

w(
  "# Jev in the wild",
  "",
  "**Real-world use cases, open-source projects, benchmarks and criticism of [Jev](https://typesafe.ai), TypeSafe AI's System One model — what people actually build with it, and where it actually fails.**",
  "",
  `![entries](https://img.shields.io/badge/entries-${listed.length}-2f81f7) ![open source](https://img.shields.io/badge/open%20source%20projects-${count(data.entries, (e) => e.repo)}-2f81f7) ![updated](https://img.shields.io/badge/updated-${badge(data.generatedAt)}-2f81f7) ![data license](https://img.shields.io/badge/data-CC0--1.0-2f81f7)`,
  "",
  "Three things make this different from the other Jev lists:",
  "",
  `1. **It is not only GitHub.** ${count(listed, (e) => !e.repo)} of the ${listed.length} entries are Reddit threads, Hacker News posts, YouTube evaluations and blog write-ups — where most of the first-hand reporting actually happens.`,
  "2. **It includes the criticism.** An awesome list is promotional by construction. This one has a [section for what does not work](#where-jev-struggles), and negative results are welcome in every other section too.",
  "3. **It is data, not prose.** [`data/entries.json`](data/entries.json) is the source of truth and this README is generated from it. Fork the data, build something better, no scraping required.",
  "",
  "**Live companion:** [the tracker this index is built from](https://jessie.romeos.cc/full/apps/jev-tracker) — everything the daily scan has ever found, searchable and filterable, including the candidates that did not clear the bar for this list. It runs on a personal instance, so this repository, not the site, is the durable copy.",
  "",
  "*Not affiliated with TypeSafe AI. Not exhaustive — see [how this is built](#how-this-list-is-built).*",
  "",
  "---",
  "",
  "## Contents",
  "",
  "- [Numbers at a glance](#numbers-at-a-glance)",
  "- [Ten worth opening first](#ten-worth-opening-first)",
  "- [Where Jev struggles](#where-jev-struggles)",
  ...(recent.length ? ["- [Added this week](#added-this-week)"] : []),
  "- [Browse by category](#browse-by-category)",
  ...data.categories.map((c) => `  - [${c.name}](#${slug(c.name)})`),
  "- [New and unproven](#new-and-unproven)",
  "- [How this list is built](#how-this-list-is-built)",
  "- [Contributing](#contributing)",
  "- [License](#license)",
  "",
  "## Numbers at a glance",
  "",
  "| | |",
  "| --- | --- |",
  `| Entries | **${listed.length}** listed, ${unproven.length} unproven |`,
  `| Open-source projects | ${count(data.entries, (e) => e.repo)} |`,
  `| Reported use cases | ${count(listed, (e) => e.kind === "usecase")} |`,
  `| Analysis and criticism | ${count(listed, (e) => e.kind === "opinion")} |`,
  `| Official from TypeSafe AI | ${count(listed, (e) => e.kind === "official")} |`,
  `| Where the entries come from | GitHub ${count(data.entries, (e) => e.source === "github")}, Reddit ${count(data.entries, (e) => e.source === "reddit")}, YouTube ${count(data.entries, (e) => e.source === "youtube")}, Hacker News ${count(data.entries, (e) => e.source === "hackernews")}, blogs and web ${count(data.entries, (e) => e.source === "blog" || e.source === "web")} |`,
  `| Languages of the code | ${languages.slice(0, 6).map(([l, n]) => `${l} ${n}`).join(", ")} |`,
  `| Categories | ${data.categories.length} |`,
  `| Last refreshed | ${data.generatedAt} |`,
  "",
  `Signals: ★ GitHub stars · ▲ Reddit or Hacker News points · ▶ views · ♥ likes. They come from four different platforms and **are not comparable with each other** — they are a popularity reading, never a quality one.`,
  "",
  "## Ten worth opening first",
  "",
  "Hand-picked, and picked for evidence rather than for stars: an entry is here because it reports what it measured.",
  "",
);

for (const [i, p] of curated.picks.entries()) {
  const e = byId.get(p.id);
  // A curated pick whose entry has been removed used to surface as an
  // unreadable TypeError three frames deep. validate.mjs catches it, but the
  // builder has to say so itself for anyone who runs it alone.
  if (!e) {
    console.error(`data/curated.json points at "${p.id}", which is not in data/entries.json.`);
    console.error("Remove the pick, or restore the entry, then run this again.");
    process.exit(1);
  }
  w(`${i + 1}. **${link(e)}** — ${cell(p.why)}  `, `   <sub>${KIND[e.kind]} · ${e.categoryName} · ${signal(e)} · ${e.sourceLabel ?? e.source} · ${e.publishedAt ?? e.addedAt}</sub>`, "");
}

w(
  "## Where Jev struggles",
  "",
  "Every other Jev list is a highlight reel. These are the entries that report a limit, a failure, a disappointing benchmark or a claim that did not survive checking — the ones worth reading before you commit an architecture to a typed-decision model.",
  "",
  table(critical),
  "",
  `<sub>${critical.length} entries judged mixed or negative. Judged on what the item itself reports, not on whether we agree with it.</sub>`,
  "",
);

if (recent.length) {
  w(
    "## Added this week",
    "",
    `${recent.length} entries added in the seven days to ${data.generatedAt}.`,
    "",
    table(recent),
    "",
  );
}

w("## Browse by category", "");

for (const c of data.categories) {
  const rows = listed.filter((e) => e.category === c.id);
  if (!rows.length) continue;
  w(`### ${c.name}`, "", `*${c.description}* — ${rows.length} entries`, "", table(rows), "");
}

w(
  "## New and unproven",
  "",
  `${unproven.length} GitHub repositories that nobody has starred yet. They are kept apart from the list above and kept in the index anyway: unproven is not the same as bad, and a repository published yesterday has had no chance to be either. They graduate automatically on their first star.`,
  "",
  "<details>",
  "<summary>Show the unproven list</summary>",
  "",
  table(unproven),
  "",
  "</details>",
  "",
  "## How this list is built",
  "",
  "**Where the entries come from.** A scanner runs daily across GitHub, Reddit, Hacker News, YouTube, TypeSafe AI's own pages and the open web, and proposes candidates. Every entry is then filed by category and given a one-or-two-sentence summary. **The summaries are original** — written for this index, never copied from the project's own README or post.",
  "",
  "**What gets in.** Something you can run, a first-hand report of a job actually done, a benchmark with numbers, an official release, or criticism with an argument behind it.",
  "",
  "**What stays out.** Reposted news, \"what is Jev\" explainers with nothing behind them, reaction videos, and anything whose only claim is that Jev exists. A repository with no stars is not rejected — it goes to [New and unproven](#new-and-unproven).",
  "",
  `**The site and this list are not the same set.** The [live tracker](https://jessie.romeos.cc/full/apps/jev-tracker) shows every candidate the scan has found — currently more than the ${listed.length} listed here — because it is the raw feed. This list is the filtered one: after the first import, a new entry has to clear a bar before it is added (3+ GitHub stars, 10+ forum points, 1000+ video views; TypeSafe AI's own releases always, and an article on a formed judgment). So the site answers "what is out there", and this list answers "what has anyone else noticed".`,
  "",
  "**What is automated and what is not.** The long tables are maintained automatically: numbers are re-read from the GitHub API daily, and the README is regenerated from the data. [Ten worth opening first](#ten-worth-opening-first) is chosen by hand, the reasons are written by hand, and every incoming pull request is reviewed by a person. Nothing merges itself.",
  "",
  "**How the ordering works.** Within a table, entries are ranked against others *measured the same way* — a repository against repositories, a Reddit thread against Reddit threads — and those ranks are what get compared. Mixing a star count with a view count in one sort would invent a comparison that does not exist.",
  "",
  "**What this is not.** Not exhaustive, not affiliated with TypeSafe AI, and not an endorsement of anything listed. A link here means someone did something with Jev and left a record of it.",
  "",
  "## Contributing",
  "",
  "Pull requests are welcome, and they should **edit [`data/entries.json`](data/entries.json), never `README.md`** — the README is generated and your changes to it will be overwritten on the next build.",
  "",
  "```bash",
  "# add or edit an entry in data/entries.json, then:",
  "node scripts/validate.mjs      # schema, duplicate links, broken curated ids",
  "node scripts/build-readme.mjs  # regenerate README.md",
  "node scripts/check-links.mjs   # optional, slow: every link",
  "```",
  "",
  "See [CONTRIBUTING.md](CONTRIBUTING.md) for the entry format and the bar an entry has to clear. Corrections are as welcome as additions — if a summary here misrepresents your project, open a PR or an issue and it will be fixed.",
  "",
  "## License",
  "",
  "- **Data** (`data/`) — [CC0 1.0](LICENSE-DATA). Public domain. Take it and build whatever you want.",
  "- **Scripts** (`scripts/`) — [MIT](LICENSE).",
  "- Linked projects belong to their authors under their own licenses.",
  "",
  `<sub>Generated from \`data/entries.json\` on ${data.generatedAt} · [how this is built](#how-this-list-is-built)</sub>`,
  "",
);

writeFileSync(new URL("../README.md", import.meta.url), `${out.join("\n")}`);
console.log(`README.md written: ${listed.length} listed, ${unproven.length} unproven, ${critical.length} critical, ${recent.length} this week`);
