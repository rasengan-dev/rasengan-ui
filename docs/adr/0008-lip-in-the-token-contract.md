# ADR-0008 — The contract carries a lip (`--lip`, `--press-*`), zero by default

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-05 |
| Replaces | — |

## Context

Kusa is a 3D village: what can be pressed stands on a solid edge (the "lip") and sinks onto it when pressed. A
village is CSS over a fixed token contract, and components may only use contract names, so the lip cannot be a Kusa
class on a few components: it has to be something every village declares and every component reads.

The lip colour depends on the element (a primary button has a darker primary lip, a secondary one a grey lip), so a
single token on the village root cannot hold it.

## Decision

- The contract gains `--lip` (`0px` by default), `--lip-shade`, `--lip-edge`, and `--press-x` / `--press-y` (the
  `pressable` utility translates by them).
- Every theme shadow ends with `0 var(--lip) 0 0 var(--lip-color)`; `--lip-color` is set on the element by the
  `lip-tone`, `lip-soft` and `lip-secondary` utilities, and each `tone-*` utility sets `--tone-lip`.
- New shadow utilities: `shadow-lip(-sm)`, `shadow-input` (fields stand on the lip), `shadow-check` (half a lip),
  `shadow-knob`; `--track-scale` for thicker tracks.
- The engine has `depth: "lip"`, `press: "drop"` and the base `kusa`; `kusa.css` is generated from
  `kusa.recipe.json`.

## Options ruled out

- **Kusa-only classes in the components**: breaks the rule that components only know contract names; every other
  village would carry dead classes.
- **One lip colour on the village root**: every element would get the same edge.

## Consequences

- Villages without a lip are unchanged: their shadows end with a zero-length edge. Konoha, Kiri and Iwa were checked
  pixel-identical before and after (1,356 screenshots).
- Every new component that has a shadow uses a theme shadow, not a raw one, or it will not stand on the lip.
