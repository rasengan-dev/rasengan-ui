# RFC-0003: Rasengan UI MCP server — the registry, for agents

- Status: Draft (rollout steps 1 to 3 on `feat/ui-next`)
- Author: Dilane Kombou
- Created: 2026-10-31
- Builds on: RFC-0002 (registry, CLI, `rasengan-ui.json`, lockfile)
- Package(s): `packages/cli` (new `mcp` command), `scripts/registry.mjs` (examples in the registry), `apps/site` (docs)

## Summary

`rasengan-ui mcp` starts a [Model Context Protocol](https://modelcontextprotocol.io) server over stdio. An agent
(Claude Code, Claude Desktop, Cursor, VS Code…) that runs it can list the components, read their source and their
examples, see how the project is set up (village, nature, installed components, local edits) and install components,
with the same rules as `rasengan-ui add`.

The server lives in the CLI: one npm package, the same registry client, the same config, the same lockfile. It adds no
format: what it serves is the shadcn-compatible registry of RFC-0002, plus the examples, which become registry items.

```bash title="Terminal"
claude mcp add rasengan-ui -- npx rasengan-ui mcp
```

## Motivation

- **Agents write most new UI code now**, and they write it from what they remember. For Rasengan UI they remember
  nothing: the components are new, the APIs follow Base UI (`render` props, not `asChild`), and the village contract
  forbids the hard-coded colours, radii and shadows an agent reaches for first. Without the source in context, the
  agent writes shadcn-on-Radix code that does not compile, or code that compiles and ignores the village.
- **The registry already has the answers.** Every item's source, dependencies and description are published as JSON,
  and the CLI already reads them. An MCP server is the shortest way to put them in front of the model, at the moment it
  needs them.
- **The examples are the missing piece.** The `*.demo.tsx` files show how each component is meant to be composed, but
  only the site bundles them. An agent needs them more than the source.
- **Installing through the CLI keeps the guarantees.** An agent that copies a component by hand skips the lockfile, the
  alias rewrite and the npm dependencies. Through the server it gets them, and a file the user edited is kept, as with
  `rasengan-ui add`.

## Goals

- One command to add the server to a client, no install step beyond `npx`.
- Read tools work in any folder, set up or not: an agent can explore Rasengan UI before `init`.
- In a set-up project, sources come back as the project would get them: its aliases, its file paths.
- `add_components` never overwrites a file the user edited unless asked, and never writes to stdout (the protocol's
  channel).
- The examples are published in the registry, shadcn-compatible, so `npx shadcn add @rasengan/dialog-demo` works too.

## Non-goals

- A hosted server in this RFC (see Rollout: it comes after, read-only).
- Changing the project's look (`village`, `nature`, `tint`) from the agent. It changes every page; it stays a user
  command for now (Open questions).
- `diff` and `update` from the agent. A 3-way merge can leave conflict markers that a person should resolve.
- Resources and prompts. Tools are what every client supports; resources and prompts can be added without breaking
  anything.
- A second registry format, or a cache of the registry.

## Decisions

| Topic | Decision |
|---|---|
| Where | `rasengan-ui mcp`, a command of the existing CLI, not a separate package |
| Transport | stdio. Streamable HTTP later, for a hosted read-only server |
| SDK | `@modelcontextprotocol/sdk` 1.x (`McpServer`, `registerTool`) with `zod` schemas |
| Project | The working directory the client starts the server in, or `--cwd`; found as the CLI finds it (nearest `package.json`) |
| Without `rasengan-ui.json` | Read tools use the default registry and the `base` engine; `add_components` asks for `init` |
| Registry | The project's (`rasengan-ui.json`), else `--registry`, else `RASENGAN_UI_REGISTRY`, else the public one |
| Examples | Each `<name>.demo.tsx` becomes a `registry:example` item `<name>-demo`; the component lists them in `meta.examples` |
| Output | Plain text (Markdown) in each tool result: every client shows it, every model reads it |
| Logging | Never stdout; npm install output goes to stderr |
| Instructions | The server sends instructions on `initialize`: look components up before writing UI, use village tokens |

## Detailed design

### Tools

| Tool | Input | Returns | Writes |
|---|---|---|---|
| `list_components` | `query?`, `kind?` (`component` \| `village` \| `example` \| `all`, default `component`) | Name, title, description and status of each item, filtered by words in the query | No |
| `get_component` | `name` | Each file with its path in the project and its source, npm and registry dependencies, its examples, the docs URL, the `add` command | No |
| `get_examples` | `name` (a component) | The source of each of its examples | No |
| `get_project` | — | Engine, village, nature, tint, registry; installed items and the files edited since install; the villages, natures and tints the registry offers | No |
| `add_components` | `names`, `overwrite?`, `dryRun?`, `skipInstall?` | Each file with what happened to it (created, updated, unchanged, kept), the npm packages installed or to install | Yes |

`add_components` is `writeItems` and `installPackages`, the code of `rasengan-ui add`. Its annotations tell the client
it writes (`readOnlyHint: false`) but is not destructive (`destructiveHint: false`): an edited file is kept unless
`overwrite` is set, and every write is recorded in the lockfile and in `.rasengan-ui/base/`, so `diff` shows it.

`list_components` searches the index only, a few kilobytes; `get_component` and `get_examples` load one item each.
`get_component` lists a component's examples by name, so an agent asks for them only when it needs them.

### Instructions

Sent once, on `initialize`. They say what the tools are for and the three rules an agent most often breaks:

1. Look a component up (`get_component`, `get_examples`) before writing code that uses it; the APIs are Base UI's
   (`render` props), not Radix's (`asChild`).
2. Style with the token contract's Tailwind names (`bg-primary`, `text-muted-foreground`, `rounded-lg`, `shadow-md`,
   `font-display`…) and the components' variants, never with raw colours, radii or shadows: they would not follow a
   village or nature switch.
3. Install with `add_components`, not by copying source, so aliases, dependencies and the lockfile stay right.

### Examples in the registry

`scripts/registry.mjs` publishes every `registry/components/<name>/<demo>.demo.tsx` as:

```json
{
  "name": "dialog-demo",
  "type": "registry:example",
  "title": "Dialog example",
  "registryDependencies": [".../r/base/dialog.json", ".../r/base/button.json", ".../r/base/field.json", ".../r/base/input.json"],
  "files": [{ "path": "registry/components/dialog/dialog.demo.tsx", "type": "registry:example" }]
}
```

Its `registryDependencies` are the components it imports from `@/components/ui/…`. The component item gets
`"meta": { "examples": ["dialog-demo", "dialog-sizes-demo"] }`. The CLI installs `registry:example` files in
`<components alias>/examples/`, as the shadcn CLI does, so `rasengan-ui add dialog-demo` works as well.

### Code

| File | What it holds |
|---|---|
| `packages/cli/src/mcp.ts` | The server: instructions, the five tools, their text output |
| `packages/cli/src/commands/mcp.ts` | `rasengan-ui mcp [--cwd] [--registry]`: builds the server, connects it to stdio |
| `packages/cli/src/dependencies.ts` | `installPackages` can send its output to stderr |
| `packages/cli/src/install.ts` | `registry:example` files go to `<components>/examples/` |

### Client set-up

```bash title="Terminal"
claude mcp add rasengan-ui -- npx rasengan-ui mcp
```

Or, committed for the team, `.mcp.json` at the project root:

```json
{ "mcpServers": { "rasengan-ui": { "command": "npx", "args": ["-y", "rasengan-ui", "mcp"] } } }
```

## Rollout

1. **Registry**: examples as `registry:example` items, `meta.examples` on components.
2. **CLI**: `rasengan-ui mcp` with the five tools and the instructions; `installPackages` to stderr; examples
   installable. Checked with a scripted MCP client on `apps/playground` and on a folder without `rasengan-ui.json`.
3. **Docs**: an MCP page on the site (set-up per client, the tools), linked from the CLI page.
4. **Then**: `rasengan-ui mcp init --client <claude|cursor|vscode>` writes the client's config; a hosted read-only
   server (Streamable HTTP) on the site, for clients that cannot run `npx`; the docs prose of each component in the
   registry, so `get_component` returns it with the source.

The CLI is not published on npm yet (`"private": true`). Until it is, the server runs from the repository:
`node packages/cli/src/index.ts mcp`.

## Alternatives considered

- **A separate `@rasengan-ui/mcp` package.** Rejected: it would duplicate the registry client, the config and the
  install code, or depend on the CLI anyway, and users would have two packages to keep in step.
- **The shadcn MCP server** (`shadcn mcp`) pointed at the `@rasengan` namespace. It lists and installs items, but knows
  nothing of villages, natures, the lockfile or local edits, and installs with shadcn's rules, not ours. Users can still
  use it: the registry stays compatible.
- **Resources instead of tools** (`rasengan://components/dialog`). Cleaner for read-only data, but many clients only let
  the user attach resources, not the model fetch them. Tools work everywhere; resources can come later.
- **One `search` tool returning everything.** Fewer round trips, but it would put every component's source in context
  for a question about one.
- **Examples inside the component item.** The CLI and shadcn would install them with the component. Separate items are
  installed only on request.

## Open questions

1. Should the agent be able to switch the village, nature or tint (`set_look`)? It is one attribute on `<html>` and one
   line in `rasengan-ui.json`, easy to undo, but it changes every page at once.
2. Should `add_components` ask the client for confirmation itself (MCP elicitation), or rely on the client's own
   permission prompt, as today?
3. The hosted server: on `ui.rasengan.dev/mcp`, read-only, or also able to return a ready-to-paste `add` command
   per project?
4. Should the component docs (the MDX pages: anatomy, props, accessibility notes) be published in the registry for
   `get_component`, or linked only?
