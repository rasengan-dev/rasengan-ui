# Architecture

> **Living document**: it describes the system **as it is today** and what comes right after. Every pull request
> that changes a package, the registry pipeline, the CLI, the site or where something lives updates it in the same
> commit. The *why* is in the [RFCs](rfc/README.md) and the [ADRs](adr/README.md). The detail of the code is in the
> [code tour](code-tour.md).
>
> Last updated: 2026-11-08 (RFC-0008 lot 0).

Legend: ✅ built · 🚧 started · ⬜ planned.

## 1. Context

Who uses Rasengan UI, and what it talks to.

```mermaid
flowchart LR
  dev([Developer])
  agent([Coding agent])
  shadcn([shadcn CLI])
  rui[Rasengan UI<br/>components, villages, natures]
  project[(User's project<br/>React 19 + Tailwind v4)]
  hiraiship[Hiraiship<br/>static hosting]

  dev -- npx rasengan-ui --> rui
  agent -- rasengan-ui mcp --> rui
  shadcn -- /r/base/name.json --> rui
  rui -- copies source files --> project
  rui -- deployed on --> hiraiship
```

- **Components are copied, not imported**: the CLI writes their source into the user's project, which owns it from
  then on. A lockfile and base copies let `update` merge later registry changes with local edits.
- **A village restyles everything at runtime**: one attribute on `<html>` (`data-village`, `data-nature`,
  `data-tint`), no rebuild.
- **The registry is shadcn-compatible**, so the shadcn CLI can install items too, without the village switching.
- Why: [RFC-0002](rfc/0002-villages.md), [RFC-0003](rfc/0003-mcp-server.md).

## 2. Containers

```mermaid
flowchart TB
  subgraph source[Sources]
    comps["✅ registry/components<br/>53 components, 8 of them motion"]
    blocks["🚧 registry/blocks<br/>19 blocks: 10 marketing, 9 storefront"]
    blockslib["✅ packages/blocks<br/>rasengan-blocks: BlockProps, BlockMeta, field types"]
    core["✅ packages/core<br/>cn, ui-* variants, VillageScope, Field context"]
    villages["✅ packages/villages<br/>contract, villages, natures, engine, contrast"]
    motion["✅ packages/motion<br/>rasengan-motion: modes, village motion tokens, primitives, splitText"]
  end

  build["✅ scripts/registry.mjs<br/>inlines styles, shadcn build"]
  public["apps/site/public/r/base/*.json<br/>+ /schema"]
  site["✅ apps/site<br/>docs, catalogue, workshop (prerendered)"]
  cli["✅ packages/cli<br/>npm rasengan-ui: CLI + MCP server"]
  play["✅ apps/playground<br/>a Rasengan.js app to try the CLI"]

  comps --> build
  core --> build
  villages --> build
  build --> public
  public --> site
  villages --> site
  comps --> site
  public -- fetch --> cli
  villages -- bundled into --> cli
  cli --> play
  motion --> build
  motion --> site
  motion --> blocks
  blockslib --> blocks
  blocks --> build
  blocks --> site
```

| Container | State | Role |
|---|---|---|
| `registry/components/<name>/` | ✅ 53 | One folder per component: `<name>.base.tsx`, `<name>.styles.ts`, `meta.ts` (with its category, [ADR-0009](adr/0009-component-categories.md)), demos |
| `registry/categories.ts` | ✅ | The seven categories, in the site's order: forms, dates, overlays, navigation, display, feedback, motion |
| `registry/blocks/<name>/` | 🚧 19 | One folder per block ([RFC-0008](rfc/0008-blocks.md)): `<name>.base.tsx`, `schema.ts` (`export const schema`), `example.ts` (`export const example`), `meta.ts` (family, category, `useWhen`…; type imports only), demos. The ten marketing blocks of lot A and the nine storefront blocks of lot B |
| `registry/placeholders/` | ✅ | Open placeholder images the examples show (a neutral product shot; flat illustrations of dishes, a room, a kitchen and a map; six drawn logo marks with invented names, `logo-*.svg`, [RFC-0009](rfc/0009-blocks-second-wave.md); eleven Unsplash portraits, `person-*.svg` (WebP in an SVG: the registry carries text only), credited in `CREDITS.md`, [ADR-0014](adr/0014-placeholder-photos-from-unsplash.md)); the `rasengan-placeholders` item installs them in `public/placeholders/`, and a block whose example uses one depends on it. The site serves copies at `/placeholders/` |
| `registry/block-categories.ts` | ✅ | The two families (marketing, storefront) and their categories, in the site's order; RFC-0009 added `integrations`, `comparison`, `booking`, `offers` and `team`, and `contact` for marketing |
| `packages/blocks` | ✅ | The `rasengan-blocks` registry item: `lib/blocks.ts` (`BlockProps`, `heading`, `BlockMeta`, `familiesOf`, `formatMoney`, no zod) and `lib/block-fields.ts` (zod field types, RFC-0009's `review`, `staffMember`, `branch`, `offer`, `formChannel`… among them; `defineBlock`), [ADR-0013](adr/0013-blocks-answer-their-container.md); its tests render every block on the server |
| `packages/core` | ✅ | What every component shares; published as the `rasengan-core` registry item |
| `packages/villages` | ✅ | The token contract (CSS + TypeScript spec), the villages, the natures, the village engine, the contrast library |
| `packages/motion` | ✅ | The `rasengan-motion` registry item ([RFC-0007](rfc/0007-motion-components.md)): motion modes, the village's motion tokens read from CSS, `Reveal`, `Stagger`, `Presence`, `Parallax`, `Tilt`, `Magnetic`, `splitText`. Used by the five motion components of lot A |
| `packages/directions` | — | Empty leftover of RFC-0001; to delete |
| `scripts/registry.mjs` | ✅ | Builds the registry, one per engine (only `base` today); for blocks it also parses each example with its schema, writes the JSON Schema and the gzip weight into the item's meta (budget 6 kB, 12 kB for showcase and bento), and writes `blocks.json` |
| `apps/site` | ✅ | The docs and catalogue site; serves the registry and its schemas; live at `rasengan-ui.hiraiship.app` |
| `packages/cli` | ✅ | `rasengan-ui` on npm (0.1.0): `init`, `add`, `village`, `nature`, `tint`, `diff`, `update`, `doctor`, `mcp` |
| `apps/playground` | ✅ | A Rasengan.js starter wired to the local registry |
| `archive/` | frozen | Rasengan UI v1, outside the workspace ([ADR-0003](adr/0003-v1-archived-old-urls-kept.md)) |

## 3. Theming: the token contract, villages and natures

```mermaid
flowchart LR
  contract["contract.css<br/>136 tokens in 17 groups<br/>+ Tailwind @theme names + utilities"]
  village["villages/&lt;name&gt;.css<br/>[data-village=…]<br/>shape, type, density, depth, motion, greys"]
  nature["natures.css<br/>[data-nature=…]<br/>the accent hue"]
  tint["[data-tint=neutral]<br/>greys without chroma"]
  comp["Component classes<br/>bg-primary, rounded-control,<br/>shadow-md, ui-open:…"]

  contract --> village --> nature --> tint --> comp
```

- `contract.css` declares every token with a default, maps them to Tailwind names in `@theme`, and adds the
  utilities components use (`focus-ring`, `pressable`, `tone-*`, `lip-*`, `case-*`…). `contract.ts` describes the same
  tokens (group, kind, schemes, default) and a test checks the two never drift.
- A **village** is one CSS file that overrides contract tokens under `[data-village="<name>"]`, light and dark.
  Villages today: Konoha (default), Kiri, Iwa, Kusa (3D: controls stand on a lip, [ADR-0008](adr/0008-lip-in-the-token-contract.md)).
- A **nature** sets the accent (`--primary-h`, chroma…) under `[data-nature]`; natures are imported **after** villages.
  Six: Katon, Doton, Futon, Suiton, Raiton, and Onmyōton (no hue: the primary is the village's foreground).
- **Engine variants** (`ui-open`, `ui-checked`, `ui-invalid`…) in `packages/core/src/variants.css` match both Base
  UI's and Radix's state attributes, so one class string works on either engine.
- `VillageScope` gives part of a page its own village, nature, tint, scheme or motion intensity, and keeps a twin in
  `<body>` that popups use as their portal container.

### Motion

- Each village sets its motion through the recipe's `motion` knob: Konoha `calm`, Kiri `gentle`, Iwa `quick`, Kusa
  `bouncy`. It writes the durations and easings CSS transitions use, and (RFC-0007) the spring, travel distance,
  stagger and intensity (0 to 3) that motion components read. `data-motion-intensity` on any element overrides the
  intensity for its subtree; reduced motion sets it to 0 everywhere.
- `rasengan-motion` (`packages/motion`) reads those tokens from the element's computed style, so a component inside a
  `VillageScope` moves like that village. A head script sets `<html data-motion>`: `ready` animates, `final` renders end
  states (screenshots, agents), `off` is reduced motion. Hidden initial states apply only under `ready`, from
  `contract.css`, so content is visible without JavaScript.
- Reveals use the Web Animations API; components that need springs use Motion's `m`, whose features load on demand
  ([ADR-0010](adr/0010-motion-weight.md)).

### The village engine

```mermaid
flowchart LR
  recipe["recipe<br/>base village + brand colour<br/>+ knobs + traits + overrides"]
  resolve["resolve<br/>knobs → tokens"]
  fix["fix<br/>contrast: move lightness or refuse"]
  write["write<br/>one CSS file, shaped like konoha.css"]
  recipe --> resolve --> fix --> write
```

Built-in villages are recipes too (`villages/*.recipe.json`), reproduced token for token. The same engine runs in the
CLI (`village create/check/export`) and in the site's workshop (`/villages/create`, in a web worker).
Why: [RFC-0006](rfc/0006-custom-villages.md).

## 4. From a component folder to a user's project

```mermaid
sequenceDiagram
  participant Src as registry/components/button
  participant Build as scripts/registry.mjs
  participant Site as apps/site/public/r/base
  participant CLI as rasengan-ui add button
  participant P as User's project

  Src->>Build: button.base.tsx + button.styles.ts + meta.ts
  Build->>Build: inline styles into button.base.tsx (one file per component)
  Build->>Site: shadcn build → button.json, button-demo.json… ($schema → /schema)
  CLI->>Site: fetch button.json (+ registryDependencies)
  CLI->>P: write src/components/ui/button.tsx (imports rewritten to the project's aliases)
  CLI->>P: npm packages, rasengan-ui.lock (sha256), .rasengan-ui/base/ copy
```

- Registry URL shape: `/r/<engine>/<name>.json`. Demos are `registry:example` items `<demo>-demo`, listed in the
  component's `meta.examples`, so agents can read them (RFC-0003).
- Shared code is published as `registry:lib` items (`rasengan-core`, `rasengan-motion`, `rasengan-blocks`); villages as
  `registry:theme` items, one per village plus `rasengan-natures`.
- Blocks are `registry:block` items: five files (`<name>.tsx`, a generated `index.ts`, `schema.ts`, `example.ts`,
  `meta.ts`) written to `<blocks alias>/<name>/` (`@/components/blocks` by default, `aliases.blocks` in
  `rasengan-ui.json`). Their meta carries `family` (one family, or a list for a block in both, RFC-0009, published as
  written), `category`, `useWhen`, `weightKb`, `contentSchema` (JSON Schema)
  and `example`; `/r/<engine>/blocks.json` lists them all for agents. The MCP server lists them as `kind: "block"`
  (its `family` filter matches any of a block's families) and `get_component` prints their content schema and example.
- `rasengan-ui.json` at the project root holds the engine, village, nature, tint, aliases, registry and CSS file.
- `update` compares the base copy, the lock hash, the local file and the registry: behind → write, diverged → 3-way
  merge with conflict markers, deleted → stays deleted.

## 5. The site

- Rasengan.js 2 app, **prerendered** at build time and deployed on Hiraiship as static files
  ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)). Dev server on port 3200.
- Pages: home, `/docs/*` (installation, CLI, MCP, villages), `/components` (by category) and `/components/<name>`
  (MDX, one per component, [ADR-0006](adr/0006-site-mdx-follows-hiraiship-docs.md)), `/blocks` (the gallery:
  every block as a live, scaled-down thumbnail, with search, a family filter, a category rail and `?category=`),
  `/blocks/<name>` (MDX: `BlockShowcase` on top, after shadcnblocks' block pages, then installation, usage, the
  `ContentSchema` table, props), `/preview/<name>` (one block alone, full window, one page per block from
  `generatePaths`), `/examples/landing` and `/examples/restaurant` (pages made only of blocks; the restaurant passes its own content from `src/content/restaurant.ts`), `/motion` (the motion gallery:
  the village reveal and, from lot A, the motion components), `/villages/create` (the workshop).
- The blocks pages take the whole window, header included. `/examples/*` and `/preview/*` have no site header and
  a floating toolbar for the theme and the scheme. A block's showcase and the gallery's thumbnails wear a theme of
  their own (`useScopedTheme`, a VillageScope), set in their bar, so the page keeps its theme.
- The header's sections: Docs, Components, Blocks, Motion. The sidebar and the pager follow the catalogue's order: by
  category, then by title; on block pages, the blocks' (`src/blocks-catalogue.ts`): by family, category, title. A block
  in both families sorts by its first and shows under each in the sidebar and the gallery's family filter.
- `template.tsx` runs the motion head script; the root layout has the one `MotionProvider`.
- One settings store (`src/settings.ts`) drives the header's village, nature, tint and scheme; it writes `<html>`
  attributes and `localStorage`, restored before paint by an inline script in `template.tsx`.
- The site imports components from `registry/` through `@/components/ui/<name>` paths kept in sync by
  `scripts/registry.mjs`.

## 6. Quality gate

| Command | Checks | Needs |
|---|---|---|
| `pnpm typecheck` | core, villages, motion, blocks, registry, site, CLI | — |
| `pnpm test` | villages (contract drift, contrast, engine), motion (server render, split text, defaults against the CSS), blocks (each example parses; each block renders on the server with all its content, at the heading level asked) and CLI; also the pre-commit hook | — |
| `pnpm contrast` | every token pair of every village × nature × scheme against WCAG (text 4.5:1, control edges 3:1) | — |
| `pnpm axe` | WCAG 2.2 AA on every page × village × scheme (block pages and the example page also at 360px), overlays open, `/motion` animating and with motion off; report in `.axe/report.md` | site running |
| `pnpm screenshots` | every demo × village × scheme × nature against a local baseline in `.screenshots/`; pages load with `?motion=final`, so motion components are captured in their end state; each block's preview at 360px and 1440px | site running |

There is no CI yet: the gate runs locally (see the [roadmap](roadmap.md)).
