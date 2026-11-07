# Rasengan UI

Components on [Base UI](https://base-ui.com), styled with Tailwind CSS v4 and copied into your project, themed by
**villages**: whole design languages (shape, type, density, depth, motion and palette) that you switch at runtime,
crossed with **natures**, the accent hues.

- 44 components, each in Konoha, Kiri, Iwa and Kusa, light and dark, and six natures
- A CLI that installs them and updates them without losing your edits
- An MCP server, so agents read and install them the right way
- A registry the shadcn CLI reads too

Docs and registry: [ui.rasengan.dev](https://ui.rasengan.dev)

## Quick start

In a React 19 project with Tailwind CSS v4 (Rasengan.js, Vite or Next.js):

```bash
npx rasengan-ui init
npx rasengan-ui add dialog
```

`init` asks for a village and a nature, writes `rasengan-ui.json`, installs the core and the village and adds the CSS
imports. See [Installation](https://ui.rasengan.dev/docs/installation) and the [CLI](https://ui.rasengan.dev/docs/cli).

With the shadcn CLI, add the registry once to `components.json`:

```json
{ "registries": { "@rasengan": "https://ui.rasengan.dev/r/base/{name}.json" } }
```

then `npx shadcn@latest add @rasengan/dialog`.

## Repository

| Path | What it holds |
| --- | --- |
| `apps/site` | The docs site; it serves the registry (`/r`) and its schemas (`/schema`) |
| `apps/playground` | A Rasengan.js app to try the CLI and the components on |
| `registry/components` | The components: sources, styles, demos and `meta.ts` |
| `packages/core` | What every component shares: `cn()`, `VillageScope`, the Field context, the engine variants |
| `packages/villages` | The token contract, the villages and the natures |
| `packages/motion` | Animation primitives for the blocks |
| `packages/cli` | The `rasengan-ui` CLI and its MCP server |
| `docs` | The project docs: architecture, invariants, glossary, roadmap, RFCs and ADRs ([start here](docs/README.md)) |
| `archive` | Rasengan UI v1 ("Classic"), kept for reference |

## Development

```bash
pnpm install
pnpm registry    # builds the registry into apps/site/public/r
pnpm dev         # the site, on http://localhost:3200
```

`pnpm typecheck`, `pnpm contrast`, `pnpm axe` and `pnpm screenshots` are the quality gate; see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
