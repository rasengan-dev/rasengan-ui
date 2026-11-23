# ADR-0020 — Under reduced motion, scroll feedback keeps working; scroll-linked content is static

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-23 |
| Replaces | — (words invariant 19 for scroll-linked components). Settles [RFC-0010](../rfc/0010-scroll-motion.md), question 3 |

## Context

Invariant 19 says `off` (reduced motion) and `final` render every animation in its end state. RFC-0010's components
follow the user's scroll rather than a duration. Some move content (cards that shrink, a track that moves sideways,
words that rise); one, `scroll-progress`, moves only itself, to tell the reader how far they are. A table of contents
that follows the scroll will be the next of that kind.

## Decision

- **Under `off`, a component that moves nothing but itself, and only with the user's scroll, keeps working.**
  `scroll-progress` fills as the page scrolls.
- **Every component that moves content renders its static form** under `off` and `final`, and without JavaScript:
  full text, open image, plain list, native horizontal row.
- `final` renders the static form for every component, `scroll-progress` included (at 0), so screenshots are stable;
  demos pass `progress` to show the moving form at a fixed point.
- Invariant 19 gains this sentence.

## Options ruled out

- **Hide `scroll-progress` under `off`**: it is information, not decoration, and it triggers nothing a reduced-motion
  user asked to avoid.
- **Keep every scroll-linked effect under `off`, since the user drives it**: sideways tracks, zooms and stacking are
  exactly the vestibular motion reduced motion is for.

## Consequences

- Each scroll-linked component's page says which of the two kinds it is.
- A future component that wants the exception must move nothing but itself, and only with the scroll.
