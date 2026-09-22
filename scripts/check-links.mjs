// Every link in data/entries.json, checked. A dead link in a list of links is
// the one defect that makes the whole list untrustworthy, so this runs in CI.
// Exit code 1 only on hard failures (404/410): a 403 from a site that dislikes
// robots is not the link's fault.
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../data/entries.json", import.meta.url), "utf8"));
const entries = data.entries;
const CONCURRENCY = 10;
const dead = [];
const soft = [];
let done = 0;

async function probe(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 15000);
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctl.signal,
      headers: { "user-agent": "jev-in-the-wild link checker (+https://github.com/Jessie-QingYu/jev-in-the-wild)" } });
    // Plenty of sites refuse HEAD but answer GET.
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, { method: "GET", redirect: "follow", signal: ctl.signal,
        headers: { "user-agent": "jev-in-the-wild link checker (+https://github.com/Jessie-QingYu/jev-in-the-wild)" } });
    }
    return res.status;
  } catch (err) {
    return err.name === "AbortError" ? "timeout" : "error";
  } finally {
    clearTimeout(timer);
  }
}

let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < entries.length) {
      const e = entries[cursor++];
      const status = await probe(e.url);
      done++;
      if (status === 404 || status === 410) dead.push({ status, ...e });
      else if (typeof status !== "number" || status >= 400) soft.push({ status, url: e.url });
    }
  }),
);

console.log(`checked ${done} links`);
if (soft.length) {
  console.log(`\n${soft.length} unverifiable (blocked, rate-limited or slow — not treated as dead):`);
  for (const s of soft) console.log(`  ${s.status}  ${s.url}`);
}
if (dead.length) {
  console.log(`\n${dead.length} DEAD:`);
  for (const d of dead) console.log(`  ${d.status}  ${d.id}  ${d.url}`);
  process.exit(1);
}
console.log("no dead links");
