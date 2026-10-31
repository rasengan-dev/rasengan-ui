# Contributing to Rasengan UI

Thanks for helping. This guide covers the setup, where things live, and what a change needs before it is merged.

## Setup

Node 20.18 or later and pnpm.

```bash
pnpm install
pnpm registry    # builds the registry the site and the CLI read
pnpm dev         # the site, on http://localhost:3200
```

## Significant changes start as an RFC

A new component family, a new village, a change to the token contract, the CLI or the registry format: write an RFC in
[`proposals/`](proposals/README.md) first, settle it, then build it. Smaller fixes go straight to a pull request.

## Adding or changing a component

Each component is a folder in `registry/components/<name>/`:

| File | What it holds |
| --- | --- |
| `<name>.base.tsx` | The component on Base UI, with shadcn's part names |
| `<name>.styles.ts` | Its classes (`cva`), inlined into one file per component by `pnpm registry` |
| `meta.ts` | Name, title, description, status, npm and registry dependencies |
| `<name>.demo.tsx` | The main demo; `<name>-<topic>.demo.tsx` for variants, sizes or tones |

Then a page in `apps/site/src/app/_routes/components/<name>.page.mdx`. Components use only the token contract's Tailwind
names and the `ui-*` variants, never raw colours, radii or shadows, so they follow every village.

## Quality gate

Run these with the site up (`pnpm dev`):

```bash
pnpm typecheck
pnpm contrast       # every token pair against WCAG
pnpm axe            # WCAG 2.2 AA on every page, village and scheme, overlays open
pnpm screenshots    # every component × village × scheme × nature, compared with your local baseline
```

A component is done when it renders right in Konoha, Kiri and Iwa, light and dark, works with the keyboard and a screen
reader, and these pass.

## Commits and pull requests

Conventional commits (`feat(ui): …`, `fix(cli): …`). One topic per pull request, with what changed and how you checked it.

By contributing you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
