# rasengan-ui

The CLI of [Rasengan UI](https://ui.rasengan.dev): components on Base UI and Tailwind CSS v4, copied into your
project and themed by **villages** (whole design languages you switch at runtime) and **natures** (the accent hues).

It sets a project up, adds components, switches villages and natures, and updates installed files without losing your
edits. `rasengan-ui mcp` serves the same to agents.

## Quick start

In a React 19 project with Tailwind CSS v4 (Rasengan.js, Vite or Next.js):

```bash
npx rasengan-ui init
npx rasengan-ui add dialog
```

`init` asks for a village and a nature, writes `rasengan-ui.json`, installs the core and the village and adds the CSS
imports.

## Commands

| Command                                                  | What it does                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `init`                                                   | Set up a project: engine, village, nature, CSS imports       |
| `add <name...>`                                          | Install components or blocks                                 |
| `village <list\|set\|add\|create\|check\|export> [name]` | List, switch, install, make or check villages                |
| `nature <list\|set> [name]`                              | List or switch the nature                                    |
| `tint <list\|set> [name]`                                | Switch between the village's greys and neutral greys         |
| `diff [name...]`                                         | Show local and registry changes since install                |
| `update [name...]`                                       | Update installed files, keeping local edits (3-way merge)    |
| `doctor`                                                 | Check config, CSS imports, versions and dependencies         |
| `mcp`                                                    | Start the MCP server, for agents (stdio)                     |

`rasengan-ui <command> --help` lists a command's options.

## Docs

- [Installation](https://ui.rasengan.dev/docs/installation)
- [CLI](https://ui.rasengan.dev/docs/cli)
- [MCP server](https://ui.rasengan.dev/docs/mcp)
- [Villages](https://ui.rasengan.dev/docs/villages)

## License

MIT
