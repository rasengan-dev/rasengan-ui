# Contributing to Rasengan UI

Thanks for helping. This guide covers the setup, where things live, and what a change needs before it is merged.

## Setup

Node 20.18 or later and pnpm.

```bash
pnpm install
pnpm registry    # builds the registry the site and the CLI read
pnpm dev         # the site, on http://localhost:3200
```

## Project docs

The project docs live in [`docs/`](docs/README.md): how the system is built today ([architecture](docs/architecture.md),
[code tour](docs/code-tour.md)), the rules nothing may break ([invariants](docs/invariants.md)), the
[glossary](docs/glossary.md), and where things stand ([roadmap](docs/roadmap.md), the only list of open questions). A
pull request that makes one of them wrong updates it in the same commit; [docs/README.md](docs/README.md) says which.

## Significant changes start as an RFC

A new component family, a new village, a change to the token contract, the CLI or the registry format: write an RFC in
[`docs/rfc/`](docs/rfc/README.md) first, settle it, then build it. A decision that commits what comes next is recorded
as an [ADR](docs/adr/README.md). Smaller fixes go straight to a pull request, or start as a [plan](docs/plans/README.md).

## Adding or changing a component

Each component is a folder in `registry/components/<name>/`:

| File | What it holds |
| --- | --- |
| `<name>.base.tsx` | The component on Base UI, with shadcn's part names |
| `<name>.styles.ts` | Its classes (`cva`), inlined into one file per component by `pnpm registry` |
| `meta.ts` | Name, title, description, status, category (`registry/categories.ts`), npm and registry dependencies |
| `<name>.demo.tsx` | The main demo; `<name>-<topic>.demo.tsx` for variants, sizes or tones |

Then a page in `apps/site/src/app/_routes/components/<name>.page.mdx`. Components use only the token contract's Tailwind
names and the `ui-*` variants, never raw colours, radii or shadows, so they follow every village.

## Adding a block

Each block is a folder in `registry/blocks/<name>/` ([RFC-0008](docs/rfc/0008-blocks.md)), named
`<category>-<layout>`:

| File | What it holds |
| --- | --- |
| `<name>.base.tsx` | The block, `PascalName({ content = example, id, className, headingLevel }: BlockProps<Content>)`, composed of registry components |
| `schema.ts` | `export const schema`, in zod, from the field types in `@/lib/block-fields`, with limits and `.describe()` guidance |
| `example.ts` | `export const example`: content that parses, in English, with the registry's placeholder images |
| `meta.ts` | Family and category (`registry/block-categories.ts`), summary, `useWhen`, layout, content, components; `import type` only |
| `<name>.demo.tsx` | The docs preview |

Then a page in `apps/site/src/app/_routes/blocks/<name>.page.mdx`. A block's root is a `<section>` with `@container`,
named by its heading; it lays out with container variants (`@md:`), never `md:`
([ADR-0013](docs/adr/0013-blocks-answer-their-container.md)); its component never imports `@/lib/block-fields`, so it
loads no zod. `pnpm registry` refuses a block whose example does not parse or that weighs over its budget (6 kB gzip,
12 kB for showcase and bento).

## Quality gate

Run these with the site up (`pnpm dev`):

```bash
pnpm typecheck
pnpm test           # contract, motion, blocks (every block rendered on the server), CLI
pnpm contrast       # every token pair against WCAG
pnpm axe            # WCAG 2.2 AA on every page, village and scheme, overlays open
pnpm screenshots    # every component × village × scheme × nature, compared with your local baseline
```

A component is done when it renders right in every village, light and dark, works with the keyboard and a screen
reader, and these pass.

## Code style

`packages/`, `registry/` and `scripts/` use tabs, double quotes and lines up to about 150 columns; `apps/site` follows
the root Prettier config. Match the file you are in, and don't run `pnpm format` over the repository
([ADR-0002](docs/adr/0002-tabs-and-double-quotes-in-packages.md)).

## Commits and pull requests

Conventional commits (`feat(ui): …`, `fix(cli): …`). One topic per pull request, with what changed and how you checked it.

By contributing you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
