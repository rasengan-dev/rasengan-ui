# Rasengan UI

React components on Base UI, styled with Tailwind CSS v4, copied into projects by a CLI and themed by **villages**
(whole design languages) crossed with **natures** (accent hues), switchable at runtime. pnpm monorepo: `registry/`
(components), `packages/{core,villages,motion,cli}`, `apps/{site,playground}`, `scripts/`. See the
[README](README.md) for commands.

## Before touching the code

- [docs/invariants.md](docs/invariants.md): the rules nothing may break. Read it in full.
- [docs/architecture.md](docs/architecture.md): the system as it is today.
- [docs/glossary.md](docs/glossary.md): the vocabulary. Use these words, in the code and in the docs.
- [docs/code-tour.md](docs/code-tour.md): how the code is organised, who calls whom.
- [docs/roadmap.md](docs/roadmap.md): where things stand, what is left, the open questions.

The why: the [RFCs](docs/rfc/README.md) (frozen once accepted) and the [ADRs](docs/adr/README.md).

## How to work

- **Propose before writing** anything that touches the architecture, the token contract, the registry format, the
  CLI or a new component family: a proposal, the maintainer's agreement, then the code. A large piece of work starts
  with an RFC (`docs/rfc/`); a choice that commits what comes next becomes an ADR (`docs/adr/`); a focused fix can be a
  plan (`docs/plans/`).
- **Never rewrite an accepted RFC, an ADR or a done plan**, except a typo or a link. A decision that changes is a new
  ADR, and the RFC gets `→ "<topic>" replaced by ADR-NNNN` under its status.
- **Update the living docs in the same commit as the code**: `architecture.md`, `code-tour.md`, `roadmap.md`,
  `glossary.md`, `invariants.md` (through an ADR). The "What to update when" table in [docs/README.md](docs/README.md)
  says which.
- Open questions live in [docs/roadmap.md](docs/roadmap.md), nowhere else.
- Docs, code, identifiers and comments in plain English.
- Commit messages: conventional commits (`feat(ui): …`, `fix(cli): …`), no `Co-Authored-By` trailer.

## Code

- Components: `registry/components/<name>/` with `<name>.base.tsx`, `<name>.styles.ts`, `meta.ts` (with a `category`
  from `registry/categories.ts`), demos; a page in `apps/site/src/app/_routes/components/<name>.page.mdx`. Contract
  names only, never raw colours, radii, shadows or durations; state through the `ui-*` variants;
  `variant` × `tone` × `size`.
- Motion: through `@/lib/motion` (`rasengan-motion`), tokens from the village (`useMotion`), end state unless
  `allows(n)`; Web Animations API for fades and travel, Motion's `m` only for springs, drag and exits.
- Base UI APIs (`render` props, no `asChild`), shadcn part names.
- New tokens go into both `contract.css` and `contract.ts`, with a default that leaves the other villages unchanged.
- `packages/`, `registry/` and `scripts/`: tabs, double quotes, about 150 columns. Never run `pnpm format`
  ([ADR-0002](docs/adr/0002-tabs-and-double-quotes-in-packages.md)). `apps/site`: the root Prettier config.
- Never edit v1 files: `archive/`, `apps/site/public/r/*.json` (top level), `apps/site/public/static/`
  ([ADR-0003](docs/adr/0003-v1-archived-old-urls-kept.md)).
- The MCP server (`packages/cli/src/mcp.ts`) never writes to stdout outside the protocol.

## Check before saying it is done

- `pnpm typecheck` and `pnpm test`; `pnpm contrast` after a token change.
- With the site running (`pnpm registry && pnpm dev`, port 3200): `pnpm axe`, and `pnpm screenshots [names]` for a
  visual change, in every village, light and dark.
- MDX pages do not compile in dev inside `.claude/worktrees/`: check them from the main checkout.
