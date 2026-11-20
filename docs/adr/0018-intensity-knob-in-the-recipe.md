# ADR-0018 — The recipe sets the motion intensity apart from the motion knob

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-20 |
| Replaces | — (adds a knob to the recipe of [RFC-0006](../rfc/0006-custom-villages.md); the intensity scale is [RFC-0007](../rfc/0007-motion-components.md)'s) |

## Context

The contract has `--motion-intensity` (RFC-0007): how much motion components may do, 0 none, 1 fades only, 2 travel
and splits, 3 showcase. `useMotion().allows(n)` reads it, and `data-motion-intensity` overrides it on part of a page.

In a recipe, the intensity came only with the `motion` knob: `quick` gave 1, `calm` and `gentle` 2, `bouncy` 3. A team
could not ask for a calm village where only fades run, or a quick one that shows off, without an override of a raw
token. Jutsify, whose agent picks a motion level per site (calm, lively, expressive) for the pages it builds from blocks,
needs that choice as a recipe setting.

## Decision

**The recipe gains `intensity`: 0, 1, 2 or 3, apart from `motion`.**

- Left out, it is the one `motion` gives, as before: the built-in villages and every existing recipe write the same
  tokens.
- Set, it writes `--motion-intensity` whatever the motion: `motion` keeps the durations, easings, spring, travel and
  stagger.
- The engine exports `intensityOf(knobs)`, the intensity a village will have. `recipe.schema.json`,
  `village create --intensity <0-3>` and the workshop (a "Motion intensity" row, in English and French) take it.
- `ENGINE_VERSION` stays 1.0.0: a recipe without the knob gives the same file.

## Options ruled out

- **An override of `--motion-intensity`**: it already works, but the workshop does not show it, and the tool that
  writes the recipe has to know a token name.
- **More values for `motion`** (a calm one with intensity 1…): the two questions, how it moves and how much, multiply.

## Consequences

- `@rasengan-ui/villages` 0.2.0 and the CLI 0.4.0 carry it.
- A recipe with `intensity` is refused by an older engine ("Unknown field"): a village made with it needs 0.2.0 or the
  CLI 0.4.0 to be made again.
