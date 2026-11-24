# RFC-0014 — Commerce and listings blocks: the second sector wave

| | |
|---|---|
| Status | Accepted (2026-11-24). Questions 1 to 8 settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-24 |
| Author | Dilane Kombou |
| Builds on | RFC-0013 (families, lists and their pages, references before building), RFC-0012 (chip, rating, number-field, lightbox), RFC-0009 (forms by message, `formChannel`, `messageUrl`), RFC-0008 (the block contract), ADR-0013, ADR-0014, the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `registry/blocks/` (new folders), `registry/block-categories.ts`, `packages/blocks` (field types, maybe a cart), `registry/placeholders/`, `apps/site` (block pages, two example pages) |
| Decision needed | — (questions 1 to 8 settled, see "Decisions") |

## Problem

RFC-0013 gave portfolios and SaaS sites their blocks. The survey's next two P1 groups have none:

- **Online shops**: a grid of products with filters and sort, a product's page with its pictures, variants and quantity,
  and a cart that hands off to a checkout. Jutsify's storefronts take orders by message today (`order-banner`,
  `menu-cards`); a shop with sizes and colours needs more.
- **Directories and real estate**: a search at the top of the page (what, where), filters on the side or above, cards
  with a photo, a price, a rating and a place, and a page per listing with an enquiry form.

The components are ready (`chip`, `rating`, `number-field`, `lightbox`, `sheet`, `slider`, `select`), and RFC-0013
settled how a list links to its pages. What is left are the questions only shops and listings raise: who holds a cart,
where an order goes, and how filters survive a reload or a shared link.

## Goals

1. **Seven blocks** in two lots: three for shops (`product-grid`, `product-detail`, `cart-drawer`) and four for
   listings (`search-hero`, `filter-bar`, `listing-cards`, `listing-detail`).
2. **No backend**: a cart lives in the browser, a checkout is handed off (a message, or an external URL), filters run
   on the page.
3. **References before building**, as RFC-0013 section 7: each block names the Framer demos to inspect, what to look
   at, and our touch.
4. **Two example pages**: a shop and a property directory, each with a list page and a page per item.

## Non-goals

- **Payments, stock, accounts, orders.** A shop hands off to Shopify, a payment link or WhatsApp; nothing here charges
  a card or stores an order.
- **Search on a server, maps with pins, availability calendars.** Filters run over the items in the page; a map is
  `location-map`'s drawn picture or an external link.
- **The other survey groups** (hotels and travel, events, content, health): later RFCs.

## Proposal

### 1. Families and categories

Proposed (question 1): two new families, as `portfolio` was in RFC-0013:

| Family | For | Categories (with their first blocks) |
|---|---|---|
| `commerce` | Online shops selling products with variants | `products` (`product-grid`), `product` (`product-detail`), `cart` (`cart-drawer`) |
| `listings` | Directories, real estate, rentals: things found by searching | `search` (`search-hero`, `filter-bar`), `listing` (`listing-cards`, `listing-detail`) |

Existing categories gain them where a block serves them: `hero`, `navbar`, `footer`, `contact`, `testimonials`, `faq`.

### 2. Field types

| Type | Fields |
|---|---|
| `product` | `title`, `price` (money), `was` (money, struck), `images` (1 to 8), `badge` ("New", "Bestseller"), `variants` (`{ name: "Size", options: ["S", "M"] }`, up to three), `rating` (`ratingSummary`), `summary`, `details` (plain paragraphs), `href`, `sku` |
| `listing` | `title`, `kind` ("Apartment", "Café"), `status` ("For sale", "To let"), `place` (area, city), `price` (money), `period` (`once`, `month`, `night`), `facts` (up to four `{ label, value }`: "3 beds", "120 m²"), `images`, `rating`, `tags`, `href` |
| `facet` | `key` (a field of the items), `label`, `kind` (`choice`: chips; `range`: a slider; `atLeast`: a number field), `options` (for `choice`) |
| `cartLine` | `sku`, `title`, `variant`, `price`, `quantity`, `image` (the cart's line, built from a `product`) |

### 3. The cart

Proposed (question 2): a small cart in `rasengan-blocks` (`useCart`), kept in the browser (`localStorage`, one key per
shop), shared by `product-detail` (adds a line) and `cart-drawer` (shows, changes, removes, totals). No server, no
account; the project can replace it with its own by passing `cart` and handlers. Totals use `formatMoney`.

### 4. The checkout

Proposed (question 3): the content names where an order goes:
- **`message`** (default, as RFC-0009): the cart becomes a written order (lines, quantities, total) sent through the
  shop's `formChannel` (WhatsApp, SMS, email); the customer sends it from their own app.
- **`url`**: a link to an external checkout (a Shopify cart permalink, a payment link) with the lines in the address
  when the provider takes them, or a plain link otherwise.
- **`onCheckout`**: the project's code takes the lines.

### 5. Filters and the address

Proposed (question 4): `filter-bar` writes the chosen filters into the page's address (`?area=akwa&beds=2`) and reads
them back after hydration, so a shortlist can be sent as a link (Urbangrid's promise, below). The prerendered page
shows every item; filtering happens in place, as in `projects-grid`. `facet`s are declared in the content (question 5),
so the bar knows which controls to draw.

### 6. The blocks

**Lot J, commerce (3 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `product-grid` | Products as cards (photo, second photo on hover, title, price and struck price, badge, rating), with category chips and a sort | chip, rating, badge |
| `product-detail` | A product's page: a gallery (thumbnails, full screen), title, price, rating, variants as chips, quantity, add to cart, delivery note, details | lightbox, chip, number-field, rating, button |
| `cart-drawer` | The cart in a sheet: lines with quantity and remove, subtotal, the checkout hand-off, an empty state | sheet, number-field, button |

**Lot K, listings (4 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `search-hero` | A heading over a photo and a search panel: what, category, where, and suggestions as chips | input, select, chip, button |
| `filter-bar` | Facets above or beside a list: choices, a price range, "at least" counts, a sort, a reset; in the address | chip, slider, number-field, select |
| `listing-cards` | Listings as cards: photo, status, kind and place, title, facts, price per period, rating | rating, badge |
| `listing-detail` | A listing's page: gallery, facts, price, description, and an enquiry form sent by message | lightbox, field, input, textarea, button |

### 7. Placeholders

Proposed (question 6): six product photos and six photos of homes and places, Unsplash License, ADR-0014's rules
(no brands on the products, no recognisable people), WebP in SVG, credited.

### 8. References: look before building

As RFC-0013 section 7: before a block is built, its references are inspected in a browser at a phone's width and at
1440px, and the "Observed" note goes in the lot's pull request. Checked on 2026-11-24. Marketplace pages are
`https://www.framer.com/marketplace/templates/<name>/`.

**Lot J, commerce**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `product-grid` | Dewly https://dewly.framer.website/shop · Scoop https://scoop-store.framer.website/shop · Luxevaro https://luxevaro.framer.website/shop | Dewly's category pills, its sort row (Featured, Lowest price, Highest price, Top rated) and the "Bestseller" and "New" badges on the cards; Scoop's sizes on the grid | Filters as `ChipGroup`, every product in the HTML; struck prices read as "was"; ratings as `Rating` |
| `product-detail` | Luxevaro https://luxevaro.framer.website/shop/arlo-side-table · Scoop https://scoop-store.framer.website/shop/ballet-flat · Dewly https://dewly.framer.website/shop/cloud-cream | Luxevaro's badge, title, line, price, description, colour swatch, quantity − 1 +, "Add to Bag" and "Add to Wishlist", the delivery note and highlights; Scoop's sizes; Dewly's rating and reviews | Variants as chips that say when one is sold out; the gallery in a `lightbox`; the quantity is a `number-field`; "added" announced |
| `cart-drawer` | Luxevaro https://luxevaro.framer.website/cart | Its lines (picture, name, colour, quantity stepper, price, "Remove item") and the order summary (subtotal, shipping at checkout, estimated total, "Buy now", "Continue shopping"). It is a page, and static in the demo: it does not show what was added | A real cart (question 2) in a `sheet`, with an empty state, totals with `formatMoney`, and the hand-off of question 3 |

**Lot K, listings**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `search-hero` | Listora https://listora.framer.website/explore · Urbangrid https://urbangrid.framer.website/properties | Listora's panel over a photo: "What are you looking for?", category, location and a full-width Search button; Urbangrid's search by name, street or postcode | A real form (GET to the list page), so it works without JavaScript; suggestions as chips |
| `filter-bar` | Urbangrid https://urbangrid.framer.website/properties · Listora https://listora.framer.website/explore | Urbangrid's area, type and status selects, a price range slider, beds, Reset, sort buttons, and "every set of filters has its own address"; Listora's side panel of checkboxes with counts (category, location, price level, rating "4.5 & up") | Facets from the content, filters in the address (question 4), counts on choices, keyboard throughout |
| `listing-cards` | Urbangrid https://urbangrid.framer.website/properties · Listora https://listora.framer.website/explore | Urbangrid's cards: "For Sale", photo, area and type, title, "2 bed · 1 bath · 1,105 sq ft", price; Listora's places with a rating | One card shape for homes and places: facts and period from the content |
| `listing-detail` | Realtora https://realtora.framer.website/property/maplewood-estates-boston-ma · Urbangrid https://urbangrid.framer.website/properties/blossom-street-penthouse | Realtora's title, line, price, status and type, quick facts, an enquiry form (name, phone, email), then the overview | The enquiry goes by message (RFC-0009) or `action`; the gallery in a `lightbox` |

## Options considered

- **Shops and listings as categories in `storefront`**: storefront is a local business's few pages; a shop of hundreds
  of products and a directory of listings are other audiences, and an agent should find them as such.
- **A cart on a server or in a third-party widget**: a dependency the project did not choose, and a backend this
  registry does not ship.
- **Filters only in memory** (as `projects-grid`): simpler, but a shortlist cannot be shared, which Urbangrid promises
  and directories need.
- **Checkout only by URL**: Jutsify's shops sell by WhatsApp first; a message is the default that works with no account.

## Risks and open questions

1. **Families**: `commerce` and `listings` (proposed), or categories inside `storefront`?
2. **The cart**: a small `useCart` in `rasengan-blocks` kept in `localStorage` (proposed), or controlled props only,
   the project holding the cart?
3. **The checkout**: by message by default, a URL or `onCheckout` otherwise (proposed), or a URL only?
4. **Filters and the address**: written in the query and read after hydration (proposed), or in memory only?
5. **Facets in the content** (`choice`, `range`, `atLeast`, proposed), or a fixed set per block?
6. **Placeholders**: six product and six home photos from Unsplash (proposed), or reuse what exists?
7. **`listing-detail` in this RFC** (the survey marks it P2; proposed, as the list needs a page to open), or later?
8. **Order of the lots**: J0 (families, field types, cart, placeholders), J (commerce), K (listings) (proposed), or
   listings first?

## Decisions

Settled by the maintainer on 2026-11-24:

| Question | Decision |
|---|---|
| 1. Families | **Two new families, `commerce` and `listings`**, with their own categories; existing categories gain them where a block serves them |
| 2. The cart | **A small `useCart` in `rasengan-blocks`**, kept in `localStorage` (one key per shop), shared by `product-detail` and `cart-drawer`; a project may pass its own cart and handlers instead |
| 3. The checkout | **By message by default** (the order written out and sent through the shop's `formChannel`), **or a `url`**, **or `onCheckout`** |
| 4. Filters and the address | **Written in the page's query and read back after hydration**, so a shortlist can be shared; the prerendered page shows every item |
| 5. Facets | **Declared in the content**: `choice` (chips), `range` (a slider), `atLeast` (a number field) |
| 6. Placeholders | **Six product photos and six photos of homes and places from Unsplash**, under ADR-0014's rules |
| 7. `listing-detail` | **In this RFC**, in lot K: the list needs a page to open |
| 8. Order of the lots | **J0, J (commerce), then K (listings)** |

## Plan

**Before every block**: inspect its references (section 8) and write the "Observed" note in the lot's pull request.

**Lot J0, foundations**: the families and categories, the field types, `useCart`, the placeholders, the example pages'
skeletons (`/examples/shop`, `/examples/homes`).

**Lot J, commerce**: the three blocks; `/examples/shop` with a page per product.

**Lot K, listings**: the four blocks; `/examples/homes` with a page per listing.

Each block passes the RFC-0008 quality gate (schema and example, server render, `pnpm axe` and `pnpm screenshots` in
every village, light and dark, at 360px and 1440px, the weight budget, intensity 1 and motion off, its page). Each lot
is one pull request, opened against `main`.
