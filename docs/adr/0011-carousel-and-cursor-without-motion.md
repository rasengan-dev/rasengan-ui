# ADR-0011 — Carousel on native scroll snapping; carousel and cursor animate without Motion

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-07 |
| Replaces | ADR-0010, "Consequences" (carousel on Motion's `m`), and RFC-0007's "loop" for the carousel |

## Context

ADR-0010 expected the carousel and other spring-driven components to use Motion's `m` with lazily loaded features,
about 20 kB at load. RFC-0007 asked the carousel for snap, drag, wheel, keyboard and loop, and the cursor for a spring
that follows the village.

## Decision

- **Carousel**: the viewport is the browser's own scroll container with CSS scroll snapping. Touch, trackpads and
  wheels scroll it natively. Arrows, dots, keys and a mouse drag move it by animating the scroll position with
  `bezierEasing(--motion-ease-out)` over `--motion-slow`, snapping turned off while it moves.
- **Loop** means rewind: past the last position the next arrow goes back to the first. No cloned slides.
- **Cursor**: follows the pointer with `stepSpring`, a small spring integrator using the village's
  `--motion-spring-stiffness` and `--motion-spring-damping`.
- `bezierEasing`, `stepSpring` and `springAtRest` live in `rasengan-motion`.

## Options ruled out

- **Motion's `m` and drag for the carousel**: about 20 kB more, and a scroll container rebuilt in JavaScript loses
  native touch momentum, scroll chaining and what assistive tech knows of a scrollable list.
- **An infinite loop with cloned slides**: clones need hiding from screen readers and the keyboard, and the position
  "5 of 5 then 1 of 5" is confusing; rewinding is what the WAI-ARIA pattern describes.
- **`scroll-behavior: smooth`**: the browser's curve, not the village's.

## Consequences

- Carousel about 6.5 kB and cursor about 4.3 kB gzip beyond `cn()` (and Button for the carousel), nothing from Motion.
- Native touch scrolling keeps the platform's feel, not the village's; only programmatic moves follow the village.
- Motion's `m` is still the way for exit animations and gestures that are not scrolling (gallery-3d, lot C).
