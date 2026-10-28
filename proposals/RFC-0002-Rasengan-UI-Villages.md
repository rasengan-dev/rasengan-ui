# RFC-0002: Rasengan UI — components on Base UI, themed by villages

- Status: Draft (foundations, implementation plan steps 1 and 2, and the forms batch of step 3 on `feat/ui-next`)
- Author: Dilane Kombou
- Created: 2026-10-28
- Supersedes: RFC-0001 for everything except the block content contract (`schema.ts`, `example.ts`, `meta.ts`), which is kept
- Package(s): new `apps/site`, new `packages/core`, new `packages/villages`, new `packages/cli`, new `registry/`, `packages/motion` (kept from RFC-0001)

## Summary

Rasengan UI becomes a component system in the shadcn model: components are
copied into the project, styled with Tailwind CSS v4, owned by the project
afterwards. Three things set it apart:

1. **Villages.** A theme is a complete design language (shape, type, density,
   depth, texture, motion and palette), not a colour swap. Villages are
   named after the hidden villages of the Naruto universe: Konoha, Kiri,
   Iwa, Kumo, Suna, Uzushio…
2. **Two axes and a tint.** A village is combined with a *nature* (the
   chakra natures: Katon, Suiton, Raiton, Futon, Doton, and Onmyōton, the
   black-and-white one), which gives the accent. Any village works with any
   nature: `konoha × katon`, `iwa × suiton`. A *tint* switch keeps the
   village's own greys or makes them neutral; `onmyoton` with neutral greys
   is the shadcn black-and-white look.
3. **Switchable at runtime.** Components never hard-code a choice that
   belongs to a village. Switching village, or giving one section its own
   village, is an HTML attribute, not a reinstall.

Components are built on **Base UI** from the start. **Radix UI** is added
later as a second *engine* with the same styles and the same public API
where the two libraries allow it. A dedicated CLI, `rasengan-ui`, installs
components, manages villages and updates installed files without losing
local edits. The registry stays compatible with the shadcn CLI.

The landing blocks of RFC-0001 are rebuilt on top of these components and
villages.

## Motivation

- **RFC-0001 started from the top.** Its blocks used ad-hoc primitives and a
  single art direction (`nova`). Without a component layer, every block
  re-implemented buttons, inputs and menus, and an art direction could only
  restyle what each block chose to expose.
- **shadcn already covers "copy-paste components on Radix or Base UI"** with
  a choice of visual styles. Doing the same with different names would give
  nobody a reason to switch. What shadcn does not offer is a theme that
  changes the whole character of the UI and can be swapped at runtime, a
  safe update path for installed files, and blocks that follow the theme.
- **Base UI first.** Base UI (`@base-ui/react`, 1.x) is the newer of the two
  libraries, is maintained by the team behind Radix and Material UI, and
  handles enter and exit animations with plain CSS, which suits a
  motion-heavy system.

## Goals

- `npx rasengan-ui init` sets up a project (Rasengan.js, Vite or Next.js)
  with an engine, a village and a nature; `npx rasengan-ui add dialog`
  installs a component.
- `npx shadcn add @rasengan/dialog` also works.
- Every component looks right in every village, in light and dark, with no
  per-village code.
- Changing village or nature never requires touching component files.
- Updating a component keeps the project's local edits (3-way merge).
- Adding the Radix engine later breaks no URL and no installed project.

## Non-goals

- A runtime npm component library. Components are copied, as with shadcn.
- A wrapper that hides Base UI and Radix behind one runtime API.
- Tailwind CSS v3, React 18 and below.
- Changing or removing v1 ("Classic"). It stays published, unchanged.

## Decisions

| Topic | Decision |
|---|---|
| Positioning | Villages are the main bet: whole design languages, switchable at runtime |
| Theme axes | Two: village (design language) × nature (accent hue), plus a tint switch (village greys or neutral greys) |
| Engine | Base UI now, Radix later, as source variants of each component |
| CLI | Own CLI `rasengan-ui`; the registry stays shadcn-compatible |
| First scope | About 25 components and 3 villages done properly |
| Blocks | Restart: rebuilt on the components, keeping the RFC-0001 content contract |
| Repository | Same repo, new layout modelled on Sharingan; v1 apps untouched until `apps/site` takes over |
| Compatibility | shadcn token names (`background`, `primary`, `muted`…) so shadcn and Rasengan UI components can be mixed |

## Detailed design

### Repository layout

```
apps/
  site/                       Rasengan.js app: docs, catalogue, village switcher, serves /r
  ui/  docs/                  v1, untouched until apps/site serves v1 too (see "Rollout")
packages/
  core/                       cn(), engine variants, shared utilities → registry:lib
  villages/                   token contract, villages, natures → registry:theme
    src/
      contract.css
      villages/<village>.css  light and dark in one file
      natures.css
  motion/                     motion primitives, kept from RFC-0001
  cli/                        the rasengan-ui CLI
registry/
  components/<name>/
    <name>.base.tsx           Base UI implementation
    <name>.radix.tsx          Radix implementation (later)
    <name>.styles.ts          class strings shared by both engines
    <name>.demo.tsx           the default demo, shown by the site
    meta.ts                   title, description, dependencies, status
  blocks/<name>/              rebuilt blocks: <name>.tsx, schema.ts, example.ts, meta.ts
scripts/
  registry.mjs                writes registry JSON per engine from registry/ and runs shadcn build
proposals/  plans/
```

What is authored lives in `registry/` and `packages/`. `registry.json` is
generated, never edited by hand.

### Engines

An engine is the headless library a component is built on: `base` (Base UI)
or, later, `radix`. There is no runtime abstraction over the two. Each
component has one source file per engine and one shared styles file.

```
registry/components/dialog/
  dialog.styles.ts     export const dialogStyles = { overlay: "…", popup: "…", … }
  dialog.base.tsx      import { Dialog } from "@base-ui/react/dialog"; uses dialogStyles
  dialog.radix.tsx     import { Dialog } from "radix-ui"; uses dialogStyles
```

At build time `scripts/registry.mjs` inlines the styles file into each
engine file, so a project receives a single `components/ui/dialog.tsx`, as
with shadcn.

**State attributes.** The libraries mark state differently: Base UI sets
`data-open`, `data-checked`, `data-disabled`; Radix sets
`data-state="open"`, `data-state="checked"`, `data-disabled`. Tailwind v4
custom variants match both, so one class string works on either engine:

```css
@custom-variant ui-open (&:where([data-open], [data-popup-open], [data-state="open"]));
@custom-variant ui-closed (&:where([data-closed], [data-state="closed"]));
@custom-variant ui-checked (&:where([data-checked], [data-state="checked"]));
@custom-variant ui-indeterminate (&:where([data-indeterminate], [data-state="indeterminate"]));
@custom-variant ui-invalid (&:where([data-invalid], [aria-invalid="true"]));
@custom-variant ui-active (&:where([data-active], [data-state="active"]));
@custom-variant ui-pressed (&:where([data-pressed], [data-state="on"]));
@custom-variant ui-disabled (&:where([data-disabled], :disabled));
@custom-variant ui-highlighted (&:where([data-highlighted]));
```

These variants live in `packages/core/src/variants.css`. Components use
`ui-open:` and never `data-open:` or `data-[state=open]:` directly.

**Enter and exit animations.** Base UI animates with CSS transitions
(`data-starting-style`, `data-ending-style`) or CSS animations; Radix only
waits for CSS animations. To share one styles file, popups animate with
keyframes (`ui-open:animate-in ui-closed:animate-out`, timed by the village
motion tokens). A component may add engine-specific motion classes in its
styles file (`motion.base`, `motion.radix`) when transitions are clearly
better, for example interruptible open/close on a popover.

**Composition.** Each engine keeps its native prop: `render` on Base UI,
`asChild` on Radix. Unifying them would mean wrapping every part. The docs
show both.

**Slots.** Every part sets `data-slot="dialog-popup"` etc., with the same
names on both engines, so blocks and project CSS can target parts on
either engine.

### Villages

A village sets every token in the contract. Components use only contract
tokens through Tailwind utilities (`bg-primary`, `rounded-lg`,
`h-control`, `border-(length:--border-width)`…).

**The contract** (`packages/villages/src/contract.css`, about 70 tokens). The
design canvas (27 components × 3 villages) showed which choices a village
must be able to make; each became a token:

| Group | Village sets | Components use | Notes |
|---|---|---|---|
| Colour | `--background` `--foreground` `--card` `--popover` `--secondary` `--muted` `--accent` `--destructive` (+ `-foreground`), `--border` `--input` `--overlay`, `--tooltip` (+ `-foreground`) | `bg-background`, `text-muted-foreground`, `bg-overlay`… | shadcn names, so shadcn components follow the village |
| Accent | `--primary-l` `--primary-c` (light and dark), `--on-primary` | `bg-primary`, `ring-ring` | The nature gives the hue (see below) |
| Shape | `--radius`, `--control-radius`, `--pill-radius`, `--check-radius`, `--border-width` | `rounded-lg`, `rounded-control`, `rounded-pill`, `rounded-check`, `border-village` | Iwa: everything 0 and 2px borders; Kiri: 16 / 14 |
| Type | `--font-body` `--font-heading` `--font-code`, `--display-tracking` | `font-sans` `font-display` `font-mono`, `tracking-display` | |
| Controls | `--control-sm/md/lg`, `--control-px`, `--input-px`, `--control-font`, `--control-text`, `--control-weight`, `--control-tracking`, `--control-case` | `h-control`, `px-control-x`, `px-input-x`, `font-control`, `text-control`, `font-control-weight`, `tracking-control`, `case-control` | Iwa: mono uppercase labels |
| Fields | `--input-bg`, `--input-shadow` | `bg-input-bg`, `shadow-input` | Kiri: glassy fields |
| Switch | `--switch-track`, `--switch-thumb`, `--switch-border` | `bg-switch-track`, `bg-switch-thumb`, `border-switch-border` | The thumb turns light in dark mode; Iwa: bordered track, ink thumb |
| Depth | `--elevation-sm/md/lg`, `--surface-blur`, `--texture` | `shadow-sm…lg`, `backdrop-blur-surface` | Iwa: hard offset shadows; Kiri: blur and mist |
| Focus | `--focus-width`, `--focus-offset` | `focus-ring` | Konoha 3px halo, Kiri 4px, Iwa 2px with a 2px gap |
| Press | `--press-scale`, `--press-offset`, `--press-shadow` | `pressable` | Iwa sinks 3px into its shadow, others scale |
| Motion | `--motion-fast/base/slow`, `--motion-ease-out/in-out` | `duration-base`, `ease-out` | Read by `packages/motion` too |

Hover colours are not tokens: components mix the colour with
`color-mix()` (`hover:bg-primary/90`), which works for every nature,
including Onmyōton.

**The nature axis.** A village does not choose the accent colour; it
chooses how *strong* the accent is (lightness and chroma, per mode). The
nature chooses the hue:

```css
/* contract.css: recomputed on every element that sets a village or a nature */
:where([data-village], [data-nature]) {
  --primary: oklch(var(--primary-l) var(--primary-c) var(--nature-hue));
  --primary-foreground: var(--on-primary);
  --ring: oklch(var(--primary-l) var(--primary-c) var(--nature-hue) / 0.5);
}
/* natures.css */
[data-nature="katon"] { --nature-hue: 48; }   /* fire */
[data-nature="suiton"] { --nature-hue: 240; } /* water */
```

That is what makes the two axes independent: Kiri keeps any nature soft,
Kumo keeps any nature electric.

**Onmyōton** (yin–yang release) is the nature without a hue. The primary is
the village's own ink, black on light and white on dark, with a grey focus
ring; links keep their underline since colour no longer marks them. It is
declared on every village element, so nested dark sections get white, not
the page's black. Natures are imported after villages so that it wins.

**The tint.** Every grey a village declares carries its chroma through a
multiplier, and `data-tint="neutral"` sets it to 0:

```css
[data-village="konoha"] { --background: oklch(0.985 calc(0.004 * var(--tint, 1)) 75); }
[data-tint="neutral"] { --tint: 0; }
```

Lightness, shape and type stay; the warmth (Konoha) or coolness (Kiri) of
the greys goes. Destructive red is not multiplied. One source of truth, no
generated file.

**Scoping.** Villages and natures are set with attributes, on `<html>` or
any element below it. Dark mode uses the shadcn `.dark` class:

```html
<html data-village="konoha" data-nature="katon" data-tint="village" class="dark">
  …
  <section data-village="iwa">…</section>
</html>
```

Popups (dialog, menus, tooltips) render in a portal on `<body>`, outside a
scoped section, so they would take the page's village, not the section's.
`VillageScope` (`packages/core`, installed as `@/lib/village-scope`) solves
it:

```tsx
<VillageScope village="iwa" nature="raiton" scheme="dark" as="section">
  <Dialog>…</Dialog>
</VillageScope>
```

It sets the attributes on its element and keeps a twin in `<body>`, a
`display: contents` element with the same attributes. Components portal
into it (`usePortalContainer()`), so popups inherit the scope's tokens
without being clipped by its `overflow` or repositioned by its transforms.
A nested scope inherits what it does not set. `scheme="light"` inside a dark
page works too: the village dark rules give way to a nearer `.light`.

**Village and nature list.** First release: **Konoha** (balanced, warm,
rounded; the default), **Kiri** (misty: low contrast, translucent surfaces,
soft easing, airy), **Iwa** (stone: no radius, heavy borders, mono display
type, dense, quick). These three differ on every axis of the contract, so
they test it. Next: Kumo (high contrast, sharp, snappy), Suna (sand, grain,
soft shadows), Uzushio (Uzumaki red spirals, expressive motion), Ame/Oto
(dark-first, editorial).

Natures: Katon (fire, 48), Doton (earth, 75), Futon (wind, 160), Suiton
(water, 240), Raiton (lightning, 290), Onmyōton (yin–yang, no hue). Default
nature per village: Konoha → Katon, Kiri → Suiton, Iwa → Doton, Kumo →
Raiton, Suna → Futon.

**Contrast is checked, not hoped for.** `pnpm contrast` computes every
village × nature × scheme × tint combination from the CSS files and fails
under 4.5:1 for text pairs (foreground on background, muted text, text on
primary, secondary and destructive, links). Konoha's first primary (0.62)
failed it with white text, and so did 0.55 for green and blue (futon 4.07,
suiton 4.40): oklch lightness is perceptual, WCAG luminance is not. Konoha
now uses 0.52. Focus rings are reported against 3:1 without failing: the
42% halos of Konoha and Kiri are under it (open question 5).

### Components

**Anatomy.** One folder per component (see "Engines"). `meta.ts`:

```ts
export const meta = {
  name: "dialog",
  title: "Dialog",
  description: "A window over the page that holds focus until it is closed.",
  status: "beta",                       // "beta" | "stable"
  engines: ["base"],                    // later ["base", "radix"]
  dependencies: { base: ["@base-ui/react"], radix: ["radix-ui"] },
  registryDependencies: ["button"],
};
```

**First release (about 25):** accordion, alert, alert-dialog, avatar,
badge, button, card, checkbox, collapsible, dialog, dropdown-menu, input,
label, popover, progress, radio-group, scroll-area, select, separator,
skeleton, slider, switch, tabs, textarea, toast, toggle, tooltip. Names
match shadcn so a project can move between the two.

**Quality gate.** A component is done when it renders correctly in the three
villages × light/dark × two natures, passes keyboard and screen reader
checks, uses only contract tokens and `ui-*` variants, and its demo builds.

### Blocks

Blocks are rebuilt on the components, in `registry/blocks/`. The RFC-0001
content contract stays: content from a typed `content` prop, `schema.ts`,
`example.ts`, `meta.ts`, motion through `packages/motion`. Blocks use
village tokens, so a landing page restyles completely with the village. The
6 blocks built under RFC-0001 are the first to rebuild.

### Registry and URLs

- Output: `/r/<engine>/<name>.json`, e.g. `/r/base/dialog.json`. The engine
  is in the URL from day one, so Radix adds `/r/radix/…` without changing
  anything published.
- v1 items stay at `/r/<name>.json`. No v1 name collides with an engine
  folder.
- shadcn users add a namespace once:
  `"registries": { "@rasengan": "https://registry.rasengan.dev/r/base/{name}.json" }`.
- Shared code is published as `registry:lib` items: `rasengan-core` (cn,
  variants) and `rasengan-motion`. Villages are `registry:theme` items, one
  per village plus `rasengan-natures`.

### CLI (`packages/cli`, npm `rasengan-ui`)

`rasengan-ui.json` at the project root:

```json
{
  "engine": "base",
  "village": "konoha",
  "nature": "katon",
  "tint": "village",
  "css": "src/styles/index.css",
  "aliases": { "components": "@/components", "ui": "@/components/ui", "lib": "@/lib" },
  "registry": "https://registry.rasengan.dev/r"
}
```

| Command | What it does |
|---|---|
| `init` | Detects the framework, checks Tailwind v4 and React 19, asks for engine, village and nature, writes the config, installs core and the village, adds the CSS imports and the `data-village`/`data-nature` attributes |
| `add <name…>` | Installs components or blocks for the project's engine, with their dependencies |
| `village list` / `village set <name>` / `village add <name>` | Lists, switches or installs villages (several can be installed for scoping) |
| `nature set <name>` / `tint set <village\|neutral>` | Switches the nature or the tint |
| `diff [name]` | Shows what changed locally and upstream since install |
| `update [name]` | 3-way merge between the installed version, the local file and the new version |
| `doctor` | Checks config, CSS imports, versions, missing dependencies |
| `migrate --engine radix` | Later: switches engine, replacing only files without local edits |

`rasengan-ui.lock` records, for each installed file, the item, version and
content hash at install time. That is what `diff`, `update` and `migrate`
need. The CLI reads the same registry JSON as the shadcn CLI; it adds no
private format.

### Site (`apps/site`)

A Rasengan.js 2 app, like Sharingan's. Every preview has a village, nature
and light/dark switcher. It serves the registry output under `/r`. Docs
follow the MDX conventions of the Hiraiship docs.

## Rollout

**Done: foundations** (`feat/ui-next`, 519cc25): layout, `packages/core`,
contract, Konoha, natures, `scripts/registry.mjs`, button and dialog,
minimal site.

The design was then explored on a canvas (27 components × Konoha, Kiri, Iwa
× six natures × light/dark × tint) and in Figma (free plan, one variable
mode: Theme and Primitives collections named for a later move to modes).
The plan below implements it.

1. **Token contract** (`packages/villages`): the contract above, Konoha
   rewritten with the tint multiplier and a 0.55 primary, Kiri and Iwa as
   real villages, Onmyōton, natures imported after villages, `pnpm contrast`.
2. **Core** (`packages/core`): `VillageScope` and `usePortalContainer()`
   (done; Dialog uses it, every popup component will); more `ui-*` variants
   as components need them.
3. **Components** (`registry/components`), in dependency order, five
   batches, each component meeting the quality gate:
   1. Forms (done): input, label, field, textarea, checkbox, radio group,
      switch; button and dialog aligned to the contract
   2. Controls: toggle, toggle group, slider, select, separator
   3. Display: badge, avatar, card, alert, skeleton, progress
   4. Overlays: tooltip, popover, dropdown menu, alert dialog
   5. Navigation: tabs, accordion, collapsible, scroll area, toast
4. **Site** (`apps/site`): village, nature, tint and light/dark switcher, one
   page per component, screenshots of every combination for visual review,
   an axe pass.
5. **CLI**: `init`, `add`, `village`, `nature`, `tint`; then the lockfile
   with `diff` and `update`.
6. **Then**: rebuild the RFC-0001 blocks; Kumo, Suna, Uzushio; Figma modes
   once the team is on a paid plan; switch-over (`apps/site` serves the v1
   JSON at the same `/r/<name>.json` paths and takes over
   `registry.rasengan.dev`, `apps/ui` and `apps/docs` are archived); the
   Radix engine (`.radix.tsx`, `/r/radix/…`, `migrate`).

## Alternatives considered

- **A runtime adapter over Base UI and Radix.** Rejected: it adds a layer
  users cannot own, and fights both libraries' composition models.
- **Install-time styles (shadcn's approach).** Rewriting class strings per
  style at install time allows deeper differences between styles, but a
  theme can then never be switched at runtime or scoped to a section. The
  token contract trades some freedom for that.
- **One theme axis (village only).** Simpler, but each village would need
  one variant per accent colour, or users would edit village files to
  change the brand colour.
- **Only the shadcn CLI.** No lockfile, so no safe update, and no village
  commands. The registry stays shadcn-compatible anyway.

## Open questions

1. Domain: keep `registry.rasengan.dev` for both registry and docs, or a new
   `ui.rasengan.dev`?
2. Fonts per village: open-licence faces only, self-hosted by the CLI or
   loaded from a CDN?
3. Does the CLI also create a project (`rasengan-ui create`, Rasengan.js
   template with a village), or only set up existing ones?
4. `packages/data` (the Futon meta model) has no place in this layout yet.
   Keep it here, or move it to the Futon project?
5. Focus rings: the soft 42% halos of Konoha and Kiri are under the 3:1
   WCAG asks of focus indicators (1.7–2.7:1). Keep the halo and add a thin
   solid inner ring, raise the opacity, or accept it as a village trait?
