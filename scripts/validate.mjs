// Validates data/*.json against data/schema.json, plus the rules a schema
// cannot express (duplicate links, curated ids that point nowhere).
// A deliberately small JSON Schema subset - the alternative is a dependency,
// and a list of links should not need a node_modules to check itself.
import { readFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const schema = read("../data/schema.json");
const data = read("../data/entries.json");
const curated = read("../data/curated.json");

const errors = [];
const fail = (path, msg) => errors.push(`${path}: ${msg}`);

function check(value, node, path) {
  if (!node) return;
  const types = node.type ? (Array.isArray(node.type) ? node.type : [node.type]) : null;
  if (types) {
    const actual = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
    const ok = types.some((t) => (t === "integer" ? Number.isInteger(value) : t === actual));
    if (!ok) return fail(path, `expected ${types.join("|")}, got ${actual}`);
  }
  if (node.enum && !node.enum.includes(value ?? null)) {
    return fail(path, `${JSON.stringify(value)} is not one of ${JSON.stringify(node.enum)}`);
  }
  if (value === null || value === undefined) return;
  if (typeof value === "string") {
    if (node.pattern && !new RegExp(node.pattern).test(value)) fail(path, `does not match ${node.pattern}`);
    if (node.minLength && value.length < node.minLength) fail(path, `shorter than ${node.minLength}`);
    if (node.maxLength && value.length > node.maxLength) fail(path, `longer than ${node.maxLength}`);
  }
  if (typeof value === "number" && node.minimum !== undefined && value < node.minimum) {
    fail(path, `below ${node.minimum}`);
  }
  if (Array.isArray(value) && node.items) value.forEach((v, i) => check(v, node.items, `${path}[${i}]`));
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of node.required ?? []) {
      if (value[key] === undefined) fail(path, `missing required "${key}"`);
    }
    for (const [key, sub] of Object.entries(node.properties ?? {})) {
      if (value[key] !== undefined) check(value[key], sub, `${path}.${key}`);
    }
  }
}

check(data, schema, "entries.json");

// Rules the schema cannot state.
const seenId = new Map();
const seenUrl = new Map();
const categoryIds = new Set(data.categories.map((c) => c.id));
for (const e of data.entries) {
  const at = `entry ${e.id}`;
  if (seenId.has(e.id)) fail(at, "duplicate id");
  seenId.set(e.id, e);
  const key = e.url.replace(/\/$/, "").toLowerCase();
  if (seenUrl.has(key)) fail(at, `duplicate link, already used by ${seenUrl.get(key)}`);
  seenUrl.set(key, e.id);
  if (!categoryIds.has(e.category)) fail(at, `unknown category "${e.category}"`);
  if (e.repo && e.tier === "listed" && (e.metric?.value ?? 0) < 1) {
    fail(at, 'a repository with no stars belongs in tier "unproven"');
  }
  if (e.summary.trim() === e.title.trim()) fail(at, "summary just repeats the title");
}

for (const p of curated.picks) {
  if (!seenId.has(p.id)) fail(`curated ${p.id}`, "points at an entry that does not exist");
  if (!p.why || p.why.length < 40) fail(`curated ${p.id}`, "needs a real reason, not a label");
}

if (errors.length) {
  console.error(`${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`ok: ${data.entries.length} entries, ${data.categories.length} categories, ${curated.picks.length} curated`);
