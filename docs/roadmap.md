# Roadmap

> **Living document**: where the project stands, what is left to build, what is left to decide. It is **the only list
> of open questions**: RFCs point here. A settled question is removed from here and becomes an [ADR](adr/README.md).
>
> Last updated: 2026-11-08 (RFC-0008 lot A).

## Where things stand

| Piece | State |
|---|---|
| Components | 53, on Base UI, in `registry/components` ([RFC-0002](rfc/0002-villages.md), [0004](rfc/0004-v1-components.md), [0005](rfc/0005-dates-and-times.md), [0007](rfc/0007-motion-components.md)) |
| Motion components | RFC-0007 complete: text-reveal, typewriter, scramble-text, number-roll, marquee, cursor, gallery-3d, page-transition; carousel (display); Button's `HoldButton` and `ButtonRollingText` ([ADR-0011](adr/0011-carousel-and-cursor-without-motion.md), [ADR-0012](adr/0012-gallery-and-page-transition-without-motion.md)); none loads Motion |
| Variants | `variant` × `tone` × `size` on most components ([plan 002](plans/002-component-variants.md)) |
| Villages | Konoha, Kiri, Iwa, Kusa (the contract's lip, [ADR-0008](adr/0008-lip-in-the-token-contract.md)) |
| Natures | Six, with Onmyōton; neutral tint |
| Village engine, workshop, `village create/check/export` | Built ([RFC-0006](rfc/0006-custom-villages.md), steps 1 to 4) |
| CLI | `rasengan-ui` 0.1.1 on npm |
| MCP server | `rasengan-ui mcp`, five tools ([RFC-0003](rfc/0003-mcp-server.md), steps 1 to 3) |
| Site | Live at `rasengan-ui.hiraiship.app`, prerendered, with Tag Manager ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)) |
| Project docs | `docs/` in this format since 2026-11-07 ([ADR-0001](adr/0001-project-docs-like-jutsify.md)) |
| Blocks | 10 marketing blocks (RFC-0008 lots 0 and A): navbar-simple, hero-centered, logos-marquee, features-grid, stats-numbers, testimonials-carousel, pricing-plans, faq-accordion, cta-banner, footer-columns; the example landing page at `/examples/landing`; `rasengan-blocks`, `rasengan-placeholders`, `blocks.json`, MCP `kind: "block"` ([ADR-0013](adr/0013-blocks-answer-their-container.md)) |
| `packages/motion` | `rasengan-motion` in the registry: motion modes, village motion tokens, primitives, `splitText` ([RFC-0007](rfc/0007-motion-components.md) lot 0) |
| Categories | Every component has one; the site groups by them and has a Motion section ([ADR-0009](adr/0009-component-categories.md)) |

## What is left to build

### Next

- **Finish Kusa**: say what Kusa does in the component pages' prose (they describe Konoha, Kiri and Iwa only); its
  focus halos are 2.3 to 2.4:1 on the background in dark mode (see 0002-Q5). `pnpm axe` now runs with Kusa: the site's
  prose links used `text-primary` (4.3:1 in Kusa light) and now use the primary's words (`tone-primary text-tone-text`).
- **Motion components** ([RFC-0007](rfc/0007-motion-components.md)): all four lots built.
- **Blocks** ([RFC-0008](rfc/0008-blocks.md), accepted): lots 0 and A built. Left from lot 0: installing a block in
  Jutsify's sandbox registry copy (they install in the playground). Next, lot B (a storefront, for Jutsify: its
  placeholder photos join `registry/placeholders/`), then RFC-0009's lots D0 and D, then lot C (showcase blocks).
- **Blocks, second wave** ([RFC-0009](rfc/0009-blocks-second-wave.md), accepted): new categories (`team`, `booking`,
  `offers`, `comparison`, `integrations`), lot D (ten storefront blocks: booking, menu cards, price list, staff,
  reviews…) and lot E (ten marketing blocks: split and wordmark heroes, comparison, integrations, contact form…), from
  a survey of what designers publish. Its seven questions were settled before acceptance (its "Decisions"). Order:
  lots D0 and D, then RFC-0008's lot C, then lot E. Next, lot D0 (categories, field types, `family` as an array,
  placeholder photos of people).

### Then

- RFC-0006 step 5: the MCP tool `create_village`.
- A Radix engine (`/r/radix/…`).
- Figma: village and nature modes (needs a paid plan; the free-plan file has Theme + Primitives and four components).
- RFC-0003, later: `mcp init --client`, a hosted read-only MCP server.
- RFC-0004, later list: Sidebar, Input OTP, Hover Card, Context Menu, Item, Carousel (built in RFC-0007, lot B),
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
