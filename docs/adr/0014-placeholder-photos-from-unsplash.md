# ADR-0014 — The placeholder photos of people come from Unsplash, under the Unsplash License

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-08 |
| Replaces | RFC-0009, decision 4 ("Placeholder people and logos"), for the photos' licence |

## Context

RFC-0009 decided that the blocks' placeholder people are open-licence photos, "only licences that allow redistribution
in the registry (CC0 or equivalent)". In lot D0, eight CC0 portraits were picked on StockSnap, but its CDN refuses
scripted downloads, and its choice of portraits is thin. The maintainer chose Unsplash instead, which has far more
portraits, in particular of the people Jutsify's first storefronts serve (Douala).

The Unsplash License is not CC0: it allows copying, modifying and distributing, commercially or not, without asking or
crediting, but not selling the photos unchanged, nor gathering them to build a similar or competing photo service.
Unsplash+ photos are under a different, paid licence.

## Decision

- The placeholder photos of people are Unsplash photos under the Unsplash License, never Unsplash+.
- They ship in `registry/placeholders/` as `person-*.svg`: each photo cropped to 600 × 750, compressed as WebP and
  embedded in base64 in an SVG (11 files, about 550 kB in all). A registry item carries its files as text, and a
  binary file arrives corrupted; an SVG wrapper is text and shows in an `<img>` like the photo. `pnpm registry`
  refuses any placeholder that is not SVG or Markdown. Installed by `rasengan-placeholders` like the other
  placeholders; nothing loads from Unsplash at runtime.
- `registry/placeholders/CREDITS.md` names each photo's photographer, source and licence, and travels with the files
  into projects.
- The rest of RFC-0009's decision 4 stands: logos are drawn marks with invented names.

## Options ruled out

- **CC0 photos only** (StockSnap, the RFC's wording): no scripted download, and too few usable portraits.
- **Loading the photos from Unsplash's CDN** in the examples: remote content in a block, which RFC-0008 rules out, and
  examples that break offline.
- **Illustrated people**: set aside by RFC-0009's decision 4.
- **WebP or JPEG files in the registry**: the shadcn registry format has no binary files; the CLI and the shadcn CLI
  would write a corrupted image.
- **The CLI downloading photos from the site** instead of the registry: a change to the CLI, and projects installing
  with the shadcn CLI would get none.

## Consequences

- The registry redistributes a handful of Unsplash photos as examples, which the licence allows; it must never become
  a collection of them. Placeholders stay few, and each is replaced by the project's own photos.
- Adding a photo means checking it is not Unsplash+, and adding its line to `CREDITS.md`.
- `rasengan-placeholders` grows by about 550 kB (base64 costs a third more than the WebP); a block whose example
  shows a person depends on it, as before. A project swaps a placeholder for its own photo in any format.

## Revisit when

Unsplash changes its licence, or a project needs placeholders it can sell as part of a template.
