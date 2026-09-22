// Re-reads every GitHub number in data/entries.json. Star counts written once
// and never revisited go stale within days, and a stale number in a list that
// ranks by numbers is worse than no number at all.
// Uses GITHUB_TOKEN when present (CI always has one); works unauthenticated
// too, at 60 requests an hour, which is not enough for a full pass.
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("../data/entries.json", import.meta.url);
const data = JSON.parse(readFileSync(file, "utf8"));
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "jev-in-the-wild",
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

const targets = data.entries.filter((e) => e.repo?.slug);
console.log(`refreshing ${targets.length} repositories${token ? "" : " (unauthenticated - expect rate limiting)"}`);

let changed = 0;
let gone = 0;
const CONCURRENCY = 8;
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < targets.length) {
      const e = targets[cursor++];
      let res;
      try {
        res = await fetch(`https://api.github.com/repos/${e.repo.slug}`, { headers });
      } catch (err) {
        console.log(`  ${e.repo.slug}: network error, left untouched (${err.message})`);
        continue;
      }
      if (res.status === 404) {
        // Deleted or gone private. Flagged, not silently dropped: a human
        // decides whether the entry still belongs.
        e.repo.missing = true;
        gone++;
        continue;
      }
      if (!res.ok) {
        console.log(`  ${e.repo.slug}: HTTP ${res.status}, left untouched`);
        continue;
      }
      const r = await res.json();
      const stars = r.stargazers_count ?? 0;
      const before = e.metric?.value;
      if (e.metric?.type === "stars" && before !== stars) {
        e.metric.value = stars;
        changed++;
      }
      e.repo.archived = Boolean(r.archived);
      e.repo.license = r.license?.spdx_id ?? "";
      e.repo.language = r.language ?? "";
      e.repo.pushedAt = r.pushed_at ?? e.repo.pushedAt;
      delete e.repo.missing;
      // A repo that earns its first star graduates; one that loses them all
      // goes back. The boundary is the same in both directions.
      if (e.metric?.type === "stars") e.tier = stars >= 1 ? "listed" : "unproven";
    }
  }),
);

data.generatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`${changed} star count(s) changed, ${gone} repository(ies) now unreachable`);
