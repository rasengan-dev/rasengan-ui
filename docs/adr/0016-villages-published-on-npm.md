# ADR-0016 — `@rasengan-ui/villages` is published on npm; packages build with tsup

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-12 |
| Replaces | — (takes the second of the two options RFC-0006 names: "the engine bundled into [the CLI], or `@rasengan-ui/villages` published") |

## Context

The village engine is pure TypeScript: the CLI, the site's workshop and the MCP server share it. Until now it left the
repository in one way only, bundled into the `rasengan-ui` CLI. The package itself was private and exported its
TypeScript source.

Jutsify, a product built on Rasengan UI, needs the engine in its own dashboard: its users make their village there,
and the result must match what the CLI writes in the project. Another project cannot import a private package, and
Node refuses to run TypeScript from `node_modules`.

The CLI was built by a hand-written esbuild script. A second published package needs a build too, with type
declarations, which that script did not make.

## Decision

- **`@rasengan-ui/villages` is published on npm**, public, under the MIT licence, starting at 0.1.0. Its public API is
  what `exports` already named: the villages and natures as data, the engine, the contrast library, the contract, the
  font catalogue, the CSS files, the built-in recipes and the recipe schema.
- **The workspace keeps importing the source.** `exports` still points at `src/`; `publishConfig.exports` points the
  published package at `dist/`. Nothing in the repository reads `dist/`, so there is no build step in development.
  This needs `pnpm publish`, which applies `publishConfig`; `npm publish` would ship the wrong `exports`.
- **Published packages build with tsup** (`tsup.config.ts`, run by `prepack`): `packages/villages` to one ESM file per
  entry with bundled declarations, platform neutral; `packages/cli` to the same single file as before.
- **The CLI still bundles the engine.** It does not depend on the published package: one install, one version, no way
  for the two to drift.

## Options ruled out

- **Only the CLI carries the engine, exposed as `rasengan-ui/engine`**: no new package, but a dashboard would install
  a command-line tool and its dependencies to make a CSS file in a browser.
- **`exports` pointing at `dist/` everywhere**: the site and the CLI would need a build, or a watcher, before every
  run in the repository.
- **Publishing the TypeScript source**: works in some bundlers only, and not in Node.
- **Keeping esbuild scripts and adding `tsc` for the declarations**: the sources import each other with a `.ts`
  extension, so the declarations need rewriting by hand; tsup bundles them.

## Consequences

- **The engine's API is now public.** A change to `Recipe`, `createVillage` or `parseSources` is a versioned change,
  with a changelog, not an internal refactor.
- **Two version numbers to keep honest**: the CLI and the package. A village made by one must equal the village made
  by the other at the same engine version (`ENGINE_VERSION`).
- **The `@rasengan-ui` scope must exist on npm** (an organisation, free for public packages) before the first publish.
- `packages/motion`, `packages/core` and `packages/blocks` stay private: they are distributed through the registry.
- The root `esbuild` dependency stays: `scripts/registry.mjs` uses it.

## Revisit when

A second consumer needs the workshop's React components too: that is a registry block, not this package.
