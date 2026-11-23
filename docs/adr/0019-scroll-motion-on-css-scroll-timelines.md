# ADR-0019 — Scroll motion runs on CSS scroll timelines, with a fallback of our own; no smooth scrolling

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-23 |
| Replaces | [RFC-0007](../rfc/0007-motion-components.md), the non-goal "GSAP stays possible for scroll scenes in blocks"; `Parallax` on Motion's `useScroll` ([ADR-0010](0010-motion-weight.md)). Settles [RFC-0010](../rfc/0010-scroll-motion.md), questions 1 and 2 |

## Context

RFC-0010 adds six components whose motion follows the page's scroll (`scroll-progress`, `image-reveal`,
`text-scroll-fill`, `sticky-scroll`, `scroll-stack`, `horizontal-scroll`). They need one way to know how far an element
has travelled through the viewport. Measured on 2026-11-23 (esbuild, minified, gzip, React external, `motion` 14.6):
Motion's `useScroll`, `useTransform` and `m` about 13.7 kB, the two hooks alone about 8.8 kB, vanilla `scroll()`
about 3.9 kB. CSS scroll-driven animations (`animation-timeline`) became Baseline in October 2026 with Firefox 159;
older Safari and Firefox are still common on cheap phones.

## Decision

- `rasengan-motion` registers `--scroll-progress` (`@property`, `<number>`, initial `0`). Components read it in
  `calc()`; each has **one set of styles**.
- Where `CSS.supports("animation-timeline: view()")`, a keyframe animation drives the property with
  `animation-timeline` and the component's `animation-range`.
- Elsewhere, `useScrollProgress(ref, { range, progress })` writes it: one passive scroll listener and one
  `requestAnimationFrame` loop for the whole page, reads then writes, and an `IntersectionObserver` so only elements
  near the viewport are measured. No React render per frame.
- `Parallax` moves onto it; `rasengan-motion` no longer imports `useScroll` or `useTransform`. Motion stays for
  springs, drag and exits.
- **No smooth scrolling**: no component, block or primitive replaces the browser's scroll. Effects follow native
  scrolling. A project may add a library of its own, outside the registry.
- **No GSAP**, in components or in blocks.

## Options ruled out

- **Motion's `useScroll` and `useTransform`**: 9 to 14 kB on every page with a scroll effect, and a value driven
  through React each frame.
- **Motion's vanilla `scroll()`**: also uses scroll timelines, but imperatively, and weighs more than our observer.
- **CSS scroll timelines only**: nothing at all on browsers that lack them.
- **Our observer only**: keeps the main thread busy where the browser can do the work.
- **GSAP ScrollTrigger**: a second engine, heavier, and its pin spacers rewrite the DOM.
- **A smooth-scrolling library**: it replaces momentum, keyboard scrolling, find-in-page and scroll restoration, and
  fights reduced motion; nothing here needs it.

## Consequences

- Scroll effects cost under 1 kB of JavaScript where timelines are missing, and none where they exist.
- Animating a custom property runs on the main thread: RFC-0010's lot 0 measures a page with the six components on a
  low-end phone profile. If it janks, components animate `transform` and `opacity` in their keyframes directly, and the
  fallback writes those.
- Two paths to test: Chrome with timelines, and the same page with timelines turned off.

## Revisit when

The fallback's browsers drop below the share that matters for the sites built with Rasengan UI: then the observer goes.
