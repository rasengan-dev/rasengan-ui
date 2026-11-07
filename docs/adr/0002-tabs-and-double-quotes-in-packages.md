# ADR-0002 — `packages/` and `scripts/` keep tabs and double quotes; the root Prettier config does not apply there

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-01 |
| Replaces | — |

## Context

The root `.prettierrc.json` dates from v1: two spaces, single quotes, 100 columns. The v2 code in `packages/core`,
`packages/villages`, `packages/cli`, `packages/motion`, `registry/` and `scripts/*.mjs` was written with tabs, double
quotes and lines up to about 150 columns. Nothing runs Prettier on commit (the Husky pre-commit hook runs `npm test`),
so the two styles lived side by side unnoticed until `prettier --write` reformatted new files in `packages/villages` into
the v1 style.

`apps/site` follows the root config (two spaces, single quotes).

## Decision

- In `packages/`, `registry/` and `scripts/`: tabs, double quotes, about 150 columns. Match the file you are in.
- To format a new file there, pass the style explicitly:
  `prettier --use-tabs --no-single-quote --print-width 150 <files>`.
- Never run `pnpm format` (the root config over the whole repository).

## Options ruled out

- **Reformat everything to the root config**: a large diff over code that is fine, with no gain.
- **Change the root config to tabs**: `apps/site` and the v1 archive would be reformatted instead.

## Consequences

- Two styles in one repository, split by folder. A contributor's editor may pick the wrong one; the rule is in
  `CLAUDE.md` and `CONTRIBUTING.md`.

## Revisit when

A formatter runs in CI or on commit: then add a Prettier `overrides` entry for these folders, so the config says what
this ADR says.
