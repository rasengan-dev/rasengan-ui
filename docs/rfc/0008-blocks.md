# RFC-0008 — Blocks: page sections built on the components

| | |
|---|---|
| Status | Accepted (2026-11-07). Open questions settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-07 |
| Author | Dilane Kombou |
| Builds on | RFC-0001 (the block content contract, kept by RFC-0002), RFC-0002 ("Blocks"), RFC-0003 (MCP server), RFC-0007 (motion components), ADR-0009 (categories), ADR-0010 to ADR-0012 (motion without Motion's runtime); Jutsify's design step 05 ("Rasengan UI integration") |
| Packages | new `registry/blocks/`, new `packages/blocks` (the `rasengan-blocks` item), `scripts/registry.mjs`, `packages/cli` (install targets, MCP), `apps/site` (a Blocks section) |
| Decision needed | — (zod's weight is measured in lot 0) |

## Problem

Rasengan UI has 53 components and no blocks. `registry/blocks/` is empty: the six blocks built under RFC-0001 were for
its "art directions", on GSAP, and were left behind by the villages pivot (RFC-0002 kept their content contract and
said blocks would be rebuilt on the components).

Three readers wait for them:

- **People building a landing page** want whole sections (hero, logos, features, pricing, FAQ, footer) that already
  wear the village, rather than assembling forty components each time.
- **Agents, Jutsify first.** Its design (step 05, frozen) decided that its storefront blocks are built *in Rasengan UI*,
  in the public registry, with the RFC-0001 contract, and that the agent reaches them through the MCP server: it picks
  blocks from a catalog, installs them, then writes **content objects**, not JSX. Jutsify's step 05 lists what it
  needs here: storefront categories, `kind: "block"` in the MCP, schemas returned by `get_component`.
- **The motion components** (RFC-0007) were built so sections could use them: a hero that reveals its headline, a logo
  marquee, rolling stats, a testimonial carousel, a 3D gallery. Motion+ sells 50 such sections; nobody offers them
  themed by a design language.

## Goals

1. A block contract that an agent can use without reading JSX: typed content with length limits and writing guidance,
   an example that renders on its own, and metadata to choose with.
2. Blocks built **only** from Rasengan UI components, contract tokens and `rasengan-motion`, so every block follows
   every village, nature, tint and scheme, and every custom village.
3. Two families from the start: **marketing** (startup and product landing pages) and **storefront** (local
   businesses: menu, services, hours, location, ordering), the second for Jutsify's first release.
4. Installed like components (`rasengan-ui add`, `add_components`, the shadcn CLI), kept up to date the same way
   (lockfile, 3-way merge).
5. A Blocks section on the site where a block can be seen at phone and desktop width, in every village, with its
   content schema.

## Non-goals

- **A page builder.** Blocks are code in the user's project, composed in a page file.
- **Porting v1 blocks as they were.** v1 stays archived and served unchanged (ADR-0003); a v1 layout worth keeping is
  rebuilt under a new descriptive name, after review.
- **Full templates** (whole sites) in this RFC. An example page per family is part of the docs; templates as registry
  items are left open.
- **GSAP, or Motion's runtime in blocks.** Motion comes from the motion components and `rasengan-motion` (ADR-0010 to
  ADR-0012).
- **Remote images or fonts** loaded by a block. Third-party content only where a project opts in (the location
  block's map embed).

## Proposal

### 1. What a block is

A folder in `registry/blocks/<name>/`, installed as `@/components/blocks/<name>/`:

| File | Holds |
|---|---|
| `<name>.base.tsx` | The section: React, the components, `rasengan-motion`. Takes `content`, `id`, `className`, `headingLevel` |
| `schema.ts` | The content contract, in zod: every visible string, link and image, with length limits and `.describe()` writing guidance |
| `example.ts` | Realistic content (never lorem ipsum) that parses with the schema; the component's default |
| `meta.ts` | What it is, for people and agents (below) |
| `<name>.demo.tsx` | The site's preview; variants as `<name>-<topic>.demo.tsx` |

Unlike a component, a block installs as a folder (four files), because its schema and example are read separately:
the page's content file imports the schema's type, and an agent reads the schema to write content.

```tsx
// registry/blocks/hero-centered/hero-centered.base.tsx (shape)
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import type { HeroCenteredContent } from "./schema";
import { heroCenteredExample } from "./example";

export function HeroCentered({ content = heroCenteredExample, id = "hero", className }: HeroCenteredProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("…", className)}>
      <TextReveal as="h1" id={`${id}-title`} trigger="mount">{content.headline}</TextReveal>
      {/* every string, link and image from content */}
    </section>
  );
}
```

### 2. Rules for a block

Kept from RFC-0001, adapted to the villages and to RFC-0007:

1. Every visible string, link and image comes from `content`; defaults come from `example.ts`.
2. Props are `content`, `id` (anchors), `className` (spacing) and `headingLevel`. No other styling props (a block may
   add a prop that changes behaviour, such as the location block's `embed`).
3. Contract names only (invariant 1); state through the `ui-*` variants. Layout and spacing utilities are free.
4. No scheme logic: no `dark:` classes, no reading the theme. A section that inverts its surface uses a
   `VillageScope` with `scheme`.
5. Motion only through the motion components and `rasengan-motion`. A block must look complete at intensity 1 and with
   motion off; richer motion is a bonus (Jutsify's agents default to intensity ≤ 1 for sites seen on slow networks).
6. SSR-safe: nothing touches `window` or `document` at module level or during render.
7. Images are `<img>` with `width`, `height`, `alt`, lazy below the fold, from the content (local paths or the
   project's assets). The registry ships a small set of open placeholder images (illustrations, and product shots made
   from the components) that the examples use and an agent replaces.
8. Semantics: one `h1` per page. A hero's heading is an `h1`; every other block's is an `h2`, and `headingLevel={1}`
   makes it the page's `h1` when it opens a page without a hero. Each section is a `<section>` named by its heading;
   links are links, buttons are buttons.
10. Content strings are plain text: no markup, no rich text, until a block shows it needs some.
11. Example content is in English; money, dates and hours are formatted with `Intl` in the project's locale (a
    `locale` field in the content, or the page's `lang`).
9. Imports use the installed paths (`@/components/ui/*`, `@/lib/*`, `@/lib/blocks`, `./schema`), like components.

### 3. `rasengan-blocks`: shared content types

A small registry library (`packages/blocks`, installed as `@/lib/blocks`), with the field types blocks share, so an
agent learns them once:

`cta` (`{ label, href }`), `image` (`{ src, alt, width, height }`), `icon` (a Lucide icon name), `logo`, `stat`,
`testimonial`, `pricePlan`, `faqItem`, and for storefronts `menuItem` (`{ name, description, price, tags }`),
`service` (`{ name, duration, price }`), `openingHours` (days and slots, closed days), `address` (lines, landmarks,
coordinates, a map link), `contactLink` (phone, WhatsApp, email, social). Money is a `{ amount, currency }` pair formatted with
`Intl.NumberFormat`, so prices follow the locale.

It also exports `BlockMeta` and a `defineBlock` helper that ties a block's schema, example and meta together for the
tests.

### 4. `meta.ts`

```ts
export const meta = {
  name: "hero-centered",
  title: "Hero, centred",
  family: "marketing",                 // "marketing" | "storefront"
  category: "hero",
  status: "beta",
  added: "2026-11-…",
  summary: "Headline revealed word by word, one line of subcopy, two calls to action, an optional product shot.",
  useWhen: "A product with a clear one-line promise.",
  avoidWhen: "Headlines over nine words; no call to action.",
  layout: { columns: "stacked", aboveTheFold: true },
  content: { images: 1, minWords: 15, maxWords: 60 },
  components: ["button", "text-reveal"], // also its registryDependencies
  pairsWith: ["logos-marquee", "features-grid"],
} as const satisfies BlockMeta;
```

Compared with RFC-0001: `directions` is gone (a block is tested in every village, as components are); `motion` is
derived from the motion components it uses; `weight` is measured by `pnpm registry`, never written by hand; `family`
and `added` are new; `version` goes (the lockfile and 3-way merge track changes, as for components).

### 5. Categories

Block categories are their own list (`registry/block-categories.ts`), like ADR-0009's for components:

| Family | Categories |
|---|---|
| marketing | `navbar`, `hero`, `logos`, `features`, `bento`, `steps`, `showcase`, `stats`, `testimonials`, `pricing`, `faq`, `cta`, `newsletter`, `footer` |
| storefront | `navbar`, `hero`, `menu`, `services`, `gallery`, `hours`, `location`, `order`, `testimonials`, `about`, `contact`, `footer` |

### 6. Registry, CLI and MCP

- Registry items of type `registry:block`, at `/r/<engine>/<name>.json` like components (names never collide: blocks
  are named `<category>-<layout>`). Their `registryDependencies` are their components plus `rasengan-blocks`; their
  npm dependency is `zod@^3.25` (the `zod` entry, which Rasengan.js packages and Jutsify use; it also contains the v4
  API for a later move).
- The CLI installs a block's files under a new `blocks` alias (`@/components/blocks` by default, in
  `rasengan-ui.json`); `diff` and `update` treat them like component files.
- The MCP server: `list_components` gains `kind: "block"` with `family` and `category` filters, and returns each
  block's `summary`, `useWhen` and weight; `get_component` on a block returns its schema as **JSON Schema**, its example
  and its meta, so an agent can write content without reading TypeScript. `add_components` installs blocks too.
- A `blocks.json` catalog (meta and JSON Schemas, no code) is published next to the registry, for agents that read the
  registry without the MCP server.

### 7. How a page uses blocks

Content apart from layout, as RFC-0001 set it:

```ts
// src/content/home.ts
import type { HeroCenteredContent } from "@/components/blocks/hero-centered/schema";
export const hero: HeroCenteredContent = { headline: "Ship invoices before coffee", /* … */ };
```

```tsx
// src/app/_routes/index.page.tsx
<main>
  <HeroCentered content={home.hero} />
  <LogosMarquee content={home.logos} />
</main>
```

A copy change is one line in `src/content/`; the schema type checks it.

### 8. The site

- A **Blocks** section in the header (Docs · Components · Motion · Blocks), with its sidebar grouped by family and
  category, and the "new" dot.
- A block's page: the block in a frame that can be set to phone (360px), tablet and desktop width, the village
  controls of the header, the code, the content schema as a table (field, type, limits, guidance), install commands.
- One example page per family, composed only of blocks: a startup landing page and a restaurant.

### 9. Quality gate

A block is done when:

1. `example.ts` parses with `schema.ts` (`pnpm test`).
2. It renders on the server without errors and without hidden content (`pnpm test`).
3. `pnpm axe` passes on its page, every village, light and dark, at 360px and 1440px.
4. `pnpm screenshots` covers it at 360px and 1440px with `?motion=final`.
5. It is within the weight budget (measured): 6 kB gzip of its own code, 12 kB for showcase blocks.
6. It reads well at intensity 1 and with motion off.
7. Its page exists, with the schema table.

## Options considered

- **Blocks as components, in `registry/components`**: one file per item does not fit a schema, an example and meta
  that are read on their own, and the categories and rules differ.
- **Props instead of one `content` object**: harder for an agent to write and validate, and copy would end up in JSX.
- **A JSON content format interpreted at runtime**: Jutsify's first principle is real code the user owns; content
  objects in TypeScript are both.
- **A separate registry for storefront blocks** (in Jutsify): Jutsify decided they belong in the public registry, where
  any Rasengan.js site can use them.
- **One block with many layout props** (`variant="split" | "centred"`): schemas and previews get muddy; distinct blocks
  with clear names are easier to choose from. Small options (an image on the left or right) can stay props.

## Risks and open questions

1. **Weight of zod** in a project that had none: about 13 kB gzip, paid once for every block's schema. Measured in
   lot 0; blocks import only the types at runtime where they can.

## Decisions

Settled by the maintainer on 2026-11-07:

| Question | Decision |
|---|---|
| zod version | **zod 3.25, the `zod` entry**, as Jutsify and the Rasengan.js packages use |
| Placeholder images | **A small open set shipped with the registry**, used by the examples, replaced by the agent or the user |
| Rich text | **Plain strings first**; a rich text field only when a block needs one |
| Locales | **Examples in English**, money, dates and hours formatted with `Intl` in the project's locale |
| Maps | **A static image and a directions link by default, and an opt-in OpenStreetMap embed** (`embed` on the location block) |
| Templates | **Example pages in the docs**, no template registry items for now |
| `h1` without a hero | **A `headingLevel` prop**: blocks render an `h2` by default, a hero an `h1`, and `headingLevel={1}` lets another block open the page |

## Plan

**Lot 0, foundations**: `packages/blocks` (field types, `BlockMeta`, `defineBlock`), `registry/block-categories.ts`, the
`registry:block` build with measured weight and `blocks.json`, the CLI `blocks` alias, the MCP `kind: "block"` and JSON
Schema in `get_component`, the site's Blocks section and block page, the quality gate tests. Done when an empty
section renders and a test block installs in the playground and in Jutsify's sandbox registry copy.

**Lot A, a marketing landing page (10 blocks)**: `navbar-simple`, `hero-centered` (TextReveal), `logos-marquee`
(Marquee), `features-grid`, `stats-numbers` (NumberRoll), `testimonials-carousel` (Carousel), `pricing-plans`,
`faq-accordion`, `cta-banner` (ButtonRollingText), `footer-columns`, and the example page.

**Lot B, a storefront (9 blocks, Jutsify's first release)**: `hero-photo`, `menu-categories`, `services-list`,
`gallery-grid` (Gallery3D below intensity 2 is a grid), `hours-week`, `location-map`, `order-banner` (WhatsApp or
phone), `about-story`, `contact-links`, and the restaurant example page. `location-map` shows a static map image and a
directions link by default, and an OpenStreetMap embed when the project passes `embed`.

**Lot C, showcase**: `bento-features`, `steps-scroll`, `showcase-tabs`, `pricing-comparison`, `newsletter-inline`,
`team-grid`, a `page-transition` example between two example pages.

Each lot is done when its blocks pass the quality gate in every village, light and dark, at phone and desktop width.
