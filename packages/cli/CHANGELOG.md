# Changelog

## 0.4.0

- **`village create --intensity <0-3>`**: how much moves in the village, apart from `--motion` (ADR-0018). The
  workshop links carry it too.
- Bundles `@rasengan-ui/villages` 0.2.0.

## 0.3.0

- **`rasengan-ui mcp --http`**: the MCP server over Streamable HTTP at `/mcp`, for an agent that reaches the project
  through a port (a container, a remote sandbox). No sessions: each request stands alone and gets a JSON answer.
  `--port` (default 7330) and `--host` (default `127.0.0.1`).
- A registry file of type `registry:component` with a `target` lands under the components alias, its imports
  rewritten (the `rasengan-workshop` item).
- The village engine computes `calc()` without `Function()` (bundled from `@rasengan-ui/villages` 0.1.1).
- Built with tsup. Publishing refuses anything but `pnpm publish`.

## 0.2.1, 0.2.2

- **Fixed:** `init --aliases` exports each `.tsx` file of a workspace package's `lib/`. 0.2.2 republishes 0.2.1.

## 0.2.0

- **`init --aliases <prefix>`**, for components in a package of a workspace.
- **Blocks**: page sections installed into the blocks alias; `list_components` with `kind: "block"`, their content
  schema and example from `get_component`.
- The Kusa village; motion components by category.
- **Fixed:** a merge no longer loses registry changes or files deleted since install.

## 0.1.1

- **Fixed:** a registry URL that sends a web page instead of JSON says so.

## 0.1.0

- First release on npm: `init`, `add` with a lockfile, `village`, `nature` and `tint`, `diff` and `update` with a
  three-way merge, `doctor`, `village create/check/export`, and the MCP server over stdio.
