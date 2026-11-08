# RFC-0009 — Blocks, second wave: the sections pages keep asking for

| | |
|---|---|
| Status | Accepted (2026-11-08). Open questions settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-08 |
| Author | Dilane Kombou |
| Builds on | RFC-0008 (blocks: contract, rules, quality gate, lots A to C), ADR-0013 (blocks answer their container), RFC-0005 (date and time pickers), RFC-0007 (motion components) |
| Packages | `registry/blocks/` (new folders), `registry/block-categories.ts`, `packages/blocks` (new field types, `BlockMeta.family` as an array), `registry/placeholders/`, `scripts/registry.mjs`, `apps/site` (block pages, example pages) |
| Decision needed | — |

## Problem

RFC-0008 gives each category one layout, and lot C adds six showcase blocks. That is enough for one landing page and
one restaurant, but not for the next ten: a survey of what designers publish (below, "The survey") shows layouts
that come back again and again and that we do not have, and whole sections we have no category for.

- **Storefronts** (Jutsify's sites) lack what restaurants and salons show on almost every page: a **booking form**,
  **dish cards with prices**, an elegant **price list**, the **staff**, a **rating summary with reviews**, an
  **Instagram-style grid**, **several branches**, a **deal of the day**.
- **Landing pages** lack the most common hero of all (**text beside a photo**), the **giant wordmark** heroes and
  footers, **alternating feature rows**, a **wall of testimonials**, an **"us vs them" table**, an
  **integrations** section, a **contact form**.
- **The category list has holes**: lot C plans `team-grid`, but `registry/block-categories.ts` has no `team`
  category; `contact` exists only for storefronts.

### The survey

On 2026-11-08, 22 Pinterest searches (about 400 pins, read as thumbnails) on landing page sections and on restaurant,
café, bakery, salon, barber and spa websites. The pins are references for *layouts*: no block copies a design it was
inspired by, and none reproduces a brand, a photo or a text from them.

| Category | Layouts that recur | We have (RFC-0008) |
|---|---|---|
| Navbar | Simple bar; floating centred pill | `navbar-simple` |
| Hero | Text beside a portrait or photo, with floating stat chips (the most frequent); a giant display word behind or under the subject; headline amid floating cards; headline over a full-bleed photo; phone in the centre; search field in the hero | `hero-centered`, `hero-photo` |
| Logos | Endless strip; static bordered grid | `logos-marquee` |
| Features | Icon grid; alternating image and text rows; numbered "why choose us" cards | `features-grid` |
| Bento, steps, showcase | Bento of stats and photos; curved path with three nodes; vertical zigzag timeline; tabs with a screenshot; a flow diagram (inputs, engine, outputs) | lot C: `bento-features`, `steps-scroll`, `showcase-tabs` |
| Problem | "The way we work is chaotic": scattered icons that converge (one of "12 sections every SaaS page needs") | — |
| Comparison | "Us vs them" table with our column highlighted; face to face with a VS badge | — |
| Integrations | Tool icons orbiting a central logo; icon grid | — |
| Testimonials | Cards carousel; masonry wall of quotes; one large quote and a portrait; a row of faces ("trusted by 15k+") | `testimonials-carousel` |
| Pricing | Plans with a monthly/yearly switch; feature matrix; a single lifetime plan; a seat slider | `pricing-plans`, lot C: `pricing-comparison` |
| FAQ | Title beside the accordion; category tabs; a "still have questions?" card | `faq-accordion` |
| CTA | Framed band; app download (store badges and a phone); an arc of faces | `cta-banner` |
| Team | Portrait grid; dark portraits; arc carousel | lot C: `team-grid` |
| Footer | Link columns; **the brand name set huge at the bottom** (very frequent); a CTA card above the columns | `footer-columns` |
| Contact | Form beside a map or info cards | `contact-links` (storefront) |
| Storefront hero | Large photo and facts; giant word with a cut-out dish; round plate with an order button and a rating; dark full-bleed room with a book button | `hero-photo` |
| Menu | Tabs by category; **dish cards with photo, price and a button** (very frequent); two-column list with dotted leaders, no photos, often dark; round category chips | `menu-categories` |
| Services | List with duration and price; **editorial price list grouped by kind** (salons, spas); packages | `services-list` |
| Booking | **Date, time, party size or service, beside a photo** (restaurants and salons alike) | — |
| Staff | "Our barbers / stylists": photo, specialty, book button | — |
| Gallery | Grid with a lightbox; **3×3 Instagram-style grid with the handle and a follow link**; before and after | `gallery-grid` |
| Hours, location | The week with today highlighted; **one card per branch** with a small map and its hours; store locator | `hours-week`, `location-map` |
| Ordering | Band with WhatsApp and phone; **deal of the day with a countdown**, combos; product grid with a cart | `order-banner` |
| Reviews | **Rating summary (4.8, 320 reviews) and starred reviews** | — |
| About | Owner's story; values as icons and a few figures | `about-story` |
| Footer (local) | Hours, address and social links in the footer | — |

## Goals

1. Fill the gaps the survey shows, first where Jutsify's storefronts need them, then for landing pages.
2. Add the missing categories so every block, lot C's included, has one.
3. Give forms (booking, contact) a way to work with no backend, as `order-banner` does.
4. Keep every RFC-0008 rule and its quality gate: content objects, contract names only, motion through the motion
   components, every village, light and dark, 360px and 1440px.

## Non-goals

- **A cart or a checkout.** Ordering stays a message to the business (WhatsApp, phone); a product grid with a cart is
  an app, not a section.
- **Live third-party data**: no Google reviews, Instagram feed or map tiles fetched by a block. Reviews and photos are
  content the project owns (RFC-0008, "Non-goals": no remote content).
- **A backend for forms.** A block never stores or sends what a visitor types; it hands it to the channel the project
  chose.
- **Copying the designs surveyed.** They tell us which layouts people expect, nothing more.
- **Rich layout props** on existing blocks (`variant="split"`): RFC-0008 chose distinct blocks with clear names.

## Proposal

### 1. New categories

Added to `registry/block-categories.ts`, in the site's order:

| Category | Title | Families | First blocks |
|---|---|---|---|
| `team` | Team | marketing, storefront | `team-grid` (lot C), `team-staff` |
| `booking` | Booking | storefront | `booking-form` |
| `offers` | Offers | storefront | `offer-deal` |
| `comparison` | Comparison | marketing | `comparison-table` |
| `integrations` | Integrations | marketing | `integrations-orbit` |
| `problem` | Problem | marketing | `problem-scatter` (lot F, added with it) |

`contact` gains the marketing family (for `contact-form`). Reviews go in `testimonials`, which already has both
families. A category is added in the same commit as its first block.

### 2. Blocks for both families

Some layouts serve both: `hero-wordmark`, `hero-fullbleed`, `contact-form`, `team-*`. `BlockMeta.family` is one family
today, and `pnpm registry` checks it against the category. Proposal: `family` also accepts a non-empty array
(`family: ["marketing", "storefront"]`); the registry checks each against the category, the site lists the block under
both, and `list_components` matches either. A block in both families is written for both (its example uses one of
them, its `useWhen` says when each fits). Settled, see "Decisions" (question 1).

### 3. New field types in `rasengan-blocks`

So an agent learns them once, as RFC-0008 did:

| Type | Fields |
|---|---|
| `review` | `author`, `rating` (1 to 5), `text`, `date`, `source` (a label such as "Google", never a logo) |
| `ratingSummary` | `score`, `count`, `source`, `href` |
| `staffMember` | `name`, `role`, `image`, `specialties`, `cta` |
| `branch` | `name`, `address`, `openingHours`, `phone`, `image` (a static map or a photo) |
| `offer` | `title`, `description`, `price`, `was` (money), `endsAt` (ISO date-time, optional), `cta` |
| `comparisonRow` | `label`, `ours` and `theirs` (a boolean or a short string) |
| `integration` | `name`, `logo`, `category` |
| `formChannel` | `kind` (`whatsapp`, `sms`, `email`), `to` |

### 4. Forms without a backend

`booking-form` and `contact-form` gather fields with Field, Input, Select, Textarea, DatePicker and TimePicker
(RFC-0005), validate them in the browser, then:

1. **By default**, compose a plain message from the fields and open the business's channel from the content
   (`formChannel`): a `wa.me` link with the text, `sms:` or `mailto:`, as `order-banner` does. The visitor sees the
   message in their own app and sends it themselves.
2. **With `action`** (a behaviour prop, allowed by RFC-0008 rule 2), post the fields to the project's own endpoint as
   a normal form.
3. **With `onSubmit`**, hand the values to the project's code.

The booking form knows the business: its services come from `service`, its days and times from `openingHours`
(closed days disabled, slots inside opening hours), its party size from a range in the content. No availability
checking: that needs a backend (question 3).

### 5. The blocks

Named `<category>-<layout>` like RFC-0008's; each line is its `summary` in short, and the components it uses.

**Lot D, storefront second wave (10 blocks, for Jutsify)**

| Block | What it is | Uses |
|---|---|---|
| `booking-form` | Date, time, party size or service and a name beside a photo; sends through WhatsApp, SMS, email or `action` | field, input, select, date-picker, time-picker, button |
| `menu-cards` | Signature dishes as cards: photo, name, tags, price; each with an order link (a WhatsApp message naming the dish) | card, badge, button |
| `menu-list` | The whole menu as an elegant two-column list with dotted leaders, by category, no photos | separator |
| `services-pricelist` | A salon's or spa's prices grouped by kind (hair, nails, care), each with duration and price, beside one photo | separator, badge |
| `team-staff` | The people who serve you: photo, role, specialties, a book link each | card, avatar, button |
| `reviews-rating` | A rating summary (score, stars, count, source) beside three to nine starred reviews | card, carousel (below a width) |
| `gallery-social` | A 3×3 grid of the project's own photos with the account's handle and a follow link | dialog (lightbox) |
| `location-branches` | One card per branch: name, address, today's hours and open-now, phone, directions | card, badge, button |
| `offer-deal` | The deal of the day or a combo: price and former price, what it includes, an optional countdown to `endsAt` | number-roll, badge, button |
| `footer-local` | The business's name, address, today's hours, phone and social links, and the copyright | separator |

**Lot E, marketing second wave (10 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `hero-split` | Headline, subcopy and two actions beside a photo, with up to three stat chips over its corner | button, badge, text-reveal |
| `hero-wordmark` | The brand or a single word set across the full width behind or under a photo, a line of copy and an action (both families) | text-reveal, button |
| `features-alternating` | Two to five features as rows, image and text swapping sides | button |
| `testimonials-wall` | Six to eighteen quotes in a masonry wall; at intensity 2, columns drift slowly | card, avatar, marquee |
| `comparison-table` | "Us vs them": rows of what matters, our column highlighted, checks and crosses with text alternatives | table, badge |
| `integrations-orbit` | Integration logos on two rings around the product's logo, the list below for screen readers and small widths | — |
| `cta-app` | Get the app: headline, store badges (links with their own labels), a phone showing a product shot | button |
| `footer-wordmark` | `footer-columns` with the brand name set huge along the bottom edge | separator, text-reveal |
| `logos-grid` | Customer logos in a bordered grid, still | — |
| `contact-form` | Name, email, message and a topic, beside contact details or a map; sends like the booking form (both families) | field, input, select, textarea, button |

**Lot F, later (named, not committed)**: picked by demand once D and E are out. `navbar-floating`, `hero-collage`,
`hero-fullbleed` (both families), `hero-dish`, `menu-chips`, `services-packages`, `gallery-before-after` (slider),
`about-values`, `problem-scatter`, `steps-path`, `showcase-flow`, `testimonial-single`, `testimonials-avatars`,
`pricing-single`, `pricing-slider` (slider, number-roll), `faq-tabs`, `cta-faces`.

### 6. Design notes

- **Giant wordmarks** (`hero-wordmark`, `footer-wordmark`) size the word to the block's width with container query
  units (`cqi`, ADR-0013), in `font-display`, on one line while it fits; below a minimum size it wraps to a second
  line (question 7, "Decisions"). The word is decorative when the heading is elsewhere (`aria-hidden`), or is the heading itself.
- **Countdowns** (`offer-deal`) render the end date as text on the server and start ticking after mount (RFC-0008 rule
  6); with motion off, the numbers change without rolling; past `endsAt`, the block shows its `expired` line.
- **Orbits** (`integrations-orbit`) turn with the Web Animations API, stop on hover and with motion off, and are a
  plain list below the `@md` width and for assistive technology.
- **Ratings** are drawn with Lucide stars and always written out ("4.8 out of 5, 320 reviews"). `source` is a label:
  no third-party logo, nothing that suggests the reviews were fetched or verified.
- **Order and book links** in `menu-cards`, `team-staff` and `offer-deal` reuse the channel from the content, so a
  storefront sets its WhatsApp number once per block.

### 7. Placeholders

Lot B's placeholders are dishes, rooms and a map. These blocks also need **people** (`hero-split`, `team-staff`,
`reviews-rating`, `testimonials-wall`) and **brand-neutral logos** (`integrations-orbit`, `logos-grid`). `cta-app`'s store
badges are text links, not the stores' logos. Settled (question 4, "Decisions"): open-licence photos for people,
abstract geometric marks with invented names for logos.

## Options considered

- **Add these lots to RFC-0008**: it is accepted and frozen; new categories and a change to `BlockMeta` need their own
  decision.
- **Layout variants on the existing blocks** (`hero-centered` with `layout="split"`): rejected by RFC-0008 for muddy
  schemas and previews; it holds here.
- **A booking or contact backend** (an endpoint, a third-party form service): a block would depend on a service the
  project did not choose and would handle visitors' data; the message hand-off keeps the project in charge.
- **Live reviews and Instagram feeds**: API keys, remote content and rate limits in a section; the project can feed
  the content from its own build step if it wants.
- **Keeping one family per block and duplicating shared ones** (`hero-wordmark` and `storefront-hero-wordmark`): two
  copies to keep in step for the same code.

## Risks and open questions

1. ~~**Shared blocks**~~: settled, see "Decisions".
2. ~~**Forms by message**~~: settled, see "Decisions".
3. ~~**Booking availability**~~: settled, see "Decisions".
4. ~~**Placeholder people and logos**~~: settled, see "Decisions".
5. ~~**Order of the lots**~~: settled, see "Decisions".
6. ~~**Weight**~~: settled, see "Decisions".
7. ~~**Wordmark legibility**~~: settled, see "Decisions".

## Decisions

Settled by the maintainer on 2026-11-08:

| Question | Decision |
|---|---|
| 1. Shared blocks (2026-11-08) | **`family` accepts one family or a non-empty array** (`family: ["marketing", "storefront"]`). `BlockMeta`, the registry check (each family against the category), `blocks.json`, the MCP `family` filter (matches any) and the site's grouping (listed under each) follow, in lot D0. A one-family block keeps writing a string |
| 2. Forms by message (2026-11-08) | **By default, `booking-form` and `contact-form` send by message**: they compose the text and open the content's `formChannel` (WhatsApp, SMS or email), and the visitor sends it from their own app. `action` (post to the project's endpoint) and `onSubmit` stay optional |
| 3. Booking availability (2026-11-08) | **Opening hours only**: the form offers every slot inside `openingHours` (closed days disabled) and knows nothing of bookings; the business confirms or proposes another time in its reply. No list of unavailable slots in the content |
| 4. Placeholder people and logos (2026-11-08) | **Open-licence photos for people**, shipped in `registry/placeholders/` like the others (never loaded from a remote host): only licences that allow redistribution in the registry (CC0 or equivalent), each file's source, author and licence recorded next to it, resized and compressed (WebP) to keep the placeholder set light. **Logos stay drawn**: abstract geometric marks with invented names, since a photo cannot stand in for a logo and real brands are out |
| 5. Order of the lots (2026-11-08) | **Lot D0 and lot D before RFC-0008's lot C**: Jutsify's storefronts need lot D first. Lot C follows, and its `team-grid` uses the `team` category lot D0 adds. Lot E comes after lot C |
| 6. Weight (2026-11-08) | **RFC-0008's budget, unchanged: the block's own code only** (6 kB gzip, 12 kB for showcase blocks). The components a block uses, such as the date and time pickers and react-day-picker in `booking-form`, are not counted, and no cap on the total is added |
| 7. Wordmark legibility (2026-11-08) | **Two lines allowed**: the word is sized to fill the block's width on one line, down to a minimum size that keeps it legible at 360px; a longer word wraps to a second line at that size, never a third. The schema still caps the length (about 24 characters) so two lines are enough |

## Plan

Order: lot D0, lot D, then RFC-0008's lot C, then lot E, then lot F.

**Lot D0, foundations**: the new categories (`team`, `booking`, `offers`, `comparison`, `integrations`; `contact` for
marketing), the new field types, `family` as an array (registry check, `blocks.json`, MCP
filter, the site's grouping), the placeholder portraits and logos. Done when lot C's `team-grid` can name its category
and a test block in both families shows under both on the site and in `list_components`.

**Lot D, storefront second wave**: the ten blocks above, and the restaurant example page grows a booking section, the
menu cards and the reviews; a salon example page (`/examples/salon`) built from `hero-split` or `hero-photo`,
`services-pricelist`, `team-staff`, `booking-form`, `reviews-rating`, `gallery-social`, `location-branches`,
`footer-local`.

**Lot E, marketing second wave**: the ten blocks above, and a second landing example (a SaaS page) built from
`hero-split`, `logos-grid`, `features-alternating`, `integrations-orbit`, `comparison-table`, `testimonials-wall`,
`pricing-plans`, `faq-accordion`, `cta-app` and `footer-wordmark`.

**Lot F**: one block at a time, when a page needs it.

Each block passes RFC-0008's quality gate (schema and example, server render, `pnpm axe` and `pnpm screenshots` in
every village, light and dark, at 360px and 1440px, weight budget, intensity 1 and motion off, its page with the
schema table).
