# ADR-0010 — Reveals run on the Web Animations API; Motion's DOM features load on demand

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-07 |
| Replaces | RFC-0007, open question 1 (bundle size), and its "Engine" bullet (`LazyMotion` with `domAnimation` around the app) |

## Context

RFC-0007 planned `rasengan-motion` on `motion/react`, with `LazyMotion` and `domAnimation` in the provider, and asked
lot 0 to measure the cost. Measured with Vite (minified, gzip, React external):

| What the page uses | First version | This decision |
|---|---|---|
| `MotionProvider` + `Reveal` + `Stagger` | about 35 kB | **about 2 kB** |
| `Presence` | about 35 kB | about 22 kB at load, about 21 kB on demand |
| `Tilt` + `Magnetic` | about 37 kB | about 25 kB at load, about 18 kB on demand |
| `SplitText` | under 1 kB | under 1 kB |

The provider alone cost 29 kB, because `domAnimation` was imported statically, and `Reveal` pulled Motion's full
`animate` (24 kB) for a fade and a rise.

## Decision

- `Reveal` and `Stagger` animate with the browser's Web Animations API (`element.animate`, easing as CSS
  `cubic-bezier`) and an `IntersectionObserver` of their own. They import nothing from Motion.
- `MotionProvider` is a React context for the motion mode, nothing else.
- Components built on Motion's `m` (Presence, Parallax, Tilt, Magnetic, and later carousel, gallery-3d, number-roll)
  wrap themselves in `LazyMotion` whose features come from `@/lib/motion-features`, a file of one line imported
  dynamically, so bundlers put `domAnimation` in its own chunk.
- `rasengan-motion` therefore installs three files: `motion.tsx`, `motion-features.ts`, `split-text.tsx`.
- Each motion component's page reports its weight from the same measurement.

## Options ruled out

- **`LazyMotion` with static `domAnimation` in the provider**: every page with any motion pays 29 kB.
- **`motion/mini`'s `animate` for reveals** (about 3 kB): the native API does the same for free.
- **One file only**: a dynamic import needs a module of its own to become a separate chunk.

## Consequences

- A component that needs springs, drag or exit animations uses `m` inside the shared `Features` wrapper; one that only
  fades or travels uses the Web Animations API, like `Reveal`.
- Before the features chunk arrives, `m` components render without animating, which is what a slow network should get.
- esbuild's code splitting does not separate the chunk as well as Vite or webpack; projects on esbuild pay more.

## Revisit when

Motion ships a smaller entry for springs, or the Web Animations API gets spring easing (`linear()` approximations).
