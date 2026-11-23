# Survey — What Framer's templates show that the registry lacks

| | |
|---|---|
| Date | 2026-11-23 |
| Author | Dilane Kombou |
| Feeds | The RFCs that will split this work into sprints |

## Why

Jutsify wants a catalogue of starting sites, like Framer's template marketplace, built only from Rasengan UI. This
survey lists what Framer's templates use that the registry does not have yet: motion components (on Motion, the
`rasengan-motion` library), interface components and blocks. It is a list to pick from, not a plan: the RFCs decide
what is built, in which order and how.

## What was read

- The 50 categories of https://www.framer.com/marketplace/templates/ , the first page of each (40 to 60 templates per
  page). Pages 2 and later were not read.
- About 45 template pages and 22 live demo sites, spread over every group of categories: portfolio and creative,
  SaaS and tech, commerce and services, health, media and real estate, hospitality and events.
- Framer's component marketplace (effects, text, cursors, backgrounds, interactive), for motion.

Limits: reading a page gives its text, not its motion. Much of the motion below comes from the templates'
descriptions, not from watching them. Frequencies are those of the sample. The pins and pages are references for
*layouts and effects*: no component copies a design.

## What the registry already has

- **47 blocks** in two families (marketing, storefront): heroes (centered, split, photo, wordmark), navbar-simple,
  logos (marquee, grid), features (grid, alternating, bento), showcase-tabs, steps-scroll, stats-numbers,
  integrations-orbit, comparison-table, pricing (plans, comparison), testimonials (wall, carousel), reviews-rating,
  faq-accordion, cta (banner, app), newsletter-inline, contact (form, links), footers (columns, wordmark, local), team
  (grid, staff), about-story, galleries (grid, social), menus (cards, categories, list), services (list, pricelist),
  booking-form, hours-week, location (map, branches), offer-deal, order-banner.
- **55 components**: form controls, dialog, sheet, popover, tabs, accordion, carousel, table, calendar, date and time
  pickers, toast, navigation-menu, command…
- **Motion** ([RFC-0007](../rfc/0007-motion-components.md)): `rasengan-motion` (Reveal, Stagger, Presence, Parallax,
  Tilt, Magnetic, splitText) and text-reveal, scramble-text, typewriter, number-roll, marquee, cursor,
  page-transition, gallery-3d, Button's rolling and hold variants.

Good enough for a local storefront and a SaaS landing page. The gaps are in four areas: **content in lists** (blog,
projects, listings), **online shops**, **sector sections** (hotel, travel, events, weddings) and **scroll effects**.

## Priorities

- **P1**: seen in a large share of the templates, or needed by a whole group of categories.
- **P2**: seen often in one or two groups.
- **P3**: the mark of a high-end template; after the rest.

## 1. Motion

| Prio | Component | What it does | Seen in |
|---|---|---|---|
| P1 | `scroll-stack` | Cards that stick to the top and stack, receding, as the page scrolls | Portfolio, weddings, SaaS |
| P1 | `horizontal-scroll` | A pinned section that moves sideways while the page scrolls down | Portfolio (galleries, services), sports |
| P1 | `sticky-scroll` | A pinned list whose active item follows the scroll, a visual beside it; the primitive under `steps-scroll` | SaaS features, wedding story |
| P1 | `text-scroll-fill` | A statement that fills word by word with the scroll (not on view, as `text-reveal` does) | Travel, sports, portfolio |
| P1 | `image-reveal` | An image revealed through a mask (`clip-path`): curtain, blinds, circle, with a slight zoom | Portfolio and hotel heroes |
| P1 | `scroll-progress` | A reading progress bar at the top of the page | Blog, case study |
| P1 | `text-rotate` | One word that cycles inside a sentence (slide, fade, slot machine) | SaaS and agency heroes |
| P2 | `scroll-zoom` | An image or a video that grows to full screen as the page scrolls | Hotel, travel and SaaS heroes |
| P2 | `video-scrub` | A video (or an image sequence) whose time follows the scroll | Weddings, products |
| P2 | `hover-image-list` | A list of projects or services: the row's image follows the cursor on hover | Portfolio, agency |
| P2 | `image-trail` | A trail of images behind the cursor | Portfolio, travel, contact pages |
| P2 | `spotlight-card` | A card with a glow that follows the cursor, border included | SaaS, AI |
| P2 | `shiny-text` | A sheen that sweeps over a text or a button | SaaS, AI |
| P2 | `preloader` | An intro once per visit: a counter, a logo, a curtain that opens | Portfolio, fashion, hotels |
| P2 | `curtain-footer` | The footer is uncovered by the page sliding up | Restaurants, agencies |
| P2 | `overlay-menu` | A full-screen animated menu (links in cascade, curtain) | Portfolio, agencies |
| P2 | `background-gradient` | An animated gradient (mesh, aurora), still with motion off | SaaS, AI, wellness |
| P2 | `background-pattern` | An animated grid, dots or grain behind a hero | SaaS, events |
| P2 | `drag-carousel` | A carousel dragged by hand, with inertia, a 01/11 counter and an endless loop | Photography, travel, restaurants |
| P3 | `flip-card` | A card that turns over on hover or click | Team, services |
| P3 | `hover-mask` | Hovering uncovers another image or text under a round mask | Portfolio |
| P3 | `split-flap` | A railway-style flap board for results or times | Sports, events |
| P3 | `physics-pile` | Tags or stickers that can be thrown and piled | Agencies, studios |
| P3 | `background-particles` | Particles, stars, beams | AI, crypto |
| P3 | `live-dot` | A dot that pulses beside "Live" or "Available"; a Badge variant | Directories, portfolios |

Notes:
- Smooth scrolling (Lenis-like) comes up often in the descriptions. It does not depend on Motion; a choice for an RFC,
  for its weight and its accessibility.
- Shader backgrounds (WebGL) are common on Framer but heavy: outside the motion collection, to be decided apart.
- Every effect follows `rasengan-motion`'s modes (ready, final, off) and `prefers-reduced-motion`.

## 2. Interface components

| Prio | Component | What it does | Seen in |
|---|---|---|---|
| P1 | `number-field` | A − / + field for a quantity or a number of guests (on RFC-0004's later list) | Booking, cart |
| P1 | `rating` | Stars, read-only (4.9 out of 5) and as an input | Listings, reviews, hotels |
| P1 | `chip` | A tag that can be removed (active filters) or picked (popular searches, time slots) | Directories, real estate, booking |
| P1 | `video` | A video player, and its version in a dialog ("Watch the demo") | SaaS, hotels, weddings |
| P1 | `lightbox` | A full-screen image viewer with arrows and swipe; reusable outside `gallery-grid` | Photography, real estate, products |
| P1 | `announcement-bar` | A band at the top of the page, dismissible or scrolling | Commerce, SaaS |
| P2 | `audio-player` | Play, progress, duration; an episode row | Podcasts, music |
| P2 | `compare-slider` | Before / after with a handle to drag (lot F names `gallery-before-after`) | Construction, beauty, fitness |
| P2 | `countdown` | A countdown to a date (today inside `offer-deal`) | Events, weddings, launches |
| P2 | `toc` | A table of contents that follows the scroll | Articles, case studies, docs |
| P2 | `share-buttons` | Share and copy the link | Articles |
| P2 | `device-frame` | A phone, browser or laptop frame around a screenshot | SaaS, apps |
| P2 | `theme-toggle` | Light / dark switch | SaaS, travel |
| P2 | `stepper` | A form in several steps, with its sending, success and error states | Quotes, booking, sign-up |
| P3 | `language-switch` | Picks the language | Travel, hotels |
| P3 | `masonry` | A grid of uneven heights | Photography, testimonials |
| P3 | `calculator` | A frame for a calculation (mortgage, pace); an example more than a component | Real estate, sports |

## 3. Blocks, by group of templates

Blocks already named in RFC-0009's lot F are marked *(lot F)*.

### On every kind of site (P1)

- `navbar-mega`: a navbar with link panels (on `navigation-menu`); `navbar-floating` *(lot F)*.
- `hero-video`: a full-screen background video; `hero-fullbleed` *(lot F)*.
- `hero-product`: a product or dashboard screenshot under the heading, in a `device-frame`.
- `hero-carousel`: a full-screen slideshow hero.
- `process-steps`: numbered steps without a pinned scroll (01, 02, 03); `steps-path` *(lot F)*.
- `testimonials-marquee`: columns of quotes that scroll.
- `press-logos`: "As seen in" and awards.
- Utility pages: 404, legal (terms, privacy), thank you, coming soon.

### Portfolio, agency, creative

- P1 `projects-grid`: projects filtered by kind, with a count per filter and a hover.
- P1 `case-study`: context, problem, approach, results in numbers, gallery, next project.
- P2 `projects-list`: projects as rows with the image on hover (`hover-image-list`).
- P2 `gallery-horizontal`: a pinned gallery that moves sideways.
- P2 `awards-list`: awards as a table (year, award, project).
- P2 `experience-timeline`: career and CV.

### SaaS, AI, apps, fintech

- P1 `changelog`: dated release notes (Added, Improved, Fixed) and one release's page.
- P1 `waitlist`: a waitlist sign-up with its states.
- P2 `customer-stories`: customer cards with a key number.
- P2 `security-badges`: SOC 2, GDPR, encryption, uptime.
- P2 `integrations-grid`: a filterable logo grid, a page per integration (`integrations-orbit` exists).
- P2 `careers`: open positions by team.
- P3 `cta-demo`: a demo request with a form.

### Blog, media, podcasts

- P1 `blog-grid`: article cards (category, author, reading time), filtered by category.
- P1 `article`: an article's layout (`toc`, `scroll-progress`, `share-buttons`, the author at the end).
- P2 `blog-featured`: one featured article and a list beside it.
- P2 `author-bio`: the author, a portrait and their articles.
- P2 `podcast-episodes`: episodes with duration, playback (`audio-player`) and links to the platforms.

### Online shops

- P1 `product-grid`: products with filters and sort; a card with a second image on hover and a struck price.
- P1 `product-detail`: gallery, variants (size, colour), quantity (`number-field`), add to cart.
- P1 `cart-drawer`: the cart in a `sheet`, handing off to an external checkout.
- P2 `collection-banner`: a collection's banner.
- P2 `gift-cards`: fixed amounts and a free amount.

### Directories, real estate

- P1 `search-hero`: a search (what, where) with suggestions as `chip`s.
- P1 `filter-bar`: faceted filters, the active ones as `chip`s.
- P1 `listing-cards`: listings (photo, rating, price, city, tag).
- P2 `listing-detail`: gallery, specs, map, the agent's contact.
- P2 `agent-profiles`: agents or advisers (close to `team-grid`).

### Hotels, travel, restaurants

- P1 `rooms`: rooms (guests, m², view, "from … / night") and a room's page.
- P1 `reservation-widget`: date, slot and party size (`chip`, `number-field`), handing off to an external service or
  to `booking-form`.
- P2 `trips`: tours (length, level, price) and a tour's page with `itinerary` (day by day, what is included).
- P2 `trip-finder`: search by destination and travel style.
- P2 `private-events`: private hire, with the rooms and an enquiry form.

### Events, conferences, weddings, music

- P1 `agenda`: the programme by day in tabs, each session with time, kind and speaker.
- P1 `speakers`: a grid of speakers.
- P1 `tickets`: ticket tiers, with an on-site / online switch.
- P2 `sponsors`: partners by tier.
- P2 `rsvp`: an answer to an invitation (attendance, party size, message), on `stepper`.
- P2 `wedding-story`: the couple's story as a timeline, the day's schedule, the dress code.
- P2 `tour-dates`: concert dates with city, venue and a ticket link.
- P3 `tracklist`: tracks and albums, with `audio-player`.

### Health, sports, wellness

- P1 `schedule`: the week's classes by day (time, class, coach, places left).
- P2 `practitioner`: a practitioner, their specialties as tags and a booking button.
- P2 `results`: before / after transformations with numbers (`compare-slider`).
- P3 `insurance`: the insurers and payment methods accepted.

## 4. What Framer does besides components

- **"Agent" templates** ship skills and a "design system" page their agent reads before editing the site. For
  Rasengan UI, that is each block's `useWhen` and schema, and the MCP server, made readable per template.
- **Content in lists** (projects, articles, listings, rooms) comes from Framer's CMS, with a page per item. Many blocks
  above take a list and link to a detail page: the shape of a "collection" and of a detail page is a question for an
  RFC (blocks are sections today, not pages).
- **Payments** go through external services (Shopify for shops, Resy for tables). Commerce and booking blocks hand off
  to an external service, as `newsletter-inline` posts to its provider.
- **Families**: the registry has two (marketing, storefront). Portfolio, content, commerce, hospitality and events
  would be new families, or new categories inside the two: a question for the first blocks RFC.

## Size

About 25 motion components, 17 interface components and 55 blocks, of which 7, 6 and about 30 are P1.
