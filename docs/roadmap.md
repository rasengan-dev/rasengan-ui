# Roadmap

> **Living document**: where the project stands, what is left to build, what is left to decide. It is **the only list
> of open questions**: RFCs point here. A settled question is removed from here and becomes an [ADR](adr/README.md).
>
> Last updated: 2026-11-24 (RFC-0011 accepted).

## Where things stand

| Piece | State |
|---|---|
| Components | 59, on Base UI, in `registry/components` ([RFC-0002](rfc/0002-villages.md), [0004](rfc/0004-v1-components.md), [0005](rfc/0005-dates-and-times.md), [0007](rfc/0007-motion-components.md), [0010](rfc/0010-scroll-motion.md)) |
| Motion components | RFC-0007 complete: text-reveal, typewriter, scramble-text, number-roll, marquee, cursor, gallery-3d, page-transition; carousel (display); Button's `HoldButton` and `ButtonRollingText` ([ADR-0011](adr/0011-carousel-and-cursor-without-motion.md), [ADR-0012](adr/0012-gallery-and-page-transition-without-motion.md)). RFC-0010 complete: scroll-progress, image-reveal, text-scroll-fill, scroll-stack, horizontal-scroll on `--scroll-progress`, and sticky-scroll (display) ([ADR-0019](adr/0019-scroll-motion-on-css-scroll-timelines.md)). None loads Motion |
| Variants | `variant` × `tone` × `size` on most components ([plan 002](plans/002-component-variants.md)) |
| Villages | Konoha, Kiri, Iwa, Kusa (the contract's lip, [ADR-0008](adr/0008-lip-in-the-token-contract.md)) |
| Natures | Six, with Onmyōton; neutral tint |
| Village engine, workshop, `village create/check/export` | Built ([RFC-0006](rfc/0006-custom-villages.md), steps 1 to 4) |
| CLI | `rasengan-ui` 0.3.0 on npm (`mcp --http`); 0.4.0 ready to publish (`village create --intensity`, ADR-0018) |
| `rasengan-workshop` | In the registry: the workshop's parts, in English and French ([ADR-0017](adr/0017-workshop-as-a-shared-registry-item.md)). Usable by other projects once `@rasengan-ui/villages` and the next CLI are on npm |
| `@rasengan-ui/villages` | 0.1.1 on npm ([ADR-0016](adr/0016-villages-published-on-npm.md)); 0.1.0 deprecated, its `exports` pointed at `src/`. 0.2.0 ready to publish: the recipe's `intensity` ([ADR-0018](adr/0018-intensity-knob-in-the-recipe.md)). Publishing refuses anything but `pnpm publish` |
| MCP server | `rasengan-ui mcp`, five tools ([RFC-0003](rfc/0003-mcp-server.md), steps 1 to 3) |
| Site | Live at `rasengan-ui.hiraiship.app`, prerendered, with Tag Manager ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)) |
| Project docs | `docs/` in this format since 2026-11-07 ([ADR-0001](adr/0001-project-docs-like-jutsify.md)) |
| Blocks | 45 (RFC-0008 lots 0, A, B and C; RFC-0009 lots D0, D and E): 26 marketing (navbar-simple, hero-centered, hero-split, hero-wordmark, logos-marquee, logos-grid, features-grid, features-alternating, bento-features, steps-scroll, showcase-tabs, integrations-orbit, comparison-table, stats-numbers, testimonials-carousel, testimonials-wall, pricing-plans, pricing-comparison, faq-accordion, cta-banner, cta-app, newsletter-inline, team-grid, contact-form, footer-columns, footer-wordmark) and 21 storefront (hero-photo, hero-wordmark, menu-categories, menu-cards, menu-list, services-list, services-pricelist, booking-form, offer-deal, gallery-grid, gallery-social, hours-week, location-map, location-branches, order-banner, about-story, team-staff, reviews-rating, contact-links, contact-form, footer-local), `hero-wordmark` and `contact-form` in both families; the examples `/examples/landing`, `/examples/restaurant` and `/examples/salon`, linked through a page transition; the gallery at `/blocks`; `rasengan-blocks`, `rasengan-placeholders`, `blocks.json`, MCP `kind: "block"` ([ADR-0013](adr/0013-blocks-answer-their-container.md)) |
| `packages/motion` | `rasengan-motion` in the registry: motion modes, village motion tokens, primitives, `splitText` ([RFC-0007](rfc/0007-motion-components.md) lot 0) |
| Categories | Every component has one; the site groups by them and has a Motion section ([ADR-0009](adr/0009-component-categories.md)) |

## What is left to build

### Next

- **Finish Kusa**: say what Kusa does in the component pages' prose (they describe Konoha, Kiri and Iwa only); its
  focus halos are 2.3 to 2.4:1 on the background in dark mode (see 0002-Q5). `pnpm axe` now runs with Kusa: the site's
  prose links used `text-primary` (4.3:1 in Kusa light) and now use the primary's words (`tone-primary text-tone-text`).
- **Motion components** ([RFC-0007](rfc/0007-motion-components.md)): all four lots built.
- **Blocks** ([RFC-0008](rfc/0008-blocks.md), accepted): all lots built. Left from lot 0: installing a block in
  Jutsify's sandbox registry copy (they install in the playground). Lot C: bento-features, steps-scroll,
  showcase-tabs, pricing-comparison, newsletter-inline and team-grid (1.2 to 2 kB each), two more product screens in
  the placeholders (`product-invoice`, `product-payment`), and the example pages linked through a page transition
  (the floating toolbar's switcher). `newsletter-inline` posts to the provider's URL in its content, or to `onSubmit`:
  a newsletter has no message to send to the business. Gallery3D is still in no block: `gallery-grid` is a photo grid
  with a Dialog lightbox (its cards are portrait). The storefront placeholders became real photos on 2026-11-09
  ([ADR-0015](adr/0015-placeholder-photos-of-food-and-places.md)).
- **Blocks, second wave** ([RFC-0009](rfc/0009-blocks-second-wave.md), accepted): new categories (`team`, `booking`,
  `offers`, `comparison`, `integrations`), lot D (ten storefront blocks: booking, menu cards, price list, staff,
  reviews…) and lot E (ten marketing blocks: split and wordmark heroes, comparison, integrations, contact form…), from
  a survey of what designers publish. Its seven questions were settled before acceptance (its "Decisions"). Order:
  lots D0 and D, then RFC-0008's lot C, then lot E. Lot D0 built: the categories, the field types, `family` as a
  list (registry check, `blocks.json`, MCP filter, the site's grouping; tried with a block in both families), six
  drawn logo marks and eleven Unsplash portraits ([ADR-0014](adr/0014-placeholder-photos-from-unsplash.md)). Lot D
  built: booking-form, menu-cards, menu-list, services-pricelist, team-staff, reviews-rating, gallery-social,
  location-branches, offer-deal, footer-local (1.2 to 3.3 kB each); `messageUrl` in `lib/blocks` for every link that
  opens a message; the restaurant example gains dish cards, reviews, booking and the local footer, and
  `/examples/salon` is new. Differences from the RFC's table: `gallery-social` has no lightbox (photos and one follow
  link) and `reviews-rating` no carousel (a masonry that stacks); the booking form's date trigger is written by
  date-fns in English whatever `locale` says (the message uses `Intl`). Lot E built: hero-split, hero-wordmark,
  features-alternating, testimonials-wall, comparison-table, integrations-orbit, logos-grid, cta-app, footer-wordmark,
  contact-form (0.8 to 2.1 kB each); `hero-wordmark` and `contact-form` are the first blocks in both families, and a
  `product-phone` placeholder joins the product screens. `contact-form`'s subject is a set of radio chips, not a
  select: every choice stays visible and in the HTML. The site's `<BlockVariant>` shows a block's other demos on its
  page (the wordmark for a restaurant, the form for catering, the booking form for a salon). RFC-0009's lots are all
  built; lot F stays a list to pick from.

- **Scroll motion** ([RFC-0010](rfc/0010-scroll-motion.md), accepted; [ADR-0019](adr/0019-scroll-motion-on-css-scroll-timelines.md), [ADR-0020](adr/0020-scroll-feedback-keeps-working-under-reduced-motion.md)): scroll-progress, image-reveal, text-scroll-fill,
  scroll-stack, horizontal-scroll and sticky-scroll on one scroll progress in `rasengan-motion`; the first of the RFCs
  drawn from the [Framer templates survey](surveys/2026-11-23-framer-templates.md), for Jutsify's catalogue of
  starting sites. **Lot 0 built**: `useScrollProgress` and `--scroll-progress` in `rasengan-motion` (about 1.1 kB
  gzip beyond the provider), timelines and the frame-loop fallback giving the same values to 0.001 in Chrome;
  `Parallax` on it (about 1.2 kB, was Motion's `useScroll` and `m`), a scroll demo on `/motion`. **Lot A built**:
  `scroll-progress` (the page or an article through `useScrollProgress`'s new `subject`; keeps working under `off`),
  `image-reveal` (curtain, circle, diagonal; `scrub` at intensity 3), `text-scroll-fill` (muted to the tone's text, a
  rise of a quarter of the travel from intensity 2); 3.5 to 4 kB gzip each beyond `cn()`, `rasengan-motion` included;
  both scroll paths give the same values in Chrome. **Lot B built**: `scroll-stack` (one screen of scroll per card,
  pinned over the whole stack; `shrink` from intensity 2, `tilt` at 3) and `horizontal-scroll` (pinned on screens of
  48rem and wider, a native snapping row below; the page scrolls to a focused card), 3.5 and 3.8 kB gzip. Both take a
  `progress` that draws a moment in place without scrolling (`data-layout="still"`), which the village grid shows
  (`<VillageGrid demo>`): sticky cannot stick inside its cells. Differences from the RFC's tables: no dimming of
  covered cards (a `filter` breaks Kiri's glass and its contrast); the row pins by the screen's width, not the
  section's (`@md`), since the docs column is narrower than 48rem; demo cards use `bg-background`, as `bg-card` is
  see-through in Kiri and stacked cards would show the text behind. **Lot C built, RFC-0010 complete**:
  `sticky-scroll` (display, 2.5 kB gzip: `StickyScrollList`, `StickyScrollItem`, `StickyScrollMedia`,
  `StickyScrollStage`; a list part was added to the RFC's four, to number the items; the stage cuts at intensity 1,
  fades at 2, slides at 3; a list at intensity 0, with reduced motion and `final`) and `steps-scroll` rebuilt on it
  (same schema and look, 30 lines shorter; `components: ["sticky-scroll"]`). The site's block showcase clipped with
  `overflow: hidden`, so `steps-scroll`'s stage never stuck on its own page: it now uses `overflow: clip`. The six
  components on one page, Chrome's CPU slowed six times: 60 frames per second, none over 33 ms, on both paths (0010-Q4
  settled: the custom property stays). 0010-Q5 settled on 2026-11-24: a project with lot B's `steps-scroll`, edited in
  two places, then `rasengan-ui update steps-scroll` against lot C's registry. The edit outside the changed lines was
  kept, `sticky-scroll`, `rasengan-motion` and the `motion` package came in, and the line both had changed (a step's
  title) got conflict markers, as invariant 14 wants. Who keeps their own version of that line loses the highlight: the
  group is now `group/sticky-item`, no longer `group/step`; the block's page says so.

- **Text and pointer motion** ([RFC-0011](rfc/0011-text-and-pointer-motion.md), accepted, no lot built yet): text-rotate, shiny-text,
  Badge's live dot, spotlight, hover-image-list and image-trail; the second RFC drawn from the
  [Framer templates survey](surveys/2026-11-23-framer-templates.md).

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

### Text and pointer motion (RFC-0011)

- **0011-Q5 · `pointermove` cost**: `spotlight` and `hover-image-list` on every card of a grid. Lot 0 measures a grid
  of twelve spotlight cards and a hover list of twelve rows with Chrome's CPU slowed six times; if it janks, one shared
  pointer tracker in `rasengan-motion` serves them.

### Components (RFC-0004, RFC-0005)

- **0004-Q1**: a `loading` prop on Button, or composition as in shadcn?
- **0004-Q2**: a `drawer` item re-exporting Sheet with `side="bottom"`, for shadcn's `Drawer` imports?
- **0004-Q3**: Command: accept children without `items`, filtering them like cmdk?
- **0004-Q4**: Table: may a village (Iwa) default to `striped` through a token?
- **0004-Q5**: Navigation Menu below `md`: leave it to blocks, or ship `NavigationMenuMobile` in a Sheet?
- **0004-Q6**: the site's mobile menu: keep the Popover, or move to a left Sheet?
- **0005-Q1**: Persian, Hijri and other calendars: a `calendar` prop or separate items?
- **0005-Q2**: a segmented time field for designs that cannot use the native input?
