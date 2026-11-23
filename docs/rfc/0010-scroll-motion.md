# RFC-0010 — Scroll motion: effects that follow the page as it scrolls

| | |
|---|---|
| Status | Accepted (2026-11-23). Open questions 1 to 3 settled, see "Decisions" ([ADR-0019](../adr/0019-scroll-motion-on-css-scroll-timelines.md), [ADR-0020](../adr/0020-scroll-feedback-keeps-working-under-reduced-motion.md)); progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-23 |
| Author | Dilane Kombou |
| Builds on | RFC-0007 (motion components, accessibility, quality gate), ADR-0010, ADR-0011 and ADR-0012 (motion without Motion where the browser is enough), ADR-0009 (categories), ADR-0013 (blocks answer their container), the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `packages/motion` (`rasengan-motion`: the scroll progress), `registry/components` (six new folders), `registry/blocks/steps-scroll` (rebuilt on `sticky-scroll`), `apps/site` (pages, the Motion section) |
| Decision needed | — (questions 1 to 3 settled, see "Decisions"; 4 and 5 are measured and handled in the lots) |

## Problem

The [survey of Framer's templates](../surveys/2026-11-23-framer-templates.md) shows that what makes a template feel
high-end is mostly **what happens while the page scrolls**: cards that stack, a section that moves sideways, a
statement that fills word by word, an image uncovered by a mask, a pinned list whose visual changes, a reading bar.
Jutsify wants a catalogue of starting sites built only from Rasengan UI, and none of these exist in the registry.

RFC-0007 left them out on purpose ("Scroll-linked page choreography (pinning, scrubbing): blocks territory", with
"GSAP stays possible for scroll scenes in blocks"). Since then:
- `steps-scroll` (RFC-0009) already pins a column and swaps its image with an `IntersectionObserver`, inside the block:
  the next block that needs it would copy that code.
- `rasengan-motion`'s `Parallax` is the only scroll-linked piece, and it is the one primitive that still loads Motion
  (`useScroll`, `useTransform`, `m`).
- No block can use these effects without each one building its own.

This RFC makes them components, on one shared scroll progress in `rasengan-motion`, before the sector blocks of the
following RFCs (hotels, events, content, portfolio) need them.

## Goals

1. Six components: `scroll-progress`, `image-reveal`, `text-scroll-fill`, `sticky-scroll`, `scroll-stack`,
   `horizontal-scroll`, on the same contract as every other component (copied into the project, contract names only,
   every village, light and dark, the quality gate).
2. **One scroll progress** in `rasengan-motion` that all of them read, so the cost is paid once and a block author
   learns one thing.
3. Light: no component loads Motion, and each one stays about 2 kB gzip beyond `cn()` and `rasengan-motion`.
4. **Native scrolling stays native**: the page scrolls as the platform scrolls it; effects follow the scroll, never
   drive it.
5. Accessible as RFC-0007 requires: content visible without JavaScript and under reduced motion, keyboard focus never
   lost inside a moving section, screen readers read the content once, in order.

## Non-goals

- **Smooth scrolling** (Lenis-like libraries that replace the browser's scroll with an eased one). Never, see
  "Decisions" (question 2).
- **Scroll snapping of the whole page**, and sections that take over the wheel.
- **`scroll-zoom` and `video-scrub`**: the next motion RFC (survey, P2), once the progress exists.
- **GSAP and ScrollTrigger**, in components or in blocks. This RFC closes RFC-0007's "GSAP stays possible" door: one
  way to do scroll effects.
- **New blocks.** Only `steps-scroll` changes, to prove `sticky-scroll` (lot C). Sector blocks come in their own RFCs.
- **New contract tokens.** The existing `--motion-*` tokens and the intensity are enough (section 4).

## Proposal

### 1. Clean room

As in RFC-0007: Framer's marketplace components are other people's products. Components are written here from their
observable behaviour, with our own names and demo content. Generic names (`scroll-progress`, `scroll-stack`) are fine.

### 2. The engine: CSS scroll timelines, with a small fallback

Measured on 2026-11-23 (esbuild, minified, gzip, React external, `motion` 14.6):

| What a component would import | Weight |
|---|---|
| `useScroll`, `useTransform` and `m` from `motion/react` (what `Parallax` does) | about 13.7 kB |
| `useScroll` and `useTransform` only | about 8.8 kB |
| `scroll()` from `motion` (vanilla) | about 3.9 kB |
| CSS scroll timelines (`animation-timeline: view()` / `scroll()`) | 0 kB |
| A progress observer of our own (estimate, measured in lot 0) | under 1 kB |

CSS scroll-driven animations became Baseline (Chrome, Safari, Firefox 159) in October 2026
([web.dev](https://web.dev/blog/web-platform-10-2026)). Recent browsers therefore run them with no JavaScript, often
off the main thread. Older ones (Safari before 26, Firefox before 159) still matter for sites Jutsify publishes to
small businesses' customers.

Proposal (settled, see "Decisions", question 1):
- `rasengan-motion` registers one custom property, `--scroll-progress` (`@property`, `<number>`, initial `0`). A
  component's styles read it in `calc()`: `scale: calc(1 - var(--scroll-progress) * 0.06)`.
- **Where `animation-timeline` is supported**, a keyframe animation drives `--scroll-progress` from 0 to 1 on the
  element, with `animation-timeline: view()` and the component's `animation-range`. No JavaScript per frame.
- **Elsewhere**, `useScrollProgress` writes the same property: one passive `scroll` listener and one
  `requestAnimationFrame` loop shared by the whole page, a read of every watched element's box then the writes, and an
  `IntersectionObserver` so only elements near the viewport are measured. No React render per frame.
- The choice is made once per page (`CSS.supports("animation-timeline: view()")`), so a component has **one set of
  styles**, whatever drives the property.
- `Parallax` moves onto it, and `rasengan-motion` stops importing `useScroll` and `useTransform`.

```ts
// rasengan-motion
export type ScrollRange = "cover" | "contain" | "entry" | "exit" | "pin";
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>, options?: { range?: ScrollRange; progress?: number }): void;
```

`range` names the part of the element's path through the viewport that maps to 0–1: `cover` (from entering to
leaving), `entry`, `exit`, `contain`, and `pin` (the time a tall section stays pinned, for `scroll-stack` and
`horizontal-scroll`). `progress` fixes the value (demos, screenshots, tests).

Scroll-linked motion follows the scroll, not a duration, so `--motion-fast/base/slow` do not apply. The village still
shows: `--motion-ease-out` shapes how each word or card moves through its share of the progress, `--motion-distance`
how far things travel, `--motion-stagger` how far apart siblings start, and the intensity gates the effects (section 4).

### 3. The components

| Name | What it does | Category | Builds on | Lot |
|---|---|---|---|---|
| `scroll-progress` | A thin bar fixed to the top of the page (or of an article) that fills as you read. `tone`, `size`, `target` (the page or an element) | motion | `--scroll-progress` | A |
| `image-reveal` | An image (or any media) uncovered by a mask when it comes into view: `curtain` (from a side), `circle`, `diagonal`, with a slight zoom out. Optional `scrub`, which ties the mask to the scroll instead of playing once | motion | `useReveal`, Web Animations API (`clip-path`) | A |
| `text-scroll-fill` | A statement whose words go from `text-muted-foreground` to `text-foreground` (or the nature's `primary`) one after another as it crosses the viewport | motion | `splitText`, `--scroll-progress` | A |
| `sticky-scroll` | A list of items down one column and a pinned stage beside it; the stage shows the active item's media. Parts: `StickyScroll`, `StickyScrollItem`, `StickyScrollMedia`, `StickyScrollStage` | display | `IntersectionObserver` (active item), Presence-like crossfade on the Web Animations API | C |
| `scroll-stack` | Cards that stick under the top of the viewport one after another; each card shrinks and dims a little as the next covers it. Parts: `ScrollStack`, `ScrollStackItem` | motion | CSS `position: sticky`, `--scroll-progress` | B |
| `horizontal-scroll` | A tall section whose content is pinned and moves sideways as the page scrolls down. Parts: `HorizontalScroll`, `HorizontalScrollTrack`, `HorizontalScrollItem` | motion | CSS `position: sticky`, `--scroll-progress` (`range: "pin"`) | B |

Notes on each:
- **`scroll-progress`** is `aria-hidden`: the page's own scrollbar already says where you are, and a progress bar
  announcing every change would be noise.
- **`image-reveal`** keeps the image's `alt` and size from the first render, so nothing shifts when the mask opens.
  The mask is a `clip-path`, never a cover element on top: the image stays selectable and its link clickable.
- **`text-scroll-fill`** starts from `text-muted-foreground`, which already passes 4.5:1 in every village: the
  statement is readable at every point of the fill. Screen readers read the sentence once (`splitText` keeps it whole).
- **`sticky-scroll`** turns into a plain list below `@3xl` (ADR-0013): each item shows its own media under its text,
  as `steps-scroll` does today. The active item is the one crossing the middle of the viewport. It is `display`,
  not `motion`: without the motion it is still a list of steps with pictures (ADR-0009's rule).
- **`scroll-stack`** sets each card's `top` from its index (`calc(var(--stack-top) + index * var(--stack-gap))`), so
  the stacking itself is CSS. JavaScript only feeds the shrink.
- **`horizontal-scroll`** measures its track (`ResizeObserver`) to set the section's height. When a keyboard user tabs
  to a card that is off-screen, it scrolls the page to the position that brings that card in (the browser cannot,
  since the card is moved by `transform`). Below `@md`, and without JavaScript, the track is a native horizontal scroll
  row with snap points, like `carousel`'s viewport.

API principles, as in RFC-0007: composition with shadcn-like part names, `variant` × `tone` × `size` where they make
sense, settings as props that default to the village, and `progress` on every root to fix the state.

### 4. Intensity, modes and villages

| Component | Intensity 0 | 1 (fades) | 2 (travel) | 3 (showcase) |
|---|---|---|---|---|
| `scroll-progress` | Bar shown, filled by the scroll | Same | Same | Same |
| `image-reveal` | Shown | Fades in | Mask and zoom | Same, `scrub` allowed |
| `text-scroll-fill` | Full colour | Words fill | Words fill and rise by `--motion-distance` | Same |
| `sticky-scroll` | Plain list | Pinned stage, media cut | Pinned stage, media crossfade | Media crossfade and slide |
| `scroll-stack` | Plain list | Sticky stack, no shrink | Sticky stack, shrink and dim | Same, with a slight tilt |
| `horizontal-scroll` | Native row | Native row | Pinned, moves sideways | Same, items slightly parallax |

Modes (invariant 19):
- **No JavaScript, `pending`**: every component renders its static form (full text, open image, plain list, native
  row). Hidden or offset states apply only under `[data-motion="ready"]`.
- **`final`**: the static form, so screenshots are stable. Demos also pass `progress` (0, 0.5, 1) for screenshots of
  the moving form.
- **`off`** (reduced motion): the static form for every component that moves content. `scroll-progress` keeps filling:
  it moves nothing but itself, and only as the user scrolls ("Decisions", question 3).

Villages show through the tokens alone: Iwa (intensity 1) gets fades and cuts, no shrink, no sideways track; Konoha
and Kiri (2) the full effects, Kiri's crossfades slower; Kusa (3) the showcase extras with its spring overshoot on
`image-reveal`. The nature colours `scroll-progress` and `text-scroll-fill`'s `primary` variant.

### 5. Accessibility

On top of RFC-0007's section 5:
- **Nothing moves on its own**: every effect here follows the user's scroll, so no pause control is needed
  (invariant 21 covers what moves by itself). `image-reveal` plays once and is short.
- **Focus is never lost** in `horizontal-scroll` (section 3), and never hidden behind a stacked card in
  `scroll-stack`: a focused card's stack rises above the next one (`:focus-within`).
- **Reading order is the DOM order** in every component: the pinned stage of `sticky-scroll` is `aria-hidden` and
  each item carries its own media for assistive tech.
- **`position: sticky` and `overflow`**: an ancestor with `overflow: hidden` breaks sticky. The pages say so; blocks use
  `overflow-x: clip`.

## Options considered

- **Motion's `useScroll` and `useTransform`** (what `Parallax` uses): what the Framer world uses, and the obvious
  choice for a "motion collection", but 9 to 14 kB on every page with a scroll effect, and a React-driven value per
  frame. ADRs 0010 to 0012 already moved every RFC-0007 component off Motion for the same reason.
- **Motion's vanilla `scroll()`** (about 3.9 kB): it uses scroll timelines where it can, like this proposal, but
  imperatively, and still weighs more than our observer.
- **CSS scroll timelines only**: zero cost, but nothing at all on browsers that are still common on cheap phones.
- **Our observer only**: works everywhere, but keeps the main thread busy where the browser could do the work.
- **GSAP ScrollTrigger**: pinning and scrubbing are its strength, but a second engine, heavier, imperative, and its
  pin spacers rewrite the DOM.
- **Effects inside each block**: what `steps-scroll` does today; every block would repeat it.

## Risks and open questions

1. **The engine.** CSS scroll timelines with our fallback, Motion's `useScroll` (the Framer way, heavier), or our
   observer only. Settled, see "Decisions".
2. **Smooth scrolling.** Settled, see "Decisions": Rasengan UI never ships it. It replaces the platform's scroll (momentum, keyboard,
   find-in-page, scroll restoration), fights reduced motion, and the effects here do not need it. A project can still
   add a library on its own.
3. **`off` and `scroll-progress`.** Invariant 19 says `off` renders every animation in its end state. A component
   that moves nothing but itself, and only with the user's scroll, keeps working under `off`. Settled, see
   "Decisions".
4. **Animating a custom property** is not done on the compositor: a page with many scroll-linked elements recalculates
   styles each frame. Lot 0 measures a page with the six components on a low-end phone profile; if it janks, the
   components animate `transform` and `opacity` directly in their keyframes and the fallback writes those.
5. **`steps-scroll` rebuilt on `sticky-scroll`** changes a block's files: projects that edited it get a three-way merge
   on update (invariant 14). Its content schema does not change.

## Decisions

Settled by the maintainer on 2026-11-23:

| Question | Decision |
|---|---|
| 1. The engine | **CSS scroll timelines, with our fallback.** `--scroll-progress` is driven by `animation-timeline` where the browser supports it, and by `useScrollProgress` elsewhere; one set of styles per component. No component and no `rasengan-motion` primitive imports Motion's `useScroll` or `useTransform`. Motion stays for springs, drag and exits (ADR-0010). [ADR-0019](../adr/0019-scroll-motion-on-css-scroll-timelines.md) |
| 2. Smooth scrolling | **Never in Rasengan UI.** No component, block or primitive replaces the browser's scroll; effects follow native scrolling. A project may still add a library of its own, outside the registry. [ADR-0019](../adr/0019-scroll-motion-on-css-scroll-timelines.md) |
| 3. `off` and scroll-linked components | **A component that moves nothing but itself, and only with the user's scroll, keeps working under `off`** (`scroll-progress`; later a table of contents that follows the scroll). Every component that moves content renders its static form. [ADR-0020](../adr/0020-scroll-feedback-keeps-working-under-reduced-motion.md) |

## Plan

**Lot 0, foundations**
- `--scroll-progress` registered in `rasengan-motion`; `useScrollProgress` with its ranges, the shared frame loop and
  the `CSS.supports` switch; `Parallax` moved onto it, `useScroll` and `useTransform` gone from `rasengan-motion`.
- The weight measured and written on the Motion section's index, and the jank check of question 4.
- The SSR test covers the static form of a scroll-linked component; a test sets `progress` and reads the styles.
- Done when: a test page shows `Parallax` and a bare element following the scroll in Chrome (timelines) and with
  timelines turned off (fallback), and the gate passes.

**Lot A, on view**: `scroll-progress`, `image-reveal`, `text-scroll-fill`.

**Lot B, pinned**: `scroll-stack`, `horizontal-scroll`.

**Lot C, the stage**: `sticky-scroll`, and `steps-scroll` rebuilt on it (same schema, same look, smaller file).

Each lot is done when its components have pages (with the `position: sticky` note where it applies), demos published
as examples, the villages grid with `progress` at 0, 0.5 and 1, and pass `pnpm typecheck`, `pnpm test`, `pnpm axe`
(`ready` and `off`) and `pnpm screenshots` in every village, light and dark, with the keyboard (tabbing through
`horizontal-scroll` and `scroll-stack`) and a screen reader checked by hand. Each lot is one pull request.
