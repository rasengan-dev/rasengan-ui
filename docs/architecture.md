# Architecture

> **Living document**: it describes the system **as it is today** and what comes right after. Every pull request
> that changes a package, the registry pipeline, the CLI, the site or where something lives updates it in the same
> commit. The *why* is in the [RFCs](rfc/README.md) and the [ADRs](adr/README.md). The detail of the code is in the
> [code tour](code-tour.md).
>
> Last updated: 2026-11-07.

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
    comps["✅ registry/components<br/>44 components"]
    blocks["⬜ registry/blocks"]
    core["✅ packages/core<br/>cn, ui-* variants, VillageScope, Field context"]
    villages["✅ packages/villages<br/>contract, villages, natures, engine, contrast"]
    motion["🚧 packages/motion<br/>animation primitives, not wired yet"]
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
  motion -.-> blocks
  blocks -.-> build
```

| Container | State | Role |
|---|---|---|
| `registry/components/<name>/` | ✅ 44 | One folder per component: `<name>.base.tsx`, `<name>.styles.ts`, `meta.ts`, demos |
| `registry/blocks/` | ⬜ | Marketing blocks rebuilt on the components (RFC-0002, "Blocks"); empty |
| `packages/core` | ✅ | What every component shares; published as the `rasengan-core` registry item |
| `packages/villages` | ✅ | The token contract (CSS + TypeScript spec), the villages, the natures, the village engine, the contrast library |
| `packages/motion` | 🚧 | `Reveal`, `Stagger`, `Counter`, `Marquee`, `Tilt`, `Magnetic`, `Parallax`, GSAP `SplitText`. Kept from RFC-0001, used by nothing yet |
| `packages/directions` | — | Empty leftover of RFC-0001; to delete |
| `scripts/registry.mjs` | ✅ | Builds the registry, one per engine (only `base` today) |
| `apps/site` | ✅ | The docs and catalogue site; serves the registry and its schemas; live at `rasengan-ui.hiraiship.app` |
| `packages/cli` | ✅ | `rasengan-ui` on npm (0.1.0): `init`, `add`, `village`, `nature`, `tint`, `diff`, `update`, `doctor`, `mcp` |
| `apps/playground` | ✅ | A Rasengan.js starter wired to the local registry |
| `archive/` | frozen | Rasengan UI v1, outside the workspace ([ADR-0003](adr/0003-v1-archived-old-urls-kept.md)) |

## 3. Theming: the token contract, villages and natures

```mermaid
flowchart LR
  contract["contract.css<br/>131 tokens in 17 groups<br/>+ Tailwind @theme names + utilities"]
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
  Villages today: Konoha (default), Kiri, Iwa, Kusa (🚧 uncommitted).
- A **nature** sets the accent (`--primary-h`, chroma…) under `[data-nature]`; natures are imported **after** villages.
  Six: Katon, Doton, Futon, Suiton, Raiton, and Onmyōton (no hue: the primary is the village's foreground).
- **Engine variants** (`ui-open`, `ui-checked`, `ui-invalid`…) in `packages/core/src/variants.css` match both Base
  UI's and Radix's state attributes, so one class string works on either engine.
- `VillageScope` gives part of a page its own village, nature, tint or scheme, and keeps a twin in `<body>` that
  popups use as their portal container.

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
- Shared code is published as `registry:lib` items (`rasengan-core`); villages as `registry:theme` items, one per
  village plus `rasengan-natures`.
- `rasengan-ui.json` at the project root holds the engine, village, nature, tint, aliases, registry and CSS file.
- `update` compares the base copy, the lock hash, the local file and the registry: behind → write, diverged → 3-way
  merge with conflict markers, deleted → stays deleted.

## 5. The site

- Rasengan.js 2 app, **prerendered** at build time and deployed on Hiraiship as static files
  ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)). Dev server on port 3200.
- Pages: home, `/docs/*` (installation, CLI, MCP, villages), `/components/<name>` (MDX, one per component,
  [ADR-0006](adr/0006-site-mdx-follows-hiraiship-docs.md)), `/villages/create` (the workshop).
- One settings store (`src/settings.ts`) drives the header's village, nature, tint and scheme; it writes `<html>`
  attributes and `localStorage`, restored before paint by an inline script in `template.tsx`.
- The site imports components from `registry/` through `@/components/ui/<name>` paths kept in sync by
  `scripts/registry.mjs`.

## 6. Quality gate

| Command | Checks | Needs |
|---|---|---|
| `pnpm typecheck` | core, villages, registry, site, CLI | — |
| `pnpm test` | villages (contract drift, contrast, engine) and CLI (`node:test`); also the pre-commit hook | — |
| `pnpm contrast` | every token pair of every village × nature × scheme against WCAG (text 4.5:1, control edges 3:1) | — |
| `pnpm axe` | WCAG 2.2 AA on every page × village × scheme, overlays open; report in `.axe/report.md` | site running |
| `pnpm screenshots` | every demo × village × scheme × nature against a local baseline in `.screenshots/` | site running |

There is no CI yet: the gate runs locally (see the [roadmap](roadmap.md)).
