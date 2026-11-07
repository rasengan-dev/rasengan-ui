# ADR-0006 — The site's MDX follows Hiraiship's `apps/docs` conventions

| | |
|---|---|
| Status | Accepted |
| Date | 2026-10-29 |
| Replaces | — |

## Context

The component and docs pages of `apps/site` are MDX (`@rasenganjs/mdx`). The package's own `CodeBlock` ships no CSS, and
the maintainer's other Rasengan.js sites (Hiraiship's docs, Sharingan) had already settled how MDX pages are built.

## Decision

Follow Hiraiship's `apps/docs`:
- `mdx({ code: { theme: { light, dark }, keepBackground: false } })` in `rasengan.config.js`, with
  `github-light-default` and `vesper` (Hiraiship's `light-plus` falls under 4.5:1 on Iwa's card);
- MDX components built with a `styled(Tag, classes)` helper and `cn`;
- code through `components/mdx/code-block.tsx` (figure, title with a language icon, pre with its own copy button,
  inline code), never the package's `CodeBlock`; fences titled with ```` ```lang title="…" showLineNumbers ````;
- `components/mdx/toc.tsx` (sticky aside), and `<Note>` / `<Steps>` usable without an import;
- every component page has the same skeleton: preview, installation (CLI and shadcn), usage, villages grid,
  accessibility, API.

Demo sources come from the files themselves through the `?source` Vite plugin, highlighted at build time.

## Options ruled out

- **The package's `CodeBlock`**: unstyled, and a different look from the other sites.

## Consequences

- Page chrome uses contract tokens, so the docs wear the village chosen in the header.
- MDX pages fail in dev inside a worktree under `.claude/worktrees/` (`@rasenganjs/mdx` filters with
  `**/*.md?(x)`, which skips dot folders): check them from the main checkout.
