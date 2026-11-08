# Glossary

> **Living document.** One word, one meaning, in the docs, the code and discussions. If a term changes meaning or
> replaces another, fix it here first. In brackets: the name in the code when it differs.

## The product

**Rasengan UI** — React components on Base UI, styled with Tailwind CSS v4, copied into the user's project and themed
by villages. "v1" or "Classic" is the earlier kit of blocks, now in `archive/`.

**Component** — A registry item of type `registry:ui`: one folder in `registry/components/`, one file in the user's
project (`@/components/ui/<name>.tsx`).

**Block** — A ready-made page section (hero, pricing, FAQ…) built from components, with a typed `content` prop
([RFC-0008](rfc/0008-blocks.md)). A registry item of type `registry:block`: one folder in `registry/blocks/`, one
folder in the user's project (`@/components/blocks/<name>/`).

**Content** (of a block) — The one object a block renders, typed and checked by its **content schema** (`schema.ts`,
zod, built from the **field types**); `example.ts` is a valid content the block shows by default. Agents get the schema
as JSON Schema.

**Field type** — A shared piece of content schema in `@/lib/block-fields` (`cta`, `image`, `money`, `pricePlan`,
`menuItem`, `openingHours`…), so a field means the same in every block.

**Family** and **block category** (`meta.family`, `meta.category`) — A block's audience, `marketing` or `storefront`,
and its kind within it (`hero`, `pricing`, `menu`…), from `registry/block-categories.ts`. A block that serves both
names both (`family: ["marketing", "storefront"]`, RFC-0009); `familiesOf(meta)` reads either form as a list.

**Container query** — A block lays out by the width of its container (`@container`, `@md:`), not the window's
([ADR-0013](adr/0013-blocks-answer-their-container.md)).

**Category** (`meta.category`) — The family a component belongs to, one of `forms`, `dates`, `overlays`, `navigation`,
`display`, `feedback`, `motion` (`registry/categories.ts`). Groups the sidebar and filters `list_components`.

**Motion component** — A component of the `motion` category: its motion is its purpose, so without the animation it
makes no sense (marquee, typewriter). A carousel, which still works without motion, is not one.

**Demo** — A small file showing a component (`<name>.demo.tsx`, `<name>-<topic>.demo.tsx`). On the site it is a preview;
in the registry it is an **example** (`registry:example`, `<demo>-demo`) that agents can read.

**Engine** — The headless library under the components: `base` (Base UI) today, `radix` later. It is part of the
registry URL (`/r/base/…`) and of `rasengan-ui.json`. Not to be confused with the **village engine**.

## Theming

**Token contract** (`contract.css`, `contract.ts`) — The fixed list of CSS custom properties (136 tokens in 17
groups: shape, type, controls, focus, press, motion, depth, status…) that villages set and components read through
Tailwind names. "Contract names" are those Tailwind names (`bg-primary`, `rounded-control`, `h-control`…).

**Village** (`data-village`) — A whole design language: shape, type, density, depth, motion and greys, set as one CSS
file over the contract and switched at runtime. Konoha (the Leaf, default), Kiri (the Mist), Iwa (the Stone), Kusa (the
Grass). Not a theme in the "colour palette" sense.

**Nature** (`data-nature`) — The accent hue, crossed with any village. Katon (fire), Doton (earth), Futon (wind),
Suiton (water), Raiton (lightning), and **Onmyōton** (yin–yang), the nature without a hue whose primary is the village's
foreground. Each village has a default nature.

**Tint** (`data-tint`) — `village` keeps the village's tinted greys; `neutral` gives the same lightness with no
chroma ("black and white like shadcn").

**Scheme** — Light or dark, from the `.dark` class (or `.light` to force light inside a dark page).

**Tone** (`tone`) — The colour role of a component: `neutral`, `primary`, `success`, `warning`, `info`, `destructive`.
Applied by `tone-*` utilities that set `--tone*` variables.

**Variant** (`variant`) — The look of a component (`default`, `secondary`, `outline`, `ghost`, `link`, `soft`, and
component-specific ones like `underline` or `pills`). Independent of the tone.

**Size** (`size`) — `sm`, `default`, `lg` (plus `icon-*` on buttons).

**Engine variants** (`ui-open`, `ui-checked`…) — Tailwind custom variants that match the state attributes of both
Base UI and Radix. Not to be confused with a component's `variant` prop.

**Motion knob** (`motion` in a recipe) — `quick` (exact, Iwa), `calm` (Konoha), `gentle` (floaty, Kiri), `bouncy`
(springs that overshoot, Kusa). Sets the village's durations, easings, spring, travel distance, stagger and intensity.

**Motion intensity** (`--motion-intensity`, `data-motion-intensity`) — How much motion components may do: 0 none, 1
fades only, 2 travel and splits, 3 showcase (tilt, magnetic, 3D, overshoot). Set by the village, overridable on any
element, 0 under reduced motion.

**Motion mode** (`<html data-motion>`) — `ready` (animate), `final` (every animation in its end state: screenshots,
tests, agents), `off` (reduced motion, or `?motion=off`). `pending` before the page is read.

**Lip** (`--lip`, `--lip-color`) — The solid edge under a raised element in a 3D village (Kusa). Zero in other villages.
**Press** (`--press-x`, `--press-y`) is how far a `pressable` element moves when pressed.

**VillageScope** — A component that gives part of a page its own village, nature, tint or scheme, with a twin in
`<body>` for its popups.

## Making villages

**Recipe** (`*.recipe.json`) — The input of the village engine: a base village, a brand colour, knobs, traits and
overrides. Built-in villages are recipes too.

**Knob** — A recipe setting that is an amount: contrast `soft · standard · high`, density
`compact · default · comfortable`, depth `flat · soft · raised · hard · lip`, motion `quick · calm · gentle`, border, radius.

**Trait** — A recipe setting that is a shape rather than an amount: tabs `segmented · bar`, highlight, focus
`halo · ring`, press `scale · sink · drop`, labels, headings, surfaces `solid · glass`, edges, skeleton `pulse · hatched`.

**Village engine** (`packages/villages/src/engine`) — The deterministic function recipe → CSS: resolve, fix contrast,
write. Runs in the CLI and in the workshop.

**Ladder** — The steps of lightness a contrast level allows, copied from a built-in village (standard = Konoha,
soft = Kiri, high = Iwa).

**Workshop** — The site page `/villages/create` where a village is made from a recipe and exported.

**Founding a village** — Making a custom village (`rasengan-ui village create`).

## Distribution

**Registry** — The JSON files the CLI and the shadcn CLI read, at `/r/<engine>/<name>.json`, built by `pnpm registry`.

**Registry item** — One JSON file: a component (`registry:ui`), a block (`registry:block`), shared code
(`registry:lib`, e.g. `rasengan-core`, `rasengan-motion`, `rasengan-blocks`), a village or the natures
(`registry:theme`), or an example (`registry:example`).

**Block catalog** (`/r/<engine>/blocks.json`) — Every block with its family, category, `useWhen`, weight and content
schema, for an agent choosing sections.

**`rasengan-ui.json`** — The project's config: engine, village, nature, tint, aliases, registry, CSS file, custom
villages.

**Lockfile** (`rasengan-ui.lock`) — For each installed item, each file's path and sha256 at install time.

**Base copy** (`.rasengan-ui/base/`) — The file as installed, kept for 3-way merges.

**File states** (CLI `diff`) — `current`, `edited` (by the user), `behind` (registry is newer), `diverged` (both),
`deleted`, `new`, `removed`.

**MCP server** (`rasengan-ui mcp`) — The CLI serving the registry to agents over stdio: `list_components`,
`get_component`, `get_examples`, `get_project`, `add_components`.

## Quality

**Quality gate** — `pnpm typecheck`, `pnpm test`, `pnpm contrast`, `pnpm axe`, `pnpm screenshots`.

**Baseline** (`.screenshots/baseline`) — The accepted screenshots, local and gitignored; `pnpm screenshots --accept`
replaces it after an intended change.

**Control edge** — The border or track that identifies a state control (checkbox, radio, switch, slider). Must reach
3:1 against its background (WCAG 1.4.11).
