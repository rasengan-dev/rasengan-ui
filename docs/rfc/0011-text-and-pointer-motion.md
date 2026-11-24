# RFC-0011 — Text and pointer motion: rotating words, a sheen, and effects that follow the mouse

| | |
|---|---|
| Status | Accepted (2026-11-24). Questions 1 to 4 settled, see "Decisions"; question 5 is measured in lot 0; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-24 |
| Author | Dilane Kombou |
| Builds on | RFC-0007 (motion components, accessibility, quality gate), ADR-0010 to ADR-0012 (motion without Motion where the browser is enough), ADR-0009 (categories), invariant 21 (a pause control for what moves on its own), the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `registry/components` (five new folders, and Badge), `packages/motion` (a shared pointer tracker, if lot 0 keeps it), `apps/site` (pages, the Motion section) |
| Decision needed | — (questions 1 to 4 settled, see "Decisions"; 5 is measured in lot 0) |

## Problem

The second group of effects the [survey](../surveys/2026-11-23-framer-templates.md) found on Framer's templates is about
text and the mouse, not the scroll:

- **Words that change in a heading** ("Websites that are *fast* / *friendly* / *yours*"): on most SaaS, AI and agency
  heroes. The registry has `typewriter` and `scramble-text`, which type or decode a string, but nothing that swaps one
  word in a sentence that stays put.
- **A sheen across a word or a button**: the "shiny" text of AI and SaaS templates.
- **A glow that follows the mouse on a card** (spotlight cards), on feature grids and pricing.
- **A list of projects whose picture follows the mouse** over the row it hovers: the portfolio and agency index.
- **A trail of pictures behind the mouse**: portfolio heroes, travel, contact pages.
- **A pulsing dot beside "Available" or "Live"**: portfolios, directories, status lines.

Without them, the portfolio and SaaS templates of the next RFCs would each build their own, and the motion would not
follow the village.

## Goals

1. Six pieces: `text-rotate`, `shiny-text`, `spotlight`, `hover-image-list`, `image-trail` and a live dot on Badge, on
   the same contract as every other component.
2. **The motion follows the village**: durations, easing, springs, travel and intensity from the `--motion-*` tokens.
3. **Nothing from Motion**: the Web Animations API, CSS, and `stepSpring` from `rasengan-motion` for what follows the
   mouse, as the cursor does (ADR-0011). Each piece stays about 2 to 3 kB gzip beyond `cn()`.
4. **Pointer effects are an addition, never the content**: on touch screens and with the keyboard, every piece shows its
   content and works without them.
5. Invariant 21 kept: what moves on its own for more than five seconds can be paused.

## Non-goals

- **WebGL, shaders, particles**: the survey's P3 backgrounds, for a later RFC.
- **Flip cards, hover masks, split-flap boards, physics piles**: P3, a later RFC.
- **New blocks.** The portfolio and SaaS blocks that use these come with their own RFCs.
- **New contract tokens.** The existing `--motion-*` tokens and intensity are enough.

## Proposal

### 1. Clean room

As in RFC-0007 and RFC-0010: Framer's marketplace components are other people's products. These are written from their
observable behaviour, with our names and our demo content.

### 2. The components

| Name | What it does | Category | Builds on | Lot |
|---|---|---|---|---|
| `text-rotate` | One word (or a few) inside a sentence changes in turn: slides up, fades, or rolls like a slot machine. The sentence keeps its place; the slot's width follows the current word, eased | motion | Web Animations API | A |
| `shiny-text` | A sheen crosses a text (or a button's label), from the tone's colour to a lighter one, then rests | motion | CSS `background-clip: text`, a keyframe on `background-position` | A |
| `badge` (live dot) | A small dot before a badge's label that pulses: "Available for work", "Live", "Open now" | display | CSS keyframe | A |
| `spotlight` | Wraps a surface (a Card, a pricing plan): a soft glow follows the mouse inside it, and its border lights up near the mouse | motion | CSS custom properties written on `pointermove`, a radial gradient | B |
| `hover-image-list` | A list of rows (projects, services) where the hovered row's picture floats beside the mouse, eased by the village's spring | motion | `stepSpring`, Web Animations API for the picture's entrance | B |
| `image-trail` | Over an area, pictures drop behind the mouse as it moves, then fade and shrink away | motion | a pool of `img`, Web Animations API | B |

Notes on each:
- **`text-rotate`** takes the words as an array and the sentence around them as children:
  `<TextRotate words={["fast", "friendly", "yours"]}>Websites that are</TextRotate>`, with `position` before or after.
  `interval` is a duration in seconds; the change itself takes the village's slow duration. Intensity 1 fades in place;
  2 slides by the village's travel; 3 rolls with the spring's overshoot.
- **`shiny-text`** sweeps `times` times (default 2) on view, then rests; `on="hover"` sweeps when the pointer or focus
  reaches it. The sheen is a gradient between `--tone-text` and a lighter mix of it, so both ends pass 4.5:1.
- **The live dot** is a Badge prop, `indicator="live"` ("Decisions", question 4): a dot in the tone that pulses at the village's
  slow duration, and stays still (but shown) under reduced motion.
- **`spotlight`** writes `--spot-x` and `--spot-y` on `pointermove` (one rAF per frame) and fades the glow in and out
  over the village's base duration. Fine pointers only; it is a wrapper ("Decisions", question 3):
  `<Spotlight><Card>…</Card></Spotlight>`.
- **`hover-image-list`** keeps the rows as links in a list: the picture is decorative (`aria-hidden`), each row's own
  text says where it goes. Keyboard focus shows the row's picture beside the row, still.
- **`image-trail`** is decorative (`aria-hidden`); it drops a picture every `spacing` pixels of mouse travel, keeps at
  most `max` on screen, and stops when the mouse leaves.

API principles, as before: composition, `variant` × `tone` × `size` where they make sense, settings that default to the
village, and a `progress` or `paused` prop where a still picture is needed for screenshots.

### 3. Intensity, modes and villages

| Component | 0, `off`, `final` | 1 (fades) | 2 (travel) | 3 (showcase) |
|---|---|---|---|---|
| `text-rotate` | The first word, still | Words fade in place | Words slide by the travel | Words roll with overshoot |
| `shiny-text` | The text in its colour | One sweep, then rest | Sweeps as set | Same |
| Live dot | The dot, still | The dot pulses | Same | Same, with a ring |
| `spotlight` | The surface, no glow | Glow follows | Glow and lit border | Same, the glow on the spring |
| `hover-image-list` | Rows only | The picture fades in at the row | The picture follows the mouse | Same, it tilts with the speed |
| `image-trail` | Nothing | Nothing | Pictures drop and fade | Same, they turn a little |

Pointer effects run only on fine pointers (`(pointer: fine)`), as `cursor` does.

### 4. Accessibility

- **Invariant 21**: `text-rotate` moves on its own. Settled ("Decisions", question 1): it stops on its last word once it has
  shown each word `loops` times (default 1) if that takes five seconds or less; otherwise it shows a small pause
  button after the sentence, as `marquee` does. `shiny-text` sweeps at most `times` times and rests, under five
  seconds. Hover and focus pause both.
- **Screen readers** ("Decisions", question 2): `text-rotate` gives the sentence once, with its words as a list ("Websites that are
  fast, friendly or yours", `Intl.ListFormat`), and hides the animated slot. `shiny-text` is plain text.
- **No flashing**: the live dot pulses once per `--motion-slow` × 4 at most, far under three per second.
- **Pointer effects** never hide content, never take focus, and are `aria-hidden`.

## Options considered

- **Motion's `AnimatePresence` for `text-rotate`**: the exit and enter of a word is its typical use, but about 20 kB
  for what two Web Animations on one span do.
- **`text-rotate` as a mode of `typewriter`**: typing and swapping are different rhythms and different screen reader
  stories; two small components read better than one with modes.
- **A spotlight Card variant** (`<Card variant="spotlight">`): one less component, but only Cards would get it, and
  a pricing plan or a bento cell that is not a Card would not.
- **A `live-dot` component**: one more item in the catalogue for a dot inside a badge.
- **Canvas for `image-trail`**: smoother with hundreds of pictures, but a few `img` in a pool are enough, and stay
  sharp and themable.

## Risks and open questions

1. **Invariant 21 and rotating text.** Stop after one pass when it fits in five seconds, else a pause button
   (proposed); or always a pause button; or always stop after one pass, whatever its length. Settled, see "Decisions".
2. **What screen readers hear of `text-rotate`.** The sentence with every word as a list (proposed); the sentence with
   the first word only; or a live region announcing each change (noisy, ruled out by RFC-0007's "no live region"). Settled, see "Decisions".
3. **`spotlight`: a wrapper (proposed) or a Card variant.** Settled, see "Decisions".
4. **The live dot: a Badge prop `indicator="live"` (proposed) or a `live-dot` component.** Settled, see "Decisions".
5. **`pointermove` cost**: `spotlight` and `hover-image-list` on every card of a grid. Lot 0 measures a grid of twelve
   spotlight cards with the CPU slowed down six times; if it janks, one shared tracker in `rasengan-motion` serves them.

## Decisions

Settled by the maintainer on 2026-11-24:

| Question | Decision |
|---|---|
| 1. Invariant 21 and rotating text | **`text-rotate` stops on its last word after `loops` passes (default 1) when they fit in five seconds; longer, it shows a small pause button after the sentence**, as `marquee` does. Hover and focus pause it. `shiny-text` sweeps at most `times` times (default 2) within five seconds, then rests |
| 2. What screen readers hear | **The sentence once, with every word as a list**, joined by `Intl.ListFormat` (disjunction, the page's language): "Websites that are fast, friendly or yours". The animated slot is hidden. No live region |
| 3. `spotlight` | **A wrapper** around any surface (`<Spotlight><Card>…</Card></Spotlight>`), not a Card variant: a pricing plan or a bento cell that is not a Card gets it too |
| 4. The live dot | **A Badge prop, `indicator="live"`**, not a component: category `display` stays Badge's |

## Plan

**Lot 0, measure**: a grid of twelve spotlight cards and a hover list of twelve rows, both paths of the frame cost;
keep or add the shared pointer tracker.

**Lot A, text**: `text-rotate`, `shiny-text`, Badge's live dot.

**Lot B, pointer**: `spotlight`, `hover-image-list`, `image-trail`.

Each lot is done when its components have pages, demos published as examples, the villages grid (with `paused` or a
fixed state for screenshots), and pass `pnpm typecheck`, `pnpm test`, `pnpm axe` (`ready` and `off`) and
`pnpm screenshots` in every village, light and dark, with the keyboard, a touch screen and a screen reader checked by
hand. Each lot is one pull request, opened against `main`.
