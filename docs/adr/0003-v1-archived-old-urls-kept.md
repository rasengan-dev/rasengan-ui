# ADR-0003 — v1 lives in `archive/`; its JSON and images stay served at their old URLs

| | |
|---|---|
| Status | Accepted |
| Date | 2026-10-31 |
| Replaces | RFC-0002, "Switch-over" (the details it left open) |

## Context

Rasengan UI v1 ("Classic") was a kit of blocks in `apps/ui`, with its docs in `apps/docs` and the Futon meta model in
`packages/data`. Projects installed v1 blocks from `registry.rasengan.dev/r/<name>.json`, and installed blocks load their
images at runtime from `/static/…` on the same host. v2 replaces v1, but existing installs must keep working.

## Decision

- v1 moves to `archive/` (`ui/`, `docs/`, `data/`, its README and CONTRIBUTING), **outside the pnpm workspace**: not
  installed, built, type-checked or deployed.
- The v1 registry JSON (`apps/site/public/r/<name>.json`) and images (`apps/site/public/static/…`) are copied
  unchanged into the v2 site, so one deployment serves both and `registry.rasengan.dev` can point at it.
- v1 JSON is never edited. v2 items live under `/r/<engine>/`, so no name collides.
- The root scripts `dev`, `build` and `start` target the v2 site.

## Options ruled out

- **Delete v1**: breaks every project that installed a v1 block and still loads its images.
- **Keep v1 in the workspace**: its outdated stack (Rasengan 1.2 beta, Vite 7) slows installs and type checks for
  nothing.

## Consequences

- `apps/site/public/r/*.json` (top level) and `apps/site/public/static/` are v1's: don't touch them, and the site's
  prerender output goes to `apps/site/static/` (gitignored as `/apps/site/static/`, not `static`).
- Pointing `registry.rasengan.dev` at the deployment is a DNS task (see the [roadmap](../roadmap.md)).
