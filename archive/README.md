# Archive

Rasengan UI v1 ("Classic"), kept for reference. Nothing here is part of the pnpm workspace: it is not installed, built,
type-checked or deployed. The code that replaced it is in `apps/site`, `registry/`, `packages/` and `docs/rfc/`
(RFC-0002, "Switch-over").

| Folder | What it was |
| --- | --- |
| `ui/` | The v1 kit (`@rasengan-ui/kit`): the blocks, their preview pages and the v1 registry build (`registry.json`, `public/r`) |
| `docs/` | The v1 documentation site (`@rasengan-ui/docs`) |
| `data/` | `@rasengan-ui/data-ui`, the meta model of the Futon website builder, used only by the two apps above |
| `README.v1.md`, `CONTRIBUTING.v1.md` | The repository's README and contributing guide for v1 |
| `docs/react-syntax-highlighter@16.1.0.patch` | The pnpm patch the v1 docs applied to `react-syntax-highlighter` |

## v1 stays published

Projects that installed v1 blocks still depend on two things, and `apps/site` keeps serving both at the same paths:

- the v1 registry items, `/r/<name>.json` (copied unchanged to `apps/site/public/r/`);
- the images the blocks load at runtime, `/static/…` (copied unchanged to `apps/site/public/static/`).

The site is served on `ui.rasengan.dev`. Pointing `registry.rasengan.dev` at the same deployment keeps every v1 install
working without touching it.

## Running an archived app

They are frozen as they were when archived (2026-10-31). To run one, check out the parent of the commit that archived
them (the first commit below), where they still live in `apps/` and `packages/` and install with the workspace:

```bash
git log --oneline --diff-filter=A -- archive/README.md
```
