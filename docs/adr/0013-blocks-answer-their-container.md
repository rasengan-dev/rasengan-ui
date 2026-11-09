# ADR-0013 — Blocks lay out by their container's width, and render without zod

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-08 |
| Replaces | — (settles RFC-0008's "Responsive" approach and 0008-Q1, zod's weight) |

## Context

Lot 0 of RFC-0008 had two things to settle before any block got written.

1. **Responsive layout.** A block can end up in a full-width page, a two-column layout, a docs preview frame or a
   CMS editor's side panel. Tailwind's `md:` and `lg:` variants read the window's width, so a block in a 400px column
   on a wide screen would get its desktop layout.
2. **zod's weight (0008-Q1).** Measured with esbuild, minified and gzipped: zod 3.25 is about 14 kB for even a
   minimal schema. With the field types and the helpers in one `lib/blocks.ts`, the pilot block (`cta-banner`) bundled
   to 15.8 kB, almost all of it zod, only because it imported `heading()`. zod's classes do not tree-shake.

## Decision

- **Blocks answer their container.** A block's `<section>` is `@container`, and its layout uses the container
  variants (`@md:`, `@2xl:`…), never `sm:`/`md:`/`lg:`. On the site, `BlockPreview` narrows a plain `div` to a phone's
  (375px), a tablet's (768px) or the page's width; there is no iframe.
- **Two lib files.** `rasengan-blocks` installs `lib/blocks.ts` (`BlockProps`, `heading`, `BlockMeta`, `formatMoney`,
  no runtime imports) and `lib/block-fields.ts` (the zod field types and `defineBlock`). A block's component, example
  and meta import only `@/lib/blocks` and types; only its `schema.ts` imports `@/lib/block-fields`.

## Options ruled out

- **Viewport breakpoints**, as shadcn's blocks use: a block in a sidebar or a preview frame lays out wrong, and the
  docs preview would need an iframe per block, with the village and scheme copied into each one.
- **An iframe preview with viewport breakpoints**: heavier, and it hides the problem instead of fixing it.
- **`/*#__PURE__*/` annotations on the field types**, so bundlers drop the unused ones: they depend on each bundler
  honouring them, and any field a block used at runtime would still pull the whole of zod.
- **Valibot or a lighter schema library**: the RFC chose zod 3.25 to match Rasengan.js and Jutsify, and the JSON
  Schema for agents comes from `zod-to-json-schema`.

## Consequences

- `cta-banner` weighs 0.8 kB gzip beyond the components it uses. The 15 kB of zod is paid only where a project
  parses content with a schema (content from a CMS, a file, an agent), once for every block.
- Container query variants need Tailwind v4 (built in). Every block's root carries `@container`; nested containers
  are allowed when a part of a block needs its own.
- The site loads the schemas on block pages, to render the content table; that is the docs, not a user's project.
