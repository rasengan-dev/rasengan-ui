# Code tour

> **Living document.** It explains **how** the code is organised and who calls whom; the **why** is in the
> [RFCs](rfc/README.md) and [ADRs](adr/README.md), the big picture in [architecture.md](architecture.md).
> State at 2026-11-07 (RFC-0007 lot 0).

## 1. The repository at a glance

```
rasengan-ui-app/
├── registry/
│   ├── categories.ts        the component categories, in the site's order
│   ├── components/<name>/   the components (64): source, styles, demos, meta
│   ├── block-categories.ts  the block families and categories, in the site's order (a block may name both families)
│   ├── blocks/<name>/       the blocks (45): component, schema, example, meta, demo
│   └── placeholders/        open images the block examples show (rasengan-placeholders), credited in CREDITS.md
├── packages/
│   ├── core/                cn(), engine variants, VillageScope, Field context
│   ├── villages/            the token contract, villages, natures, village engine, contrast
│   ├── motion/              rasengan-motion: motion modes, village motion tokens, primitives, splitText
│   ├── blocks/              rasengan-blocks: BlockProps, BlockMeta, formatMoney; zod field types; block tests
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

### A block folder

```
registry/blocks/cta-banner/
├── cta-banner.base.tsx      the block: `CtaBanner({ content = example, id, className, headingLevel })`, `@container`
├── schema.ts                `export const schema` (zod, from @/lib/block-fields) and `CtaBannerContent`
├── example.ts               `export const example`: valid content, shown by default
├── meta.ts                  family, category, summary, useWhen, layout, content, components; `import type` only
└── cta-banner.demo.tsx      the docs preview
```

- `pnpm registry` checks the folder (the files, the family or families, each with the category), parses the example with the schema, writes
  the JSON Schema and the gzip weight into the item, and generates the installed `index.ts`.
- The component imports only `@/lib/blocks`, the components and types; from `@/lib/block-fields`, only types
  (`import type`), so rendering a block loads no zod ([ADR-0013](adr/0013-blocks-answer-their-container.md)).
  `pnpm registry` refuses a value import.
- A visible string comes from `content`, labels included (a price's period, a badge, a menu button's name). Icons are
  picked by name from a fixed set the block imports (`featureIcons` in features-grid), never loaded by name at runtime.
- Numbers formatted on the server and in the browser must agree: give `Intl` explicit fraction digits (Node and
  Chrome round compact currency differently). Anything that reads the clock (hours-week's "open now") waits for
  the browser, in the business's time zone, so the prerendered HTML matches.
- Text on a soft badge or a translucent fill can fall under 4.5:1 when the block sits on a muted section: give it an
  opaque surface, or use the outline variant. On a primary band, use the primary/primary-foreground pair at full
  strength, never `opacity`.
- `packages/blocks/test/blocks.test.tsx` renders every block on the server and checks every string of its example is
  in the HTML and its heading is at the level asked.
- The page lives in `apps/site/src/app/_routes/blocks/<name>.page.mdx`: `<BlockShowcase>` (title, navigation,
  preview with widths and its own theme, code, facts), then install, usage (with `<BlockVariant>` for a block's other
  demos, `<name>-<topic>.demo.tsx`), `<ContentSchema>`, props. The gallery
  and `/preview/<name>` find a new block on their own.

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
header, and the workshop (`packages/workshop/src/engine.worker.ts`).

Gotcha: the workshop's worker does not hot-reload engine or contract changes; restart the site's dev server.

Published as `@rasengan-ui/villages` ([ADR-0016](adr/0016-villages-published-on-npm.md)). `tsup.config.ts` builds
`dist/` (one ESM file per entry of `exports`, declarations, the CSS and JSON files copied as they are); `prepack` runs
it. In the workspace `exports` points at `src/`, and `publishConfig.exports` at `dist/`: publish with `pnpm publish`,
never `npm publish`. `prepublishOnly` (`scripts/publish-with-pnpm.mjs`) refuses any other client: 0.1.0 went out with
npm and its `exports` pointed at `src/`.

`sources.ts` exports `contract.css` and `natures.css` already parsed, for code that cannot read files (the workshop's
worker). It imports them with `?raw`: Vite's in the workspace, a small esbuild plugin of `tsup.config.ts` in the build.
Nothing run by Node imports it (the tests and the CLI read the two files).

### `packages/workshop`: the workshop's parts

```
src/
├── recipe-panel.tsx     RecipePanel: a row per knob, a menu or popover beside each; `knobs()`, `bases`, `swatches`
├── report.tsx           Report: the status, the brand colour's moves, the pairs that fail, the adjustments
├── village-status.tsx   VillageStatus: the pill that opens the report
├── use-village.ts       useVillage(recipe): the village, made in the worker, the latest recipe winning
├── engine.worker.ts     the engine off the main thread
└── labels.ts            WorkshopLabels, and the `en` and `fr` dictionaries
test/workshop.test.tsx   the panel and the report rendered on the server, in both languages
```

The source of the `rasengan-workshop` registry item ([ADR-0017](adr/0017-workshop-as-a-shared-registry-item.md)); the
list of its files is in `scripts/registry.mjs` (`sharedItems`). It imports the components by their installed paths
(`@/components/ui/…`), and its own files relatively, so they work as they are once installed in
`components/workshop/`. A new word goes into `WorkshopLabels` and both dictionaries, never into a component.

## 5. `packages/motion`

```
src/
├── motion.tsx           installed as @/lib/motion
│                        modes: motionScript / MotionScript (head), MotionProvider, useMotionMode
│                        tokens: readMotionTokens(element), useMotion(ref) → { mode, tokens, measured, allows(min) }
│                        primitives: Reveal, Stagger (Web Animations API), Parallax (scroll progress),
│                                    Presence, Tilt, Magnetic (Motion's m)
│                        scroll progress: useScrollProgress(ref, { range, progress, feedback, enabled, subject }) sets
│                                    --scroll-progress; scrollProgressAt / scrollRangeBounds / pageScrollProgress (the maths)
│                        without Motion: bezierEasing (scroll moves), stepSpring / springAtRest (the cursor)
├── motion-features.ts   @/lib/motion-features: Motion's domAnimation, imported dynamically (its own chunk)
└── split-text.tsx       @/lib/split-text: splitText(), <SplitText by="chars|words|lines">
test/ssr.test.tsx        server render, no hidden state without JavaScript, split text, defaults against the CSS
test/scroll.test.tsx     scroll ranges, the page's progress, Parallax's static form, no Motion scroll hooks
```

- Served as the `rasengan-motion` registry item (three files, npm `motion`); the site and `registry/` reach the sources
  through the `@/lib/motion*` and `@/lib/split-text` aliases (`rasengan.config.js`, tsconfigs).
- `useMotion(ref)` reads the tokens once mounted; `allows(n)` is true only in mode `ready` with the village's intensity
  at least `n`. Components check it before animating and render their end state otherwise.
- `useScrollProgress` (RFC-0010, [ADR-0019](adr/0019-scroll-motion-on-css-scroll-timelines.md)) registers
  `--scroll-progress` and lets the browser drive it with a `ViewTimeline` or `ScrollTimeline` animation where it can
  (`scrollTimelinesSupported()`); elsewhere one passive scroll listener and one frame for the whole page measure the
  watched elements near the viewport and write it. It sets `data-scroll-linked` while it drives; under `final` and
  `off` it sets nothing (except `feedback`, [ADR-0020](adr/0020-scroll-feedback-keeps-working-under-reduced-motion.md)).
  Measure a box that does not move: Parallax measures its outer box and moves an inner one.
- Hidden initial states are `[data-reveal]` under `[data-motion="ready"]`, in `contract.css`, with a 3 s failsafe until
  the provider has mounted.

## 6. `packages/cli`

```
src/
├── index.ts             the command table and help
├── commands/
│   ├── init.ts          detect the framework, ask village and nature, check the aliases (--aliases), write rasengan-ui.json and CSS imports
│   ├── add.ts           resolve items and their dependencies, install files and npm packages
│   ├── look.ts          village list|set|add|create|check|export, nature, tint
│   ├── sync.ts          diff and update (3-way merge)
│   ├── doctor.ts        checks config, registry, aliases, CSS order, overriding tokens, packages
│   └── mcp.ts           starts the MCP server
├── config.ts            rasengan-ui.json, aliasesFor(prefix); RASENGAN_UI_REGISTRY overrides the default registry
├── project.ts           project root, tsconfig/jsconfig paths, package manager, a package's exports (doctor)
├── framework.ts         Rasengan.js, Vite, Next.js App Router, or manual
├── registry.ts          load items (by name, URL or folder), the index, registryDependencies
├── fetch.ts             fetchJson: a plain error when a registry URL serves HTML
├── install.ts           where each file goes (blocks into `aliases.blocks/<name>/`), import rewriting, lockfile, base copies
├── sync.ts              file states and mergeFile (node-diff3)
├── setup.ts             the marked CSS import block, <html> attributes
├── villages.ts          local and generated villages
├── dependencies.ts      npm installs with the project's package manager
└── mcp.ts               the MCP server: five tools; blocks are `kind: "block"`, with JSON Schema and example.
                         commands/mcp.ts serves it over stdio, or over HTTP (`--http`): one server and one
                         transport per POST to /mcp, no session, JSON answers
```

- Runs from source in the repository (`pnpm playground ui <cmd>`, with `RASENGAN_UI_REGISTRY=../site/public/r`).
- `tsup.config.ts` bundles it into `dist/index.js`, inlining `@rasengan-ui/villages`; npm dependencies stay
  external. Publish with `pnpm publish` (npm leaves `workspace:*` in place).
- Tests next to the code (`*.test.ts`, `node:test`), run by `pnpm test`.
- `mcp.ts` must never write to stdout outside the protocol.

## 7. `apps/site`

```
src/
├── template.tsx         <html>, the settings restore script, the motion head script, analytics
├── settings.ts          one store for village, nature, tint, scheme (<html> attributes + localStorage)
├── catalogue.ts         the component list (meta + demos), sorted by category, and `groups`, for the sidebar, pager, index, search
├── components/theme-scope.tsx  useScopedTheme and ScopedTheme: a theme for part of the page (showcase, thumbnails)
├── content/             the example pages' content: restaurant.ts (its navbar), salon.ts (every block but the team)
├── blocks-catalogue.ts  the block list (meta, demo, source, schema, example), by family and category, and `blockGroups`
├── app/_routes/
│   ├── layout.tsx       header
│   ├── index.page.tsx   home
│   ├── docs/            installation, cli, mcp, villages (MDX)
│   ├── components/      one <name>.page.mdx per component, plus the index
│   ├── blocks/          one <name>.page.mdx per block; index.page.tsx, the gallery
│   ├── preview/         [name].page.tsx: one block full window, a page per block (generatePaths)
│   ├── examples/        landing.page.tsx, restaurant.page.tsx, salon.page.tsx: pages made only of blocks; layout.tsx wraps them in a PageTransition and
│   │                    adds the floating toolbar with its example switcher (the root layout drops the site header on /examples)
│   ├── motion/          index.page.tsx: the motion gallery (replay, reduced-motion switch)
│   └── villages/create.page.tsx   the workshop
└── components/
    ├── layout/          header, sidebar, search (CommandDialog), mobile menu, footer, docs layout, example toolbar
    ├── mdx/             code-block, toc, steps, callout, component-preview, block-showcase, content-schema, village-grid (`demo` picks another demo), pager
    ├── gallery/         block-thumbnail: a block live, scaled down, rendered once near the viewport
    ├── workshop/        what the site's workshop page adds to `packages/workshop`: preview cards, export dialog
    └── home/            the home page's demo dashboard
```

- `rasengan.config.js`: `prerender: true`, port 3200, MDX with the two code themes, the `?source` plugin, and the
  aliases to `registry/` and `packages/core`. A Vite alias change needs a dev-server restart.
- `public/r/base/` and `public/schema/` are generated by `pnpm registry`; `public/r/*.json` and `public/static/` are v1's
  ([ADR-0003](adr/0003-v1-archived-old-urls-kept.md)).

## 8. `scripts/`

| Script | Does |
|---|---|
| `registry.mjs` | For each engine: inline `<name>.styles.ts` into the component, write `.registry/<engine>/registry.json`, run `shadcn build` into `apps/site/public/r/<engine>`, rewrite `$schema`, keep `@/components/ui/*` and `@/components/blocks/*` paths in sync in `registry/` and `apps/site` tsconfigs. Blocks: validate, parse the example, JSON Schema, weight budget, `blocks.json` |
| `contrast.mjs` | Every token pair, every village × nature × scheme (`packages/villages/src/contrast.ts`) |
| `site-pages.mjs` | What axe and screenshots share: the components and blocks, the block widths (360, 1440), `open()` that loads a page with `?motion=final` and waits for React hydration |
| `axe.mjs` | axe-core WCAG 2.2 AA on every page (and `/motion` with motion off, `/blocks` and each block page), village and scheme, overlays open; `.axe/report.md` |
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
- **esbuild splits Motion's lazy features less well** than Vite or webpack ([ADR-0010](adr/0010-motion-weight.md)).
