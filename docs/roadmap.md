# Roadmap

> **Living document**: where the project stands, what is left to build, what is left to decide. It is **the only list
> of open questions**: RFCs point here. A settled question is removed from here and becomes an [ADR](adr/README.md).
>
> Last updated: 2026-11-25 (CLI 0.4.1 ready to publish).

## Where things stand

| Piece | State |
|---|---|
| Components | 71, on Base UI, in `registry/components` ([RFC-0002](rfc/0002-villages.md), [0004](rfc/0004-v1-components.md), [0005](rfc/0005-dates-and-times.md), [0007](rfc/0007-motion-components.md), [0010](rfc/0010-scroll-motion.md), [0012](rfc/0012-interface-components.md)) |
| Motion components | RFC-0007 complete: text-reveal, typewriter, scramble-text, number-roll, marquee, cursor, gallery-3d, page-transition; carousel (display); Button's `HoldButton` and `ButtonRollingText` ([ADR-0011](adr/0011-carousel-and-cursor-without-motion.md), [ADR-0012](adr/0012-gallery-and-page-transition-without-motion.md)). RFC-0010 complete: scroll-progress, image-reveal, text-scroll-fill, scroll-stack, horizontal-scroll on `--scroll-progress`, and sticky-scroll (display). RFC-0011 complete: text-rotate, shiny-text, Badge's live dot, spotlight, hover-image-list, image-trail ([ADR-0019](adr/0019-scroll-motion-on-css-scroll-timelines.md)). None loads Motion |
| Variants | `variant` × `tone` × `size` on most components ([plan 002](plans/002-component-variants.md)) |
| Villages | Konoha, Kiri, Iwa, Kusa (the contract's lip, [ADR-0008](adr/0008-lip-in-the-token-contract.md)) |
| Natures | Six, with Onmyōton; neutral tint |
| Village engine, workshop, `village create/check/export` | Built ([RFC-0006](rfc/0006-custom-villages.md), steps 1 to 4) |
| CLI | `rasengan-ui` 0.4.0 on npm (`village create --intensity`, ADR-0018); 0.4.1 ready to publish: the MCP `family` filter takes portfolio, commerce and listings |
| `rasengan-workshop` | In the registry: the workshop's parts, in English and French ([ADR-0017](adr/0017-workshop-as-a-shared-registry-item.md)). Usable by other projects since `@rasengan-ui/villages` 0.2.0 and CLI 0.4.0 are on npm |
| `@rasengan-ui/villages` | 0.2.0 on npm ([ADR-0016](adr/0016-villages-published-on-npm.md)), with the recipe's `intensity` ([ADR-0018](adr/0018-intensity-knob-in-the-recipe.md)); 0.1.0 deprecated, its `exports` pointed at `src/`. Publishing refuses anything but `pnpm publish` |
| MCP server | `rasengan-ui mcp`, five tools ([RFC-0003](rfc/0003-mcp-server.md), steps 1 to 3) |
| Site | Live at `rasengan-ui.hiraiship.app`, prerendered, with Tag Manager ([ADR-0005](adr/0005-prerendered-site-on-hiraiship.md)) |
| Project docs | `docs/` in this format since 2026-11-07 ([ADR-0001](adr/0001-project-docs-like-jutsify.md)) |
| Blocks | 68 (RFC-0008 lots 0, A, B and C; RFC-0009 lots D0, D and E; RFC-0013 lots G, H and I; RFC-0014 lots J and K): 36 marketing (hero-video, hero-product, process-steps, testimonials-marquee, changelog, waitlist, customer-stories, security-badges, integrations-grid, careers, navbar-simple, hero-centered, hero-split, hero-wordmark, logos-marquee, logos-grid, features-grid, features-alternating, bento-features, steps-scroll, showcase-tabs, integrations-orbit, comparison-table, stats-numbers, testimonials-carousel, testimonials-wall, pricing-plans, pricing-comparison, faq-accordion, cta-banner, cta-app, newsletter-inline, team-grid, contact-form, footer-columns, footer-wordmark) and 21 storefront (hero-photo, hero-wordmark, menu-categories, menu-cards, menu-list, services-list, services-pricelist, booking-form, offer-deal, gallery-grid, gallery-social, hours-week, location-map, location-branches, order-banner, about-story, team-staff, reviews-rating, contact-links, contact-form, footer-local), and 10 portfolio (navbar-simple, hero-wordmark, projects-grid, projects-list, case-study, gallery-horizontal, awards-list, experience-timeline, contact-form, footer-wordmark), and 7 commerce (navbar-simple, product-grid, product-detail, cart-drawer, faq-accordion, contact-form, footer-columns), and 8 listings (navbar-simple, search-hero, filter-bar, listing-cards, listing-detail, faq-accordion, contact-form, footer-columns), some in several families; the examples `/examples/landing`, `/examples/restaurant`, `/examples/salon`, `/examples/portfolio` (with a case study per project), `/examples/saas` `/examples/shop` (with a page per product) and `/examples/homes` (with a page per home), linked through a page transition; the gallery at `/blocks`; `rasengan-blocks`, `rasengan-placeholders`, `blocks.json`, MCP `kind: "block"` ([ADR-0013](adr/0013-blocks-answer-their-container.md)) |
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

- **Text and pointer motion** ([RFC-0011](rfc/0011-text-and-pointer-motion.md), accepted): text-rotate, shiny-text,
  Badge's live dot, spotlight, hover-image-list and image-trail; the second RFC drawn from the
  [Framer templates survey](surveys/2026-11-23-framer-templates.md). **Lot 0 done** (0011-Q5 settled, 2026-11-24): a temporary
  page with twelve glowing cards and a twelve-row list whose picture follows the pointer on the village's spring, one
  pointer move per frame for eight seconds, Chrome's CPU slowed six times. With a listener per card and with one shared
  listener: 60 frames per second, none over 33 ms; about 30 to 60 ms of script and 60 ms of style per second. The
  shared listener saves about 50 ms of script on the grid and nothing on the list: each component keeps its own
  `pointermove` listener and writes once per frame, no shared tracker in `rasengan-motion`. **Lot A built**:
  `text-rotate` (3.7 kB gzip with Button; the words' space eases to each word; stops on the last word, or shows a pause
  button when it runs past five seconds; screen readers get the sentence with `Intl.ListFormat`), `shiny-text` (2.6 kB;
  on view or hover, at most what fits in five seconds) and Badge's `indicator="live"`. Differences from the RFC: the
  sheen's band is mixed toward the foreground, not lighter, since a tone's colour for words is often at 4.5:1 exactly
  and any lighter band failed (4.1:1 measured); the live dot's ring runs from intensity 1, with no extra ring at 3.
  **Lot B built, RFC-0011 complete**: `spotlight` (a wrapper; it reads the surface's corners and border width, the
  border lit by a masked gradient from intensity 2, the light on the spring at 3; `at` holds it for screenshots),
  `hover-image-list` (rows as links, `render` for a router's link; each row carries its picture, placed by the list's
  custom properties, so pictures cross-fade; `active` holds a row; keyboard focus shows the picture beside the row) and
  `image-trail` (a pool of `img` on the Web Animations API, from intensity 2). Weights, gzip beyond `cn()` with
  `class-variance-authority` and `rasengan-motion`: 3.2, 3.8 (plus Base UI's `useRender`) and 2.8 kB, a little over the
  RFC's 2 to 3 kB. Differences from the RFC: `hover-image-list`'s picture fades in with a CSS transition, not the Web
  Animations API; its pictures stay out of the page until the list has mounted, since one styled late faded out on load.

- **Interface components** ([RFC-0012](rfc/0012-interface-components.md), accepted): number-field, rating, chip,
  announcement-bar, lightbox and video, the survey's P1 interface components, which the next sector blocks are made of;
  the third RFC drawn from the [Framer templates survey](surveys/2026-11-23-framer-templates.md). Its six questions were
  settled before acceptance (its "Decisions"). `gallery-grid`, `reviews-rating` and `booking-form`'s party size move
  onto the new components with the same schemas. **Lot A built**: `number-field` (Base UI's, in Input Group's field; 0.8 kB
  gzip beyond `cn()`, Base UI and Input Group), `rating` (`Rating` filled to the tenth, `RatingGroup` on radios; 1.6 kB),
  `chip` (`ChipGroup` on Toggle Group, `ChipRemove`, link chips through `render`; 1.6 kB) and `announcement-bar` (soft or
  solid, `dismissKey` in `localStorage` with `AnnouncementBarScript` for `<head>`, `scrolling` on Marquee; 1.8 kB beyond
  Marquee). `booking-form`'s party size is a `number-field` and `reviews-rating`'s stars are `Rating`, same schemas;
  `rasengan-ui update` over both blocks, each edited in two places, kept the edits outside the changed lines, brought in
  `number-field` and `rating`, and left conflict markers on the two lines both sides had changed (invariant 14); the
  blocks' pages say to keep the registry's side there. Differences from the RFC: the number field's buttons are named
  with `aria-label` on each part (Base UI says "Decrease" and "Increase" by default), not a `labels` prop; chips are
  `h-control-sm` (`sm`) and `h-control` (`default`), at least as wide as they are tall; `reviews-rating`'s stars are now
  filled to the tenth, not the half. **Lot B built, RFC-0012 complete**: `lightbox` (a full-screen Dialog on the page's
  background, the photos in a row with native scroll snapping; arrows, arrow keys, Home and End, a swipe; the current
  photo's `alt` as the title; 2.0 kB gzip beyond `cn()`, Base UI, Dialog and Button) and `video` (poster and a play
  button, then the browser's controls, nothing loaded before; `autoPlay` as a muted loop with a pause button that waits
  under reduced motion and `final`; `VideoDialog` that plays on open and stops on close; 3.1 kB). `gallery-grid` opens
  its photos in a `lightbox`, same schema, and gains the swipe. The demo video is a file the site serves, made from the
  `restaurant-room` photo ([ADR-0021](adr/0021-demo-video-served-by-the-site.md)). `rasengan-ui update` over an edited
  `gallery-grid` installs `lightbox` and keeps the edits, but between conflict markers: the block's markup moved one level
  deeper, inside the Lightbox, so nearly every line changed; its page says so. The video's play button is centred with
  `inset-0 m-auto`: centred with a translate, `pressable` overwrote it and the button jumped on press.

- **Portfolio and SaaS blocks** ([RFC-0013](rfc/0013-portfolio-and-saas-blocks.md), accepted): seventeen blocks in three
  lots, the first sector wave drawn from the [Framer templates survey](surveys/2026-11-23-framer-templates.md): a
  `portfolio` family, shared field types for lists and their pages, `device-frame` in lot I, six new project covers. Its
  seven questions were settled before acceptance (its "Decisions"). Every block starts by inspecting its Framer
  references (the RFC's section 7) and writing an "Observed" note in the lot's pull request. `press-logos` has no true
  reference yet: look again before lot I, or move it to lot F. **Lot G0 built**: the `portfolio` family (in
  `blocks.json`, the MCP `family` filter and the gallery), the categories `projects`, `case-study`, `awards` and
  `experience` (the SaaS ones and `press` come with their first blocks, as RFC-0009's rule says), eight field types
  (`project`, `caseSection`, `release`, `position`, `award`, `timelineEntry`, `customerStory`, `trustPoint`) with
  their tests, six project covers (`project-*.svg`: architecture, interior, product, ceramics, packaging, landscape),
  and `/examples/portfolio` as a skeleton (navbar, wordmark hero, contact form, wordmark footer) with its `projects`
  array in `src/content/portfolio.ts`; it joins the example switcher, the search and the sidebar in lot G.
  `navbar-simple`, `hero-wordmark`, `contact-form` and `footer-wordmark` are in the portfolio family too. Differences
  from the RFC: `award` has a `by` (who gave it) and `trustPoint` a `status` (certified or in progress); a poster and a
  packaging photo with real brands on them were dropped for a ceramics still life and a blank box. `pnpm axe` takes a
  page path (`pnpm axe /examples/portfolio`). **Lot G built**: `projects-grid` (chips with a count per kind,
  every project in the HTML; 2.2 kB), `projects-list` (`hover-image-list` rows; 1.8 kB), `case-study` (facts, sections,
  results on `number-roll`, a gallery in a `lightbox`, the next project; 2.7 kB), `gallery-horizontal`
  (`horizontal-scroll` with Savage's counter; 1.4 kB), `awards-list` (a `table`; 1.1 kB) and `experience-timeline`
  (1.2 kB). Their references were inspected first and the "Observed" notes are in the lot's pull request.
  `/examples/portfolio` is the whole studio site, and `/examples/portfolio/<slug>` a case study per project with the
  other projects as a list, all from one `projects` array; it joins the example switcher, the search, the sidebar and
  the gallery's links. Differences from the RFC, after looking at the references: `experience-timeline` is ruled rows
  (TITARVL's table), not a vertical line; `projects-grid` has no `spotlight` (a zoom on the cover instead); and
  `hover-image-list` gains `imageAlt`, so `projects-list` describes its covers. **Lot H built**: `changelog`
  (releases with a version and date rail, added, improved and fixed lists, a screenshot, a filter by kind; 2.2 kB),
  `waitlist` (posts to the provider, or `onSubmit` with sending, joined and failed in a status line; 1.8 kB),
  `customer-stories` (one rolling number per customer; 1.8 kB), `security-badges` (an icon from a fixed set and a
  certified or in-progress status, never a seal; 1.3 kB), `integrations-grid` (category chips and a search, an empty
  state; 2.1 kB) and `careers` (grouped by team, a filter, an empty state; 1.8 kB), after inspecting their references
  (the "Observed" notes are in the lot's pull request). The categories `changelog`, `waitlist`, `customers`, `trust` and
  `careers` came with them; `release` gained an `image`, `integration` a `description`, an `href` and `isNew`.
  `/examples/saas` puts them together for Senbon. `pnpm axe` caught soft tones on muted surfaces under 4.5:1 (a badge
  on a muted tile, a pressed chip in a muted section): Chip's pressed and solid washes are now opaque over the page's
  background, and the security tiles sit on the page's background. The block test counts `status` as a code, not text.
  **Lot I built, RFC-0013 complete**: `device-frame` (a component, display: a browser window or a phone drawn
  from the contract), `hero-video` (a muted loop in a rounded frame with its pause button, the text on an opaque panel
  over the corner, under the video on phones; 1 kB), `hero-product` (the screen in a `device-frame` on a soft glow, reworked after lot J0;
  1.1 kB), `process-steps` (numbered cards coming in at the village's stagger; 1.1 kB) and `testimonials-marquee`
  (three columns at their own speeds, one row on phones, each with the marquee's pause button; 1.6 kB), after
  inspecting their references. `/examples/restaurant` opens on `hero-video`, `/examples/saas` on `hero-product` with
  `process-steps` and `testimonials-marquee`. `press-logos` moved to RFC-0009's lot F list: no template with an "As
  seen in" strip was found (about forty demos and a marketplace search, 2026-11-24). Differences from the RFC, after
  looking: the hero's text sits on a panel rather than straight on a wash (a scheme cannot be forced on part of a page
  without naming its village), and the testimonials quote cards rather than portrait photos. In passing,
  `scripts/registry.mjs` now adds `rasengan-motion` to any block that imports `@/lib/motion`: `integrations-orbit` did
  without declaring it, so installing it alone did not compile.

- **Commerce and listings blocks** ([RFC-0014](rfc/0014-commerce-and-listings-blocks.md), accepted): seven blocks in two
  lots, the second sector wave from the [Framer templates survey](surveys/2026-11-23-framer-templates.md):
  `product-grid`, `product-detail` and `cart-drawer` for shops (family `commerce`), `search-hero`, `filter-bar`,
  `listing-cards` and `listing-detail` for directories and real estate (family `listings`). No backend: a `useCart` in
  `rasengan-blocks` kept in the browser, checkout by message, URL or `onCheckout`, filters written in the page's
  address. Its eight questions were settled before acceptance (its "Decisions"). Every block starts by inspecting its
  Framer references (the RFC's section 8); the cart's references are static mockups, so its behaviour is designed,
  not observed. **Lot J0 built**: the `commerce` and `listings` families (in `blocks.json`, the MCP `family` filter
  and the gallery) with the categories `products`, `product`, `cart`, `search` and `listing`; `navbar-simple`,
  `footer-columns`, `faq-accordion` and `contact-form` join both. Field types `product`, `listing`, `facet` and
  `cartLine` with their tests; `lib/cart.ts` in `rasengan-blocks` (`useCart` on `useSyncExternalStore`, one
  `localStorage` key per shop, kept in step across tabs, empty on the server; `lineId`, `orderText`), with its tests.
  Twelve Unsplash photos: six products (`shop-*.svg`, 1000 × 1250) and six homes and places (`place-*.svg`).
  `/examples/shop` (Kaya, a home goods shop) and `/examples/homes` (Nyanga, a property agency) as skeletons with their
  `products` and `listings` arrays; they join the site's menus in lots J and K. Differences from the RFC: `listing`'s
  facts are numbers with a label (`{ label: 'beds', value: 3 }`) so filters can count them, and product photos are
  named `shop-*` (`product-*` already names the product screens).
  Two of lot I's blocks reworked, as they looked like older ones: `hero-product` (like `hero-centered`) is now a
  stage, a soft panel of the primary colour with the screen rising out of it, wider than the text and cut and faded
  by the panel's edge, settling as the page scrolls (it grows and rises from intensity 2, straightens from an 18° tilt
  at 3; observed on Dreelio: about 7° and 0.94 at load, flat after 300px); `testimonials-marquee` (like
  `testimonials-wall`) is now two rows sliding sideways in opposite directions, faded at the edges (Dreelio's masked
  row: 386px cards, 24px apart, about 40px/s). Their content schemas are unchanged. `testimonials-wall` left gaps at the end of its shorter columns (one Marquee
  moved the three as one block, as long as the longest): each column now loops in its own Marquee at the same speed,
  with one pause button for the three, through Marquee's new `paused` prop. **Lot J built**: `product-grid` (cards
  with a second photo on hover, badge, rating, price and was; category chips with counts and a sort, both in the address,
  `?category=…&sort=…`; `controls: false` for a "you may also like" row; 3.2 kB), `product-detail` (a large photo that
  opens the Lightbox, thumbnails that change it, variants as chips with sold-out options struck and not pickable, a
  single option in stock picked from the start, quantity, "Add to bag · total", a missing option named and focused;
  adds to `useCart` and opens the cart; 3.3 kB) and `cart-drawer` (a Sheet from the side: lines with quantity and
  remove, a bar toward free delivery, the subtotal, the order by message, to a URL or to `onCheckout`; its button
  floating or inline; 2.2 kB). `lib/cart.ts` gained `openCart` and `onCartOpen`. Four close-ups cropped from the
  product photos (`shop-*-detail.svg`). `/examples/shop` shows the grid, and `/examples/shop/<slug>` a page per
  product with four others under it, both with the cart; the shop joins the site's menus. axe opens product-detail's
  gallery and cart-drawer on their pages. Observed before building (Dewly, Scoop, Luxevaro): 4:5 photos with a
  second on hover (Dewly), the category in the address (`?category=`, Dewly), the sort as Featured / Lowest / Highest
  / Top rated (Dewly), "Pick a size first" (Scoop), adding opens the bag drawer with a free-delivery bar, "Size 38"
  under the line, a stepper and Remove, then subtotal, "Taxes and delivery are worked out at checkout" and Checkout
  (Scoop). Differences from the RFC: Scoop shows no sizes on its grid, so the grid has none; product details stay
  paragraphs (Luxevaro's table of materials and dimensions is not in `product`). **Lot K built, RFC-0014 complete**:
  `lib/filters.ts` in `rasengan-blocks` (`useFilters` on `useSyncExternalStore` over the query, `setFilters` with
  `replaceState`, `matchesFilters`, `sortListings`; a format that matches without the facets: `q` words, comma lists
  for kind, status, place and tags, `min-max` for the price, a fact's label for "at least"; tested). `search-hero` (a
  GET form to the list page, so it works without JavaScript, filtering in place on that page and scrolling to the list;
  popular searches as chip links; 2 kB), `filter-bar` (facets from the content: chips with counts, a two-thumbed price
  slider written when let go, "at least" numbers, words, a sort, a reset and the count; `items` is the same listings,
  counted, not shown; 2.8 kB), `listing-cards` (one card for homes and places, facts and price per period, hidden in
  place by the address, an empty state that clears the filters; 2.4 kB) and `listing-detail` (title, status, tags and
  price, a mosaic of three photos in the Lightbox, facts, description, amenities, details, and an enquiry by message
  that stays in view; 3.6 kB). `/examples/homes` (search, filters, homes) and `/examples/homes/<slug>` with three other
  homes; the agency joins the site's menus. The block test skips `options`, `key` and `items` (not shown as text).
  Observed (Listora, Urbangrid, Realtora): Listora's search panel over the bottom of a wide photo writes
  `?hero-search-query=` and filters in place, with a side panel of checkboxes and counts; Urbangrid's bar (words,
  area, type and status selects, a two-thumbed price slider, beds, Reset, sort buttons) writes `?area=shoreditch`, and
  its cards read "For Sale · Shoreditch / Loft · 2 bed · 1 bath · 1,105 sq ft · price"; Realtora's page (title, line,
  a mosaic of one large and two photos, price, status, type, quick facts, an enquiry of name, phone and email beside
  the overview); Urbangrid's page (status and price beside the title, "What it comes with", a table of details).
  Differences from the RFC: choices are chips (as the RFC says) rather than Urbangrid's selects; a listing's page text,
  amenities and details are in listing-detail's content, not in `listing`; the agency example has no price slider, as
  a night's rent and a sale price do not share one scale. Next: RFC-0014 is complete; the next sector wave (hotels and
  travel, events, content, health) needs its own RFC.

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
