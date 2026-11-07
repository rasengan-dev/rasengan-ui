# RFC-0007 — Motion components

| | |
|---|---|
| Status | Accepted (2026-11-07). Open questions 2 to 7 settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-07 |
| Author | Dilane Kombou |
| Builds on | RFC-0001 (motion principles, `packages/motion`), RFC-0002 (components, villages, quality gate, motion tokens), RFC-0003 (examples for agents), RFC-0006 (the `motion` knob) |
| Packages | `registry/components` (new folders, `category` in every `meta.ts`), `packages/motion` (becomes the `rasengan-motion` item), `packages/villages` (motion tokens, `motion` knob), `scripts/registry.mjs`, `packages/cli` (MCP filter), `apps/site` (Motion section) |
| Decision needed | — (bundle size is measured in lot 0) |

## Problem

Rasengan UI's components move only to open and close: a dialog fades in, an accordion unfolds. There is nothing whose
point is the motion itself: a marquee of logos, a headline that types or decodes itself, a counter that rolls, a
carousel, a 3D gallery. Landing pages need these, the blocks planned by RFC-0002 need them, and agents building sites
(Jutsify) reach for them.

The demand is real and unmet in the open. Motion+ (motion.dev/plus) sells such components, headless and polished, as a
paid closed collection: Gallery, Carousel, Ticker, Cursor, Curtains, AnimateNumber, Typewriter, ScrambleText,
splitText, AnimateText, AnimateView and AnimateActivity, plus 50 marketing sections built from them. shadcn has none of
them. Nobody offers them in a design system where **the motion follows the theme**.

What we already have does not cover it:
- `packages/motion` (kept from RFC-0001) holds `Reveal`, `Stagger`, `Counter`, `Marquee`, `Tilt`, `Magnetic`,
  `Parallax`, `Presence` and a GSAP `SplitText`, but **nothing uses it**, it is not served by the registry, its tokens
  still describe RFC-0001's "nova" direction, and the CSS its comments rely on (`tokens.css`: the hidden-state failsafe,
  the marquee keyframes) did not come over from RFC-0001.
- The village contract already has `--motion-fast/base/slow` and two easings, set by the recipe's `motion` knob
  (`quick`, `calm`, `gentle`) and zeroed under `prefers-reduced-motion`. Nothing reads them beyond CSS transitions.
- The site lists 44 components in one alphabetical sidebar, with no categories.

## Goals

1. Ship **motion components** that look and feel premium, on the same contract as every other component: copied into
   the project, contract names only, every village, light and dark, the quality gate.
2. **The motion follows the village**: the same marquee or rolling number is quick and exact in Iwa, soft in Kiri,
   bouncy in Kusa, with no prop changed.
3. Accessible by construction: reduced motion, a pause control for anything that moves on its own, screen readers read
   the final text, keyboard everywhere.
4. A clear place for them: in the code (one folder, one contract) and on the site (a section that shows them moving).
5. Wire `packages/motion` into the registry as the shared `rasengan-motion` item, aligned on the village tokens.

## Non-goals

- **Porting Motion+.** No Motion+ source, names that are theirs, demo content or assets. See "Clean room".
- **Marketing sections.** Motion+'s 50 sections become blocks, in their own RFC, built from these components.
- **GSAP in components.** Components use one engine, Motion. GSAP stays possible for scroll scenes in blocks.
- **A runtime npm package.** Components stay copied into projects; `rasengan-motion` is copied like `rasengan-core`.
- **An `AnimateActivity` equivalent** (exit animations around React's `<Activity>`): niche and still early access
  upstream; `Presence` covers exits.
- **Scroll-linked page choreography** (pinning, scrubbing): blocks territory.

## Proposal

### 1. Clean room

Motion+ code is MIT once in a buyer's own site, but its terms require a Builder's Licence for a product that "resells
Motion+ capabilities", which a redistributed component library is. So:

- Components are designed and written here from their observable behaviour and from first principles. Nobody who
  writes them reads Motion+ source.
- Names are ours (`number-roll`, not `AnimateNumber`; `gallery-3d`, not `Gallery`; `page-transition`, not `Curtains`).
  Generic names (`marquee`, `carousel`, `typewriter`, `cursor`) are fine.
- The `motion` library itself (MIT, open source) is a normal dependency.

### 2. Organisation

**In the code: one folder, one contract.** Motion components live in `registry/components/<name>/` like the others
(`<name>.base.tsx`, `<name>.styles.ts`, `meta.ts`, demos). The registry build, the CLI, the MCP server, `pnpm axe` and
`pnpm screenshots` all walk that folder, so nothing in the tooling forks. They install the same way:
`npx rasengan-ui add marquee`.

**A `category` in every `meta.ts`.** One value per component:

| Category | Components |
|---|---|
| `forms` | button, button-group, checkbox, combobox, field, input, input-group, label, radio-group, select, slider, switch, textarea, toggle, toggle-group |
| `dates` | calendar, date-picker, time-picker |
| `overlays` | alert-dialog, dialog, dropdown-menu, popover, sheet, toast, tooltip |
| `navigation` | breadcrumb, command, navigation-menu, pagination, tabs |
| `display` | accordion, avatar, badge, card, collapsible, kbd, scroll-area, separator, table, carousel (new) |
| `feedback` | alert, empty, progress, skeleton, spinner |
| `motion` | the new components of section 4, except carousel and the Button variants |

The site's sidebar groups by category instead of one list; `list_components` (MCP) and `rasengan-ui add` (interactive
picker) can filter by it; the registry carries it in the item's `meta`.

**The rule for `motion`: is the motion the purpose?** If the component makes no sense once its animation is removed,
it is `motion` (marquee, typewriter, number-roll, gallery-3d). If it still works without it, it is a regular
component that happens to animate (carousel, dialog, tabs). The carousel is therefore `display`, even though it uses
`rasengan-motion`.

**On the site: a Motion section.** The header becomes Docs · Components · Motion (· Blocks later).

- `/motion` is a gallery: large cards with live demos, a replay button, and a "Reduced motion" switch that shows what
  those users get.
- Pages stay at `/components/<name>`, so a URL never changes with a category. The page skeleton (ADR-0006) gains, for
  `motion` components: the villages grid **in motion**, a "Reduced motion" section showing the end state, and the
  `motion` dependency named in the installation step.
- The sidebar's Motion group links the same pages.

### 3. Foundations: `rasengan-motion`

`packages/motion` becomes the `rasengan-motion` registry item (`registry:lib`, installed under `@/lib/motion/…`),
reshaped:

- **Tokens from the village, not from TypeScript.** Durations and easings are read from the CSS custom properties of the
  element's village scope (`--motion-*`), once per mount, so a component inside a `VillageScope` moves like that
  village. `defaultMotionTokens` stays only as a fallback for a page without the contract. The "nova" values go.
- **New contract tokens**, in `contract.css` and `contract.ts`, with defaults equal to today's behaviour:

  | Token | Kind | Use |
  |---|---|---|
  | `--motion-spring-stiffness` | number | Springs (drag release, magnetic pull, number roll) |
  | `--motion-spring-damping` | number | Same; low damping = overshoot |
  | `--motion-distance` | length | How far things travel when they reveal |
  | `--motion-stagger` | time | Delay between siblings (text reveal, lists) |
  | `--motion-intensity` | number 0–3 | 0 none · 1 fades only · 2 travel, splits · 3 showcase (tilt, magnetic, 3D) |

  The recipe's `motion` knob sets them with the durations. It gains a fourth value, **`bouncy`** (spring overshoot,
  intensity 3), and Kusa moves from `quick` to `bouncy`. Iwa stays `quick` with intensity 1 (no travel, no overshoot):
  its character is exactness.
- **Intensity can be overridden on any element** with `data-motion-intensity="0|1|2|3"`: a dashboard calms showcase
  effects down, a landing page turns them up, without leaving the village. The attribute sets `--motion-intensity` for
  its subtree; `VillageScope` accepts it as a prop.
- **Modes**: the `data-motion` script (`pending`, `ready`, `final`, `off`) stays. Its CSS failsafe moves into
  `contract.css` so it ships with every village: hidden initial states apply only under `[data-motion="ready"]`, and
  `final` renders every animation in its end state (screenshots, tests, agents).
- **`splitText`** is rewritten without GSAP: characters, words and lines as spans, with the full text kept for assistive
  tech, re-split on resize for lines.
- **Engine**: `motion/react` with `LazyMotion` and `domAnimation`; CSS keyframes where they are enough (marquee loop,
  typewriter caret). The bundle cost is measured in lot 0 and reported on each page.
- The existing primitives are kept where they serve the components (`Reveal`, `Stagger`, `Presence`, `Magnetic`,
  `Tilt`); `Counter`, `Marquee` and `SplitText` are replaced by the components below.

### 4. The components

| Name | What it does | Category | Builds on | Lot |
|---|---|---|---|---|
| `text-reveal` | Reveals a heading by characters, words or lines (fade, rise, blur, mask), on mount or when in view | motion | `splitText`, `Stagger` | A |
| `typewriter` | Types one or several strings with a natural rhythm (pauses on punctuation, variable speed), optional caret and deletion | motion | — | A |
| `scramble-text` | Decodes a string from random glyphs, or between strings on cue | motion | — | A |
| `number-roll` | Rolls each digit to a new value, formatted with `Intl.NumberFormat` (currency, units, compact) | motion | springs | A |
| `marquee` | An infinite loop of items, horizontal or vertical, speed in px/s, slows on hover, pause button, minimal clones | motion | CSS loop | A |
| `carousel` | Snap, drag, wheel, keyboard, loop; slides, dots, arrows; headless parts with shadcn-like names | display | springs | B |
| `cursor` | A custom cursor that follows, snaps to targets, morphs to their size; fine pointers only | motion | `Magnetic` | B |
| `gallery-3d` | Images and videos arranged as ring, helix, coverflow, sphere, grid or stack, switching between them, drag and select, a detail view | motion | springs, 3D transforms | C |
| `page-transition` | Wipe, blinds, iris or mask transitions between pages or between two elements. A router-agnostic primitive, with a Rasengan.js adapter (focus, scroll restoration); Next.js and React Router wiring documented | motion | View Transitions API, `Presence` | C |
| `button` (variants) | `hold` (press and hold to confirm, with progress on the button) and rolling text on hover. Not motion components: Button still works without motion | forms | `rasengan-motion` | B |

API principles, for all of them:
- Composition over configuration, with shadcn-like part names where there are parts (`Carousel`, `CarouselContent`,
  `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselDots`).
- Variants on the usual axes where they make sense (`tone` for the accent of a cursor or a scramble, `size` for
  carousel arrows), never raw colours.
- Motion settings as props that default to the village (`duration`, `stagger`, `spring`), so a project can override
  one place without leaving the contract.

### 5. Accessibility

Each motion component documents and tests these:

- **Reduced motion and `data-motion="off"`**: the component renders its end state, or a non-moving equivalent (a
  marquee becomes a wrapped row, a gallery a grid, a page transition a cut). Never a broken layout.
- **Moving content that lasts more than five seconds has a visible pause control** (WCAG 2.2.2): marquee, autoplaying
  carousel, gallery autoplay. Hover and focus also pause.
- **Screen readers read the final text once**: `typewriter`, `scramble-text`, `text-reveal` and `number-roll` expose
  the final string (`aria-label` or a visually hidden copy) and hide the animated glyphs. No live region announcing every
  frame.
- **Clones are hidden and inert** (marquee, looping carousel): `aria-hidden` and out of the tab order.
- **Keyboard**: carousel and gallery move with arrows, Home and End, with roving focus; `cursor` never hides the native
  cursor on touch or coarse pointers, and never replaces focus indicators.
- **Page transitions move focus** to the new content's heading and keep the back button working.
- **No flashing** above three per second (WCAG 2.3.1) in scramble or glitch effects.

### 6. How villages and natures show

| Village | `motion` | Character |
|---|---|---|
| Konoha | `calm` | Smooth ease-out, short travel, light spring |
| Kiri | `gentle` | Slower, floaty, blur in reveals |
| Iwa | `quick`, intensity 1 | Instant and exact: fades and cuts, no overshoot, no 3D |
| Kusa | `bouncy` | Springy overshoot, things drop onto their lip |

The nature colours what carries the accent: the cursor, scramble glyphs, the digits that change, carousel dots. A
custom village gets all of it from its recipe.

### 7. Quality gate for motion

- `pnpm screenshots` captures motion demos with `?motion=final` (stable end states) and once with `?motion=off`.
- `pnpm axe` runs on motion pages in both modes.
- `packages/motion/test/ssr.test.tsx` grows to cover every component: server render shows the content, no hidden state
  without JavaScript.
- A new check in the component tests: each `motion` demo has a pause control when it moves for more than five seconds.

## Options considered

- **A separate `registry/motion/` folder and `/r/base/motion/…` URLs**: forks every script, the CLI and the MCP server
  for no gain; a category does the same job in metadata.
- **Mixing them into the components list with no section**: the site would show a marquee next to a label with the same
  small static preview, and they would be hard to find and to sell.
- **A runtime npm package (`@rasengan-ui/motion`) imported by projects**: breaks the copy-and-own model and the 3-way
  update; projects could not edit a component.
- **GSAP as the engine**: free now, but a second engine next to Motion, heavier, and imperative where Motion is
  declarative in React.
- **Buying Motion+ and adapting it**: the Builder's Licence clause, and the code would not be ours to publish.
- **CSS only**: enough for marquee and typewriter, not for drag physics, springs or interruption (carousel, gallery,
  number roll).
- **Category as a folder prefix** (`motion-marquee`): leaks the category into install names and imports.

## Risks and open questions

1. **Bundle size**: `motion` with `LazyMotion` on every page that has one motion component. Acceptable for marketing
   pages; measure in lot 0, report it on each page, and keep CSS-only components free of it.

## Decisions

Settled by the maintainer on 2026-11-07:

| Question | Decision |
|---|---|
| 2. `bouncy` for Kusa | **Yes.** Kusa moves from `quick` to `bouncy`: springs with overshoot, intensity 3. Kusa's screenshots change; the other villages do not |
| 3. Intensity per village or per page | **Both.** `--motion-intensity` per village, and `data-motion-intensity` on any element (and a `VillageScope` prop) to override it for a subtree |
| 4. `page-transition` and the router | **A router-agnostic primitive with a Rasengan.js adapter**; Next.js and React Router wiring documented by hand |
| 5. Names | **Neutral names**: `text-reveal`, `typewriter`, `scramble-text`, `number-roll`, `marquee`, `carousel`, `cursor`, `gallery-3d`, `page-transition`. Naruto names stay for theming (villages, natures) |
| 6. Categories of the existing 44 | **The table of section 2 as it is**: seven categories, no `layout` |
| 7. Hold-to-confirm and rolling-text buttons | **Button variants** (`hold`, rolling text), in lot B, under `forms` |

## Plan

**Lot 0, foundations**
- `category` in every `meta.ts`, carried by `scripts/registry.mjs`; the site's sidebar grouped; `list_components`
  filter. An ADR records the `category` field.
- Contract: the five motion tokens, the `bouncy` knob (Kusa moves to it), `data-motion-intensity`, the `data-motion`
  failsafe in `contract.css`; `pnpm contrast` and the drift test pass; Kusa's screenshots re-accepted after review.
- `packages/motion` reshaped and served as `rasengan-motion`; `splitText` without GSAP; SSR test.
- Site: `/motion` index, the Motion header link, the page additions, screenshots in `final` and `off`.
- Done when: an empty Motion section renders, `rasengan-ui add rasengan-motion` installs in the playground, the gate
  passes.

**Lot A, text and numbers**: `text-reveal`, `typewriter`, `scramble-text`, `number-roll`, `marquee`.

**Lot B, interaction**: `carousel`, `cursor`, and Button's `hold` and rolling-text variants.

**Lot C, showcase**: `gallery-3d`, `page-transition` (the primitive and its Rasengan.js adapter).

Each lot is done when its components have pages, demos published as examples, the villages grid in motion, and pass
`pnpm typecheck`, `pnpm test`, `pnpm axe` (both modes) and `pnpm screenshots` in every village, light and dark, with the
keyboard and a screen reader checked by hand. Then the blocks RFC picks up Motion+'s section ideas (logo ticker, stats
counters, split-text hero, testimonial stack) on top of them.
