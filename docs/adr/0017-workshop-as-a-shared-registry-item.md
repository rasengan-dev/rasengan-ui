# ADR-0017 — The village workshop's parts are a shared registry item, `rasengan-workshop`, in English and French

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-13 |
| Replaces | — (extends RFC-0006, "The workshop", which put all of it in `apps/site`; extends ADR-0016 with one export) |

## Context

The workshop lived in `apps/site`: a recipe panel, a contrast report, a status pill, a hook that runs the engine in a
web worker. Jutsify wants the same workshop in its own dashboard, so that its users tune a village exactly as on
`ui.rasengan.dev`. A second panel written there would have to follow every new knob of the engine by hand.

Three things stood in the way:

- **A block cannot hold it.** A `registry:block` has a family (marketing or storefront), a zod content schema, an
  example and a weight budget (RFC-0008). The workshop is a tool, with state and a worker, not a section of content.
- **A component cannot either**: the pipeline writes one file per component, and a worker is a file of its own.
- **The worker imported `contract.css?raw`**, which only Vite understands.

The words were in English, in the code. Jutsify is in French and English.

## Decision

- **A new package, `packages/workshop`, is the source of a shared registry item, `rasengan-workshop`**, as
  `packages/motion` is for `rasengan-motion`. It holds `RecipePanel`, `Report`, `VillageStatus`, `useVillage`, the
  engine worker and the labels. The site's page keeps what is its own: the preview, the export dialog, the link.
- **Its files install into `components/workshop/`.** They are `registry:component` files with a target under
  `components/`; the CLI puts them under the project's components alias and rewrites their imports. The registry
  schema already names this file type.
- **`@rasengan-ui/villages` exports `./sources`**: `contract.css` and `natures.css`, read and parsed, ready for
  `createVillage`. The worker imports it, so the item works with any bundler. In the workspace the two files come in
  through Vite's `?raw`; the published build inlines them.
- **Every word is in `labels.ts`**, as two dictionaries, `en` (the default) and `fr`. The three components take a
  `labels` prop; a project passes its own for another language.
- **`RecipePanel` takes `showName`**: `false` hides the name field, for a host that names the village itself.

## Options ruled out

- **A third block family, "tools"**: the workshop would sit in the blocks gallery, but the block contract (content
  schema, example, weight budget, server render with all its content) would need exceptions for one item.
- **A component with several files**: a change to the component pipeline for one case.
- **Files flat in `lib/`**, as `registry:lib` items install today: no change to the CLI, but React components in
  `lib/`, under names that must carry a prefix.
- **An npm package for the React parts**: they are built from registry components, which projects own as copies. A
  package would ship a second copy of Button, Popover and Slider, in a village the project cannot restyle.
- **An iframe on `ui.rasengan.dev`**: nothing to share, but the host depends on the site and on its engine version.
- **Keeping `?raw`**: enough for Vite and Rasengan.js, closed to every other bundler.

## Consequences

- **`rasengan-workshop` is a registry URL, so public API** (invariant 12): its file names and the props of its
  components change with care.
- **It needs `@rasengan-ui/villages` on npm** (ADR-0016): `rasengan-ui add rasengan-workshop` installs it. Until the
  package is published, the item installs only with `--skip-install`.
- **A CLI older than this change cannot place the files**: it has no rule for a `registry:component` file with a
  target and writes it at the root. The item needs the next release of `rasengan-ui`.
- **What the engine says stays in English**: a recipe's error, its notes, a reason the labels do not list. Translating
  them means the engine returning codes instead of sentences.
- **Two dictionaries to keep whole.** TypeScript refuses a missing key; `packages/workshop/test` renders the panel and
  the report in both.
- **The site lets Tailwind see the package** (`@source` in its stylesheet). A project that installs the item has the
  files inside its own sources, where Tailwind already looks.
- The MCP server does not list the item yet: `list_components` knows components, blocks, villages and examples.

## Revisit when

A second tool joins the workshop in the registry: a family of tools, with its own contract, may then be worth an RFC.
