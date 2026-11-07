# Code tour

> **Living document.** It explains **how** the code is organised and who calls whom; the **why** is in the
> [RFCs](rfc/README.md) and [ADRs](adr/README.md), the big picture in [architecture.md](architecture.md).
> State at 2026-11-07 (RFC-0007 lot 0).

## 1. The repository at a glance

```
rasengan-ui-app/
├── registry/
│   ├── categories.ts        the component categories, in the site's order
│   ├── components/<name>/   the components (44): source, styles, demos, meta
│   └── blocks/              blocks (empty in v2)
├── packages/
│   ├── core/                cn(), engine variants, VillageScope, Field context
│   ├── villages/            the token contract, villages, natures, village engine, contrast
│   ├── motion/              rasengan-motion: motion modes, village motion tokens, primitives, splitText
│   ├── cli/                 `rasengan-ui`: commands and the MCP server
│   └── directions/          empty leftover of RFC-0001
├── apps/
│   ├── site/                docs, catalogue and workshop (Rasengan.js 2, prerendered)
│   └── playground/          a Rasengan.js starter to try the CLI on
├── scripts/                 registry build, contrast, axe, screenshots, sitemap
├── docs/                    these project docs: rfc/, adr/, plans/, living docs
├── patches/                 rasengan@2.0.0 (useId hydration, plan 001)
└── archive/                 v1, outside the workspace
```

Workspace packages: `apps/*`, `packages/*`, `registry` (see `pnpm-workspace.yaml`). Code style differs by folder:
tabs and double quotes in `packages/`, `registry/` and `scripts/`, the root Prettier config in `apps/site`
([ADR-0002](adr/0002-tabs-and-double-quotes-in-packages.md)).

## 2. A component folder

```
registry/components/dialog/
├── dialog.base.tsx          the component on Base UI ("use client", shadcn part names)
├── dialog.styles.ts         its classes with cva, imported by dialog.base.tsx
├── meta.ts                  name, title, description, status, category, engines, dependencies
├── dialog.demo.tsx          the main demo
└── dialog-sizes.demo.tsx    one demo per topic (sizes, tones, variants…)
```

- `<name>.<engine>.tsx` is one file per engine; only `base` exists. A future `radix` file reuses the same
  `.styles.ts`: that is why styles live apart and use the `ui-*` engine variants.
- `meta.ts` drives the registry item: `dependencies.base` (npm), `registryDependencies` (other items),
  `examples` (demos published as `registry:example`).
- Imports inside a component use the project aliases as the user will have them: `@/lib/utils`,
  `@/components/ui/button`, `@/lib/village-scope`. `registry/tsconfig.json` maps them to `packages/core` and the
  other component folders.
- The page lives in `apps/site/src/app/_routes/components/<name>.page.mdx`.

## 3. `packages/core`

| File | What it holds | Installed as |
|---|---|---|
| `src/utils.ts` | `cn()`: clsx + a tailwind-merge that knows the contract's names (`text-control`, `h-control-sm`…) | `@/lib/utils` |
| `src/variants.css` | The `ui-*` engine variants and shadcn's `dark` variant | `styles/rasengan/variants.css` |
| `src/village-scope.tsx` | `VillageScope`, `usePortalContainer` | `@/lib/village-scope` |
| `src/field-context.tsx` | Passes `size` and `variant` from `Field` to its control | `@/lib/field-context` |

All four ship in the `rasengan-core` registry item.

## 4. `packages/villages`

```
src/
├── contract.css         tokens + defaults, @theme mapping, utilities (focus-ring, pressable, tone-*, lip-*…)
├── contract.ts          the same tokens as data (group, kind, schemes, default); contract.test.ts checks the drift
├── natures.css          [data-nature] accents, Onmyōton, [data-tint="neutral"]
├── villages/<name>.css  one file per village, generated from <name>.recipe.json
├── index.ts             villages, natures, tints as data (titles, default nature, status) for the site and the CLI
├── fonts.ts             the font catalogue villages may use
├── contrast.ts          the contrast library (pairs, WCAG ratios); `pnpm contrast` wraps it
└── engine/
    ├── recipe.ts        Recipe type, knobs and traits, defaults; recipe.schema.json
    ├── color.ts         colour parsing (oklch)
    ├── ladders.ts       lightness ladders per contrast level
    ├── resolve.ts       recipe → token values
    ├── fix.ts           contrast fixer: move lightness, or refuse
    ├── write.ts         tokens → CSS file shaped like konoha.css
    ├── link.ts          recipe links (share a village by URL)
    └── index.ts         createVillage(), createBaseVillage()
```

Who calls it: `scripts/registry.mjs` (the theme items), `scripts/contrast.mjs`, the CLI (bundled in), the site's
header and workshop (the engine runs in `components/workshop/engine.worker.ts`).

Gotcha: the workshop's worker does not hot-reload engine or contract changes; restart the site's dev server.

## 5. `packages/motion`

```
src/
├── motion.tsx           installed as @/lib/motion
│                        modes: motionScript / MotionScript (head), MotionProvider, useMotionMode
│                        tokens: readMotionTokens(element), useMotion(ref) → { mode, tokens, measured, allows(min) }
│                        primitives: Reveal, Stagger (Web Animations API), Presence, Parallax, Tilt, Magnetic (Motion's m)
├── motion-features.ts   @/lib/motion-features: Motion's domAnimation, imported dynamically (its own chunk)
└── split-text.tsx       @/lib/split-text: splitText(), <SplitText by="chars|words|lines">
test/ssr.test.tsx        server render, no hidden state without JavaScript, split text, defaults against the CSS
```

- Served as the `rasengan-motion` registry item (three files, npm `motion`); the site and `registry/` reach the sources
  through the `@/lib/motion*` and `@/lib/split-text` aliases (`rasengan.config.js`, tsconfigs).
- `useMotion(ref)` reads the tokens once mounted; `allows(n)` is true only in mode `ready` with the village's intensity
  at least `n`. Components check it before animating and render their end state otherwise.
- Hidden initial states are `[data-reveal]` under `[data-motion="ready"]`, in `contract.css`, with a 3 s failsafe until
  the provider has mounted.

## 6. `packages/cli`

```
src/
├── index.ts             the command table and help
├── commands/
│   ├── init.ts          detect the framework, ask village and nature, write rasengan-ui.json and CSS imports
│   ├── add.ts           resolve items and their dependencies, install files and npm packages
│   ├── look.ts          village list|set|add|create|check|export, nature, tint
│   ├── sync.ts          diff and update (3-way merge)
│   ├── doctor.ts        checks config, registry, aliases, CSS order, overriding tokens, packages
│   └── mcp.ts           starts the MCP server
├── config.ts            rasengan-ui.json; RASENGAN_UI_REGISTRY overrides the default registry
├── project.ts           project root, tsconfig/jsconfig paths, package manager
├── framework.ts         Rasengan.js, Vite, Next.js App Router, or manual
├── registry.ts          load items (by name, URL or folder), the index, registryDependencies
├── fetch.ts             fetchJson: a plain error when a registry URL serves HTML
├── install.ts           where each file goes, import rewriting, lockfile, base copies
├── sync.ts              file states and mergeFile (node-diff3)
├── setup.ts             the marked CSS import block, <html> attributes
├── villages.ts          local and generated villages
├── dependencies.ts      npm installs with the project's package manager
└── mcp.ts               the MCP server: five tools over stdio
```

- Runs from source in the repository (`pnpm playground ui <cmd>`, with `RASENGAN_UI_REGISTRY=../site/public/r`).
- `build.mjs` bundles it with esbuild into `dist/index.js`, inlining `@rasengan-ui/villages`; npm dependencies stay
  external. Publish with `pnpm publish` (npm leaves `workspace:*` in place).
- Tests next to the code (`*.test.ts`, `node:test`), run by `pnpm test`.
- `mcp.ts` must never write to stdout outside the protocol.

## 7. `apps/site`

```
src/
├── template.tsx         <html>, the settings restore script, the motion head script, analytics
├── settings.ts          one store for village, nature, tint, scheme (<html> attributes + localStorage)
├── catalogue.ts         the component list (meta + demos), sorted by category, and `groups`, for the sidebar, pager, index, search
├── app/_routes/
│   ├── layout.tsx       header
│   ├── index.page.tsx   home
│   ├── docs/            installation, cli, mcp, villages (MDX)
│   ├── components/      one <name>.page.mdx per component, plus the index
│   ├── motion/          index.page.tsx: the motion gallery (replay, reduced-motion switch)
│   └── villages/create.page.tsx   the workshop
└── components/
    ├── layout/          header, sidebar, search (CommandDialog), mobile menu, footer, docs layout
    ├── mdx/             code-block, toc, steps, callout, component-preview, village-grid, pager
    ├── workshop/        recipe panel, preview cards, report, export dialog, engine worker
    └── home/            the home page's demo dashboard
```

- `rasengan.config.js`: `prerender: true`, port 3200, MDX with the two code themes, the `?source` plugin, and the
  aliases to `registry/` and `packages/core`. A Vite alias change needs a dev-server restart.
- `public/r/base/` and `public/schema/` are generated by `pnpm registry`; `public/r/*.json` and `public/static/` are v1's
  ([ADR-0003](adr/0003-v1-archived-old-urls-kept.md)).

## 8. `scripts/`

| Script | Does |
|---|---|
| `registry.mjs` | For each engine: inline `<name>.styles.ts` into the component, write `.registry/<engine>/registry.json`, run `shadcn build` into `apps/site/public/r/<engine>`, rewrite `$schema`, keep `@/components/ui/*` paths in sync in `registry/` and `apps/site` tsconfigs |
| `contrast.mjs` | Every token pair, every village × nature × scheme (`packages/villages/src/contrast.ts`) |
| `site-pages.mjs` | What axe and screenshots share: the page list, `open()` that waits for React hydration |
| `axe.mjs` | axe-core WCAG 2.2 AA on every page (and `/motion` with motion off), village and scheme, overlays open; `.axe/report.md` |
| `screenshots.mjs` | Playwright on system Chrome, pixelmatch against `.screenshots/baseline`; `--accept` |
| `sitemap.mjs` | `sitemap.xml` and `robots.txt` after the prerender; fails the build if the output is missing |

## 9. Known weak spots

- **No CI**: the quality gate is only as good as the last person who ran it.
- **The screenshot baseline is local and stale**: each machine has its own, and diffs appear without changes.
- **The Rasengan.js patch** (`patches/rasengan@2.0.0.patch`) renders the app in its own root to keep `useId` stable;
  it must be dropped when upstream fixes it ([plan 001](plans/001-rasengan-useid-hydration.md)).
- **MDX pages fail in `.claude/worktrees/`** (dot folders are skipped by `@rasenganjs/mdx`).
- **Base UI enter animations freeze in a background browser tab** (`requestAnimationFrame` paused): front the tab, or
  check motion with headless Playwright.
- **No motion component exists yet** (RFC-0007, lot A): `rasengan-motion` is used only by the site's `/motion` page.
- **esbuild splits Motion's lazy features less well** than Vite or webpack ([ADR-0010](adr/0010-motion-weight.md)).
