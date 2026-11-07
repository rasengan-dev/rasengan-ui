# Roadmap

> **Living document**: where the project stands, what is left to build, what is left to decide. It is **the only list
> of open questions**: RFCs point here. A settled question is removed from here and becomes an [ADR](adr/README.md).
>
> Last updated: 2026-11-07.

## Where things stand

| Piece | State |
|---|---|
| Components | 44, on Base UI, in `registry/components` ([RFC-0002](rfc/0002-villages.md), [0004](rfc/0004-v1-components.md), [0005](rfc/0005-dates-and-times.md)) |
| Variants | `variant` × `tone` × `size` on most components ([plan 002](plans/002-component-variants.md)) |
| Villages | Konoha, Kiri, Iwa committed; **Kusa built but not committed** (contract lip, [ADR-0008](adr/0008-lip-in-the-token-contract.md)) |
| Natures | Six, with Onmyōton; neutral tint |
| Village engine, workshop, `village create/check/export` | Built ([RFC-0006](rfc/0006-custom-villages.md), steps 1 to 4) |
| CLI | `rasengan-ui` 0.1.1 on npm |
| MCP server | `rasengan-ui mcp`, five tools ([RFC-0003](rfc/0003-mcp-server.md), steps 1 to 3) |
| Site | Live at `rasengan-ui.hiraiship.app`, prerendered, with Tag Manager ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)) |
| Project docs | `docs/` in this format since 2026-11-07 ([ADR-0001](adr/0001-project-docs-like-jutsify.md)) |
| Blocks | None in v2 (`registry/blocks` empty) |
| `packages/motion` | Primitives exist, used by nothing |

## What is left to build

### Next

- **Commit Kusa**: the village, the lip in the contract, the touched components (button, badge, kbd, switch, tabs,
  fields, checkbox, radio, slider). Before: rerun `pnpm axe`; update the component pages that still name three
  villages; add Kusa's fonts to `/docs/installation`.
- **Motion components** (RFC-0007, to write): text reveal, typewriter, scramble text, rolling numbers, marquee,
  carousel, cursor, 3D gallery, page transitions, built clean-room on `motion` and the village motion tokens. Lot 0
  wires `packages/motion` into the registry as the `rasengan-motion` item and reads its tokens from the village.

### Then

- RFC-0006 step 5: the MCP tool `create_village`.
- Blocks rebuilt on the components (RFC-0002, "Blocks"), with the RFC-0001 content contract.
- A Radix engine (`/r/radix/…`).
- Figma: village and nature modes (needs a paid plan; the free-plan file has Theme + Primitives and four components).
- RFC-0003, later: `mcp init --client`, a hosted read-only MCP server.
- RFC-0004, later list: Sidebar, Input OTP, Hover Card, Context Menu, Item, Carousel (folded into the motion RFC),
  Number Field.

### Release and operations

- Attach the custom domains `ui.rasengan.dev` and `registry.rasengan.dev` to the Hiraiship project
  ([ADR-0004](adr/0004-own-registry-schemas-on-ui-rasengan-dev.md)).
- CI: install, typecheck, test, contrast, build on every pull request (there is none: `.github` holds only templates).
- Re-accept the screenshot baseline (it is stale: diffs appear without any change).
- Drop `patches/rasengan@2.0.0.patch` once Rasengan.js fixes `useId` upstream ([plan 001](plans/001-rasengan-useid-hydration.md)).
- Move to pnpm 10 or later (v9 lockfile), then drop the `.npmrc` `node-version` line.
- Delete the empty `packages/directions`.
- Site performance: a 2.3 MB shared chunk on every page; Google Fonts loaded from Google.

## Open questions

Numbered by origin, so an ADR can say which one it settles.

### Villages and the contract (RFC-0002, RFC-0006)

- **0002-Q2 · Fonts**: open-licence faces only, self-hosted by the CLI or loaded from a CDN? Does a custom village
  allow any font name, with a warning (0006-Q2)?
- **0002-Q3 · Project creation**: should the CLI create a project (`rasengan-ui create`, Rasengan.js template with a
  village), or only set up existing ones?
- **0002-Q5 · Focus halos**: Konoha's and Kiri's soft halos are 1.7 to 2.7:1, under WCAG's 3:1. Add a solid inner
  ring, raise the opacity, or accept it as a village trait? Should the workshop offer a `strict` switch meanwhile
  (0006-Q4)?
- **0002-Q6 · Text field borders**: `--input` is about 1.3 to 1.6:1 in Konoha and Kiri, as in shadcn. Raise it, or
  keep it as a village trait?
- **0006-Q1 · Natures for custom villages**: must a custom village pass with all natures, or only its own?
- **0006-Q3 · Where the recipe lives**: `rasengan-ui.json` or next to the CSS (`acme.recipe.json`)?
- **0006-Q5 · Naming**: "found a village" (`village create`), or another command name?
- **0006-Q6 · Glass surfaces**: is `traits.surfaces: "glass"` safe without checking what sits behind?
- **0002-Q4 · `packages/data`**: archived with v1; does it move to the Futon project?

### MCP server (RFC-0003)

- **0003-Q1**: may the agent switch village, nature or tint (`set_look`)?
- **0003-Q2**: should `add_components` ask for confirmation itself (MCP elicitation)?
- **0003-Q3**: a hosted server on `ui.rasengan.dev/mcp`: read-only, or also returning an `add` command per project?
- **0003-Q4**: publish component docs (anatomy, props, accessibility) in the registry for `get_component`, or link them?

### Components (RFC-0004, RFC-0005)

- **0004-Q1**: a `loading` prop on Button, or composition as in shadcn?
- **0004-Q2**: a `drawer` item re-exporting Sheet with `side="bottom"`, for shadcn's `Drawer` imports?
- **0004-Q3**: Command: accept children without `items`, filtering them like cmdk?
- **0004-Q4**: Table: may a village (Iwa) default to `striped` through a token?
- **0004-Q5**: Navigation Menu below `md`: leave it to blocks, or ship `NavigationMenuMobile` in a Sheet?
- **0004-Q6**: the site's mobile menu: keep the Popover, or move to a left Sheet?
- **0005-Q1**: Persian, Hijri and other calendars: a `calendar` prop or separate items?
- **0005-Q2**: a segmented time field for designs that cannot use the native input?
