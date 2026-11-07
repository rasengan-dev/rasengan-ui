# ADR-0012 — Gallery 3D and Page Transition without Motion; the Rasengan.js adapter is documented wiring

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-07 |
| Replaces | ADR-0011, "Consequences" (gallery-3d on Motion's `m`), and RFC-0007's "Rasengan.js adapter" as a separate piece |

## Context

Lot C of RFC-0007 is gallery-3d and page-transition. ADR-0011 still expected the gallery to use Motion's `m`. The
RFC decided "a router-agnostic primitive with a Rasengan.js adapter".

## Decision

- **gallery-3d**: every item's place is a pure function of the layout and a (fractional) position; items move with CSS
  transitions on `transform`, timed by `--motion-slow` and `--motion-ease-out`. In the ring, helix and sphere the
  cards are fixed on their shape and the scene turns, so the ring turns endlessly; cards have a back face; the scene
  takes no pointer, so cards behind its plane stay clickable. A drag sets the position directly and
  settles with `stepSpring`. Below intensity 2 or with motion off, it is a flat grid. The detail view is Dialog.
- **page-transition**: a curtain animated with the Web Animations API (wipe, blinds, iris, fade); it covers, runs the
  change, and uncovers when `id` changes, then focuses the new heading. The cover eases in (the village's ease-out,
  mirrored) and the reveal eases out, so the curtain never stops in the middle. The wipe moves a slanted panel by
  transform. The page curtain is a manual popover in the top layer where supported.
- **Router adapter**: `PageTransition` takes `id` (the pathname) and `navigate`; `TransitionLink` and
  `usePageTransition().navigate` use them. For Rasengan.js the adapter is three lines in the root layout
  (`useLocation`, `useNavigate`), shown on the component's page with Next.js and React Router. No separate registry item,
  because importing `rasengan` would break every other project.

## Options ruled out

- **Motion's `m` and `AnimatePresence` for the gallery**: about 20 kB more for what CSS transitions do.
- **The View Transitions API for pages**: it needs the DOM update inside `startViewTransition`, which routers do not
  expose the same way; the curtain works with any of them and with element scope.
- **A `page-transition-rasengan` item**: one more component in the catalogue for three lines of wiring.

## Consequences

- Gallery about 2.5 kB beyond `cn()` and Dialog; page-transition about 4.5 kB beyond `cn()`. RFC-0007 ships without
  loading Motion in any of its components; `Presence`, `Parallax`, `Tilt` and `Magnetic` in `rasengan-motion` remain the
  only users of `m`.
- A cancelled navigation lifts the curtain after 1.2 s; the browser's back button uncovers without a cover first.
