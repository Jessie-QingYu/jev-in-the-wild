# Contributing

Additions, corrections and removals are all welcome. One rule above all others:

> **Edit `data/entries.json`. Never edit `README.md`.**
> The README is generated from the data and your changes to it will be erased by the next build.

## Adding an entry

1. Add an object to the `entries` array in [`data/entries.json`](data/entries.json).
2. Run the checks:

   ```bash
   node scripts/validate.mjs      # schema, duplicate links, dangling curated ids
   node scripts/build-readme.mjs  # regenerate README.md
   ```

3. Commit **both** `data/entries.json` and the regenerated `README.md`.

### The shape of an entry

```json
{
  "id": "e_yourshortid",
  "title": "Classified 261 IRS forms at 100% accuracy",
  "summary": "A tax-page classifier reports 100% strict accuracy at about $0.001 per page, 34x cheaper and 6x faster than its previous LLM pipeline.",
  "url": "https://github.com/owner/repo",
  "kind": "usecase",
  "category": "routing",
  "categoryName": "Classification and routing",
  "source": "github",
  "sourceLabel": "owner/repo",
  "author": "owner",
  "publishedAt": "2026-09-18",
  "addedAt": "2026-09-20",
  "metric": { "type": "stars", "value": 361 },
  "sentiment": null,
  "tags": ["tax documents", "classification", "cost"],
  "repo": { "slug": "owner/repo", "archived": false, "license": "MIT", "language": "Python", "pushedAt": "2026-09-20T00:00:00Z" },
  "tier": "listed"
}
```

[`data/schema.json`](data/schema.json) is authoritative; `validate.mjs` enforces it.

- **`title`** — what the thing *does*, in the active voice. Not the project's slogan, not `owner/repo`.
- **`summary`** — one or two sentences, **written by you**. Do not paste the project's README or the post's first paragraph. Prefer the number over the adjective: "3.15% down over 731 trades" beats "did not perform well".
- **`kind`** — `code` (you can run it), `usecase` (a report of a job done), `opinion` (analysis, review, criticism), `official` (from TypeSafe AI).
- **`metric`** — whatever the host platform counts, and nothing else. Do not invent one.
- **`tier`** — `unproven` for a GitHub repository with no stars yet, `listed` otherwise. The daily job moves entries between the two on its own.
- **`sentiment`** — set `mixed` or `negative` when the item itself reports a limit, a failure or a claim that did not hold up. That is what fills [Where Jev struggles](README.md#where-jev-struggles), and it is the most valuable field in this file.

## The bar

**In:** something you can run · a first-hand report of a job actually done · a benchmark with numbers · an official release · criticism with an argument behind it.

**Out:** reposted news · "what is Jev" explainers with nothing behind them · reaction videos · anything whose only claim is that Jev exists · link-farm repositories.

A repository with no stars is **not** rejected — it goes to `tier: "unproven"` and graduates on its first star.

## Submitting your own project

Encouraged, and say so in the PR. The bar is the same as for everything else, and self-submissions are held to the summary rule strictly: describe what it does, not why it is great.

## Corrections

If a summary here misrepresents your project, open a PR or an issue. Corrections are merged faster than additions, and an author's own correction of their own project is taken at face value.

## What happens after you open a PR

CI validates the schema, checks for duplicate links and rebuilds the README to confirm it matches your data. A human reads every pull request. **Nothing merges itself.**
