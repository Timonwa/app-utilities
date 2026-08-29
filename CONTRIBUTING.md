# Contributing

Bug reports, fixes, and new functions are all welcome. For anything bigger than a small fix, open an issue first so we can agree on the shape before you write it.

## Setup

You need Node 20+ and pnpm (run `corepack enable` to get the version the repo pins). Then install and run the full quality gate:

```bash
pnpm install
pnpm verify   # typecheck, lint, test, build, publint, attw, README freshness — the same gate CI runs
```

## What gets accepted

- **Generic helpers any app can use.** Nothing tied to one product — watermark ids, allowed file types, maintenance codes, and OG endpoints are all parameters with sensible defaults, never baked-in values.
- **Universal by default.** New functions go in `src/` and must run anywhere — Node, browser, edge, React Native. Only put something in `src/browser/` if it touches `window`, `document`, `navigator`, or `localStorage` — and guard for that API being absent so a stray import during SSR degrades instead of throwing.
- **Wrapping a dependency is fine, but it has to add something** — a better name, a different default, extra behaviour. A one-line re-export under the same name is indirection with no payoff.

## Adding a function

- **One file per function**, kebab-cased after it, inside its module folder — `src/string/mask-string.ts`. Internal helpers a module shares live in that module's `_shared.ts` and never reach the barrel.
- **Export it explicitly** from the module's `index.ts`, one line per symbol, alphabetical. Only the entry-point barrels compose with `export *`.
- **Verb-first, full words.** `convertBytesToMegabytes`, not `toMB`. The prefixes carry contracts: `parse*` returns `T | null` and never guesses, `format*` degrades and never throws, `convert*` is exact and never rounds.
- **Write the JSDoc — it becomes the README.** The API reference is generated from your docblock by `pnpm docs:api`, and `pnpm verify` fails while the README is stale, so regenerate it in the same change.
- **Tests cover the edges, not the happy path alone.** The zero, the negative, the `NaN`, the value that overflows the largest unit.

## Submitting a change

1. Fork the repo and create a branch from `main`.
2. Make your change and run `pnpm verify` — a green run locally means a green PR.
3. Add a changeset for anything that affects the published package:

   ```bash
   pnpm changeset
   ```

   Pick the bump — patch for a fix, minor for a new function, major for a breaking change — and describe it in a sentence a consumer would understand.

4. Open a pull request against `main` describing what changed and why.

## What happens after your PR merges

Your changeset joins a "Version Packages" PR that changesets keeps open on `main`; when that PR merges, every pending change publishes to npm in one release. So your change ships with the next version merge rather than the moment your PR lands — and none of it needs credentials or npm access from you.
