# ADR-0009 — Every component names one category in its `meta.ts`

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-07 |
| Replaces | — (RFC-0007, "Organisation", in practice) |

## Context

The site listed 44 components in one alphabetical sidebar, and the registry had no way to say what kind of component
an item is. RFC-0007 adds motion components, which need their own place on the site and must be findable by agents,
and the list keeps growing.

## Decision

- `registry/categories.ts` holds the categories, in the order the site lists them: `forms`, `dates`, `overlays`,
  `navigation`, `display`, `feedback`, `motion`, each with a title and a one-line description.
- Every `meta.ts` has a `category` field naming one of them. `scripts/registry.mjs` refuses an unknown one and publishes
  it in the item's `meta.category`.
- `motion` is for components whose motion is their purpose: without the animation they make no sense. A component
  that still works without it (carousel, dialog, a Button variant) goes in another category.
- The site groups the sidebar, the pager and `/components` by category; `/motion` is the motion gallery. The MCP tool
  `list_components` takes a `category` filter.

## Options ruled out

- **A folder per category** (`registry/motion/…`, `/r/base/motion/…`): forks the registry build, the CLI, the MCP server,
  axe and screenshots, and puts the category into URLs that must never change.
- **Tags (several per component)**: more than the sidebar needs; one category keeps the order of the pager simple.
- **The category in the item name** (`motion-marquee`): leaks into install names and imports.

## Consequences

- A new component is not done until its `meta.ts` names a category; `pnpm registry` fails otherwise.
- Moving a component to another category changes the sidebar, never a URL or an install name.
- Adding a category is a change to `registry/categories.ts`, the MCP tool's enum and this ADR's list.
