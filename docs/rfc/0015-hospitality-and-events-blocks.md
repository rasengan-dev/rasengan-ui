# RFC-0015 — Hospitality and events blocks: the third sector wave

| | |
|---|---|
| Status | Draft |
| Date | 2026-11-25 |
| Author | Dilane Kombou |
| Builds on | RFC-0014 (enquiries and checkout by message, filters in the address), RFC-0013 (families, lists and their pages, references before building), RFC-0012 (chip, number-field, lightbox, video), RFC-0009 (forms by message, `formChannel`, `messageUrl`, `booking-form`), RFC-0008 (the block contract), RFC-0005 (`DateRangePicker`), ADR-0013, ADR-0014, the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `registry/blocks/` (new folders), `registry/block-categories.ts`, `packages/blocks` (field types), `registry/components/countdown` (new), `registry/placeholders/`, `apps/site` (block pages, example pages) |
| Decision needed | Questions 1 to 9 |

## Problem

RFC-0013 and RFC-0014 covered portfolios, SaaS sites, shops and directories. Two groups of the survey are still
without blocks, and both are close to what Jutsify sells to local businesses:

- **Hotels, guesthouses and travel agencies**: rooms with their size, guests and price per night, a page per room, a
  way to ask for dates; tours with their length, group size and price per person, and a page per tour with its days.
  Today a guesthouse has `booking-form` (a table or an appointment) and `listing-cards` (a home to rent), neither of
  which says "2 guests · 54 m² · from €560 a night" or asks for a check-in and a check-out.
- **Events, conferences and weddings**: the date and the place with a countdown, the programme, the speakers, the
  tickets, the sponsors; for a wedding, the couple's story, the day's schedule and an RSVP. None of these exist.

Most components are ready (`DateRangePicker`, `number-field`, `chip`, `lightbox`, `tabs`, `avatar`, `dialog`,
`accordion`). One is missing: a **countdown**, which every event hero shows and `offer-deal` writes by hand.

Since CLI 0.4.1 the MCP `family` filter reads the families from the registry: new families need no CLI release.

## Goals

1. **Thirteen blocks** in two lots: six for hospitality (`rooms-grid`, `room-detail`, `booking-stay`, `trips-grid`,
   `trip-detail`, `private-events`) and seven for events (`hero-event`, `agenda`, `speakers-grid`, `tickets`,
   `sponsors-tiers`, `rsvp`, `story-timeline`).
2. **One new component**, `countdown`, in the foundations lot; `offer-deal` moves onto it with the same schema.
3. **No backend**, as RFC-0014: a stay request, a tour booking and an RSVP are sent by message, to a URL, or to the
   project's code; tickets link to the ticketing service.
4. **References before building**, as RFC-0013 section 7: each block names the Framer demos to inspect (section 8).
5. **Example pages**: a hotel (with a page per room), a tour operator (with a page per tour), a conference and a
   wedding (question 8).

## Non-goals

- **Availability, prices by date, payment.** A hotel's booking engine (Booking.com, Cloudbeds, Mews) or a ticketing
  service (Eventbrite, Tito, Weezevent) does that; our blocks hand off to it.
- **Seat maps, a personal agenda, logins, a check-in app.** An event site is pages, not an app.
- **Live data**: the agenda does not move with the clock, the tickets' "few left" comes from the content.
- **Blog, media, podcasts, health and sports**: later RFCs (the survey's last two groups).
- **`trip-finder`, `tour-dates`, `tracklist`** (survey P2 and P3): added to RFC-0009's lot F list, picked by demand.

## Proposal

### 1. Families and categories

Proposed (question 1): two new families, as in RFC-0013 and RFC-0014.

| Family | For | Categories (with their first blocks) |
|---|---|---|
| `hospitality` | Hotels, guesthouses, rentals by the night, tour operators and travel agencies | `rooms` (`rooms-grid`, `room-detail`), `trips` (`trips-grid`, `trip-detail`), `venue` (`private-events`); `booking` gains it (`booking-stay`) |
| `events` | Conferences, meetups, festivals, weddings and private celebrations | `agenda` (`agenda`), `speakers` (`speakers-grid`), `tickets` (`tickets`), `sponsors` (`sponsors-tiers`), `rsvp` (`rsvp`), `story` (`story-timeline`); `hero` gains it (`hero-event`) |

Existing categories gain them where a block serves them: `navbar`, `hero`, `gallery`, `testimonials`, `faq`,
`location`, `contact`, `footer`, and `offers` for hospitality (Hotellia's "Spring sale" is `offer-deal`).

Travel sits in `hospitality` rather than a family of its own: a tour operator's site and a hotel's share their
sections (photos, stays, reviews, a request by message), and two blocks would make a thin family.

### 2. Field types

| Type | Fields |
|---|---|
| `room` | `title`, `summary`, `guests` (number), `size` (m², number), `facts` (up to four `{ label, value }`: "King bed", "Mountain view"), `price` (money), `period` (`night`, `week`), `images` (1 to 8), `highlights` (up to four `{ title, text }`), `amenities` (groups `{ title, items }`), `href` |
| `trip` | `title`, `style` ("Adventure", "Culture"), `place`, `days` (number), `groupSize` (number), `level` ("Easy", "Moderate"), `price` (money, per person), `images`, `summary`, `highlights` (strings), `itinerary` (`itineraryDay[]`), `included`, `excluded` (strings), `facts` (`{ label, value }`: "Meeting point", "Best time"), `departures` (a line: "Weekly, Nov to Mar"), `href` |
| `itineraryDay` | `from` (day number), `to` (optional, for "Day 4 to 6"), `title`, `text` |
| `session` | `start`, `end` (local times, "09:30"), `title`, `kind` ("Keynote", "Panel", "Workshop", "Break"), `text`, `speakers` (names, matched against the speakers' list), `place` (a stage, a room or a track) |
| `eventDay` | `date` (ISO), `label` ("Day 1", "Main conference"), `place` (optional), `sessions` (`session[]`) |
| `speaker` | `name`, `role`, `organisation`, `photo` (image), `bio` (plain paragraphs), `links` (`contactLink[]`), `day` (optional label) |
| `ticket` | `name`, `price` (money), `was` (money, struck: "early bird"), `unit` ("per person", "per night", "5 people"), `features` (strings), `status` (`on-sale`, `few-left`, `sold-out`, `soon`), `badge`, `href` |
| `storyEntry` | `date` (ISO or free text), `title`, `text`, `image` (optional) |

`money`, `image`, `logo`, `contactLink`, `formChannel`, `ratingSummary`, `stat` and `cta` are unchanged.

Rooms are not `listing`s (question 2): a room has guests, a size and amenities by group, and is never filtered by
price slider or status; `listing` stays for homes and places found by searching.

### 3. The countdown

Proposed (question 3): a small component, `countdown`, in the foundations lot, as `device-frame` was in RFC-0013 lot
I. It takes a date (ISO, with its time zone) and shows days, hours, minutes and seconds, or fewer units (`units`);
it renders the server's value without seconds, then ticks in the browser; it says so to screen readers once a minute
at most (`aria-live="off"` on the digits, a visually hidden sentence updated each minute); under reduced motion and
`final`, the digits change without rolling. When the date has passed it shows `endedText` (Weddingly shows
"Countdown finished!"). Digits roll with `number-roll` at intensity 2 and more. `offer-deal`'s timer moves onto it,
same schema.

### 4. Requests: stays, tours and RSVPs

As RFC-0009 and RFC-0014: no server. Proposed (question 4):

- **`booking-stay`** asks for a check-in and a check-out (`DateRangePicker`), adults and children (`number-field`),
  a room (from the rooms in the content) and a name, a phone and a note; then either:
  - **`message`** (default): the request written out ("2 adults, 1 child, 12 to 15 June, Garden Room") and sent
    through the hotel's `formChannel` (WhatsApp, SMS, email);
  - **`url`**: the hotel's booking engine, with the dates and guests in the address when the engine takes them
    (`{checkIn}`, `{checkOut}`, `{adults}`, `{children}` placeholders in the URL; Asterre hands off to Booking.com);
  - **`onSubmit`**: the project's code.
- **`trip-detail`**'s "Book this tour" opens the same kind of request with the tour and a departure month.
- **`rsvp`** sends the answer the same way (message by default, `action` or `onSubmit`).

### 5. Times and dates

Agenda times are **local times of the event** (`"09:30"`), not instants: a session at 09:30 in Lisbon stays 09:30
for a visitor in Douala, as every reference shows it. The event's `timeZone` is in the content and only used by
`countdown` and "add to calendar" links (question 6). Dates are written with explicit `Intl` options, as the code
tour asks, so the server and the browser agree.

### 6. The blocks

**Lot L, hospitality (6 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `rooms-grid` | Rooms as cards: photo, title, guests, m², one fact, "from … / night", a link to the room's page | card, badge |
| `room-detail` | A room's page: title and number, guests, size and price, a gallery in the lightbox, highlights, amenities by group, "good to know" (check-in, check-out, breakfast), the request, the other rooms | lightbox, separator, button |
| `booking-stay` | A stay request: dates, adults and children, a room, contact; by message, to the booking engine, or to `onSubmit` (section 4) | date-picker (`DateRangePicker`), number-field, select, field |
| `trips-grid` | Tours as cards: photo, style, place, days, group size, "from … per person"; style chips with counts in the address | chip, card, badge |
| `trip-detail` | A tour's page: summary, highlights, day by day, included and not included, good to know, a price card that stays in view, other tours | accordion, separator, button |
| `private-events` | Private hire: kinds of event (weddings, retreats, shoots) with a photo and points each, then an enquiry by message | tabs, field, button |

**Lot M, events (7 blocks)**

| Block | What it is | Uses |
|---|---|---|
| `hero-event` | The event's name, dates, place, a countdown and the ticket button, over a photo or a wash; "when, where, for whom" facts | countdown, button, text-reveal |
| `agenda` | The programme: one tab per day (or one list for a single day), sessions with time range, kind, place, speakers' faces; parallel sessions side by side from `@md` | tabs, avatar, badge |
| `speakers-grid` | Speakers' portraits, name, role and organisation; a dialog with the bio, links and their sessions | dialog, avatar |
| `tickets` | Ticket tiers: price, struck early-bird price, unit, features, status (few left, sold out), a link to the ticketing service | card, badge, button |
| `sponsors-tiers` | Sponsors' logos grouped by tier, larger for the higher tiers, and a "become a sponsor" link | — |
| `rsvp` | An answer to an invitation: attending (yes, no, not sure), name, phone, guests, which parts of the day, dietary needs, a note; guests and parts hidden on "no" | radio-group, number-field, checkbox, textarea |
| `story-timeline` | A dated story (how we met, the proposal; a festival's editions): numbered entries with a date, a text and a photo | separator, image-reveal |

A wedding page is `hero-event` (with the couple's names), `story-timeline`, `agenda` (one day, no speakers: the day's
schedule), `location-map`, `faq-accordion` (dress code, where to stay) and `rsvp`.

### 7. Placeholders

Proposed (question 7): eight Unsplash photos under ADR-0014's rules, WebP in SVG, credited: three rooms (a stone
suite, a garden room, a pool), three landscapes for tours (mountains, coast, desert), a conference stage from behind
the audience, and a table set for a celebration. Speakers reuse the eleven portraits; sponsors reuse the six drawn
logos. No photo where a couple's or a speaker's face is the subject: the wedding example uses places and objects.

### 8. References: look before building

As RFC-0013 section 7: before a block is built, its references are inspected in a browser at a phone's width and at
1440px, and the "Observed" note goes in the lot's pull request. Clean room: we look at layout and behaviour, never copy
code, assets or words. Checked on 2026-11-25. Marketplace pages are `https://www.framer.com/marketplace/templates/<name>/`.

**Lot L, hospitality**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `rooms-grid` | Asterre https://asterre.framer.website/rooms · Hotellia https://hotellia.framer.website/rooms · Stayora https://stayora.framer.media/rooms | Asterre's cards ("2 Guests · 54 m² · Mountain View · From €560 /Night"); Hotellia's bed, guests, sqm and price above a two-line text; Stayora's "From $880 a night", size and "2 adults, 2 children" | Guests and size as numbers the agent can't misspell; "from" price written with `formatMoney`; a link per card |
| `room-detail` | Asterre https://asterre.framer.website/rooms/tramuntana-suite · Hotellia https://hotellia.framer.website/rooms/junior-suite | Asterre's "Room no. 01", three highlights (terrace, bed, shower), "All about the room" in five groups (room features, bathroom, in the room, with your stay, comfort), "Good to know" (check-in from 3 PM, check-out by 11 AM, breakfast, transfers, children, pets), "View more" rooms; its "Check Availability" opens Booking.com | Amenities as groups of lists; the request (`booking-stay`) with the room picked; the gallery in a `lightbox` |
| `booking-stay` | Hotellia https://hotellia.framer.website/reserve · Asterre's "Check Availability" (any page) | Hotellia's form: first and last name, email, phone, room type select, check-in and check-out dates, Submit, then an FAQ; Asterre's hand-off to an external engine in a new tab | One date range instead of two dates (no check-out before check-in); adults and children with − / +; the request by message, or the engine's URL with the dates filled in |
| `trips-grid` | Oryvia https://oryvia.framer.website/journeys · Tripora https://tripora.framer.media/tours · Travelo https://travelo.framer.media/ | Oryvia's style filter (Adventure, Coastal, Mountains, Culture, Wellness, Weekend escapes) and cards ("DOL · 7 days · Dolomites, Italy · Mountain Calling · per traveler from $480"); Tripora's "9 days · Max 12 people · From $2,450"; Travelo's rating "4.95 (482)" | Styles as chips with counts in the address (`?style=`, RFC-0014's `useFilters`); every tour in the HTML |
| `trip-detail` | Tripora https://tripora.framer.media/tours/torres-del-paine-trek · Oryvia https://oryvia.framer.website/journeys/mountain-calling | Tripora's run: about, highlights, "Day by day" with ranges ("Day 4 to 6"), what is included and not, "Good to know" (difficulty, accommodation, meeting point, languages), the price card (per person, length, group size, best time, departures, "Book this tour", free date changes) and "You might also like"; Oryvia's "boarding pass" facts | The day by day as a numbered list that collapses on phones; the price card sticks beside the text from `@lg`; the request with the tour named |
| `private-events` | Cabana Mountain https://cabanamountain.framer.website/events · Avenelle https://avenelle.framer.website/gatherings | Cabana's three kinds (weddings, retreats, photoshoots), each with a kicker, a text and two or three points, then "Request more information"; Avenelle's gatherings page | Kinds as tabs on phones and a row from `@lg`; the enquiry by message with the kind and a date |

**Lot M, events**

| Block | Inspect | Look at | Our touch |
|---|---|---|---|
| `hero-event` | IT/CONF https://itconf.framer.website/ · Design Conf https://designconf.framer.website/ · Weddingly https://wedddingly.framer.website/ · Together Vows https://togetherwedding.framer.website/ | IT/CONF's "When? Where? For who?" trio; Design Conf's dates and "There remain 00:00:00:00" (zeros until the script runs); Weddingly's "Save the date" and countdown; Together Vows' invitation card | `countdown` (section 3) prerendered with a real value, not zeros; dates with `Intl`; the ticket or RSVP button |
| `agenda` | Eventis https://eventis.framer.website/agenda · Conclave https://conclave26.framer.ai/#schedule · IT/CONF https://itconf.framer.website/agenda · Design Conf https://designconf.framer.website/ | Eventis' days stacked ("Day 1 : Main Conference"), each session with a time range, title, text and speakers; Conclave's days with a place each ("Day 2 · 19th Sep · Soma Tech District"); IT/CONF's parallel breakout sessions with speaker, duration and industry; Design Conf's flat "27 Oct, 14:00" list. None uses tabs | One tab per day when there are several (the survey's ask), the selected day in the address (`?day=2`); parallel sessions side by side from `@md`; the duration written out |
| `speakers-grid` | Eventis https://eventis.framer.website/speakers · Conclave https://conclave26.framer.ai/#speakers · IT/CONF https://itconf.framer.website/ | Eventis' grids grouped by theme (developers, designers); Conclave's "Day 1" tag on each speaker; IT/CONF's name and role in capitals | A dialog per speaker with the bio and their sessions from the agenda's content; groups optional |
| `tickets` | Eventis https://eventis.framer.website/#tickets · Halflight https://halflight-music.framer.website/#tickets · Conclave https://conclave26.framer.ai/#pricing | Eventis' three tiers (General, VIP, Team of 5) with "Early Bird", features and "Buy Ticket"; Halflight's single night, weekend and weekend plus with "per night" and "no booking fees"; Conclave's passes | A status per ticket (few left, sold out: the button disabled and said); the struck price read as "was"; links to the ticketing service |
| `sponsors-tiers` | IT/CONF https://itconf.framer.website/ ("Partners in innovation") · Design Conf https://designconf.framer.website/ · Eventis https://eventis.framer.website/ | How logos are laid out and whether tiers are shown (the references show one flat row) | Tiers with their name and a logo size each; logos are links |
| `rsvp` | Weddingly https://wedddingly.framer.website/rsvp · Together Vows https://togetherwedding.framer.website/rsvp | Weddingly's attending (Yes, No, Not sure), side (bride's, groom's), name, phone or WhatsApp, events (ceremony, reception, rehearsal dinner, after party), guests (1, 2, 3, 3+), a message, in steps with "Next"; Together Vows' name, phone, guests, "anything you cannot eat", a note, "You can change your answer any time" | One form, no steps: the fields after "attending" appear on yes; sent by message (WhatsApp first) with the answer written out |
| `story-timeline` | Weddingly https://wedddingly.framer.website/#our-story · Halflight https://halflight-music.framer.website/ (editions) | Weddingly's three numbered, dated entries ("1 · March 14, 2021 · The day we met") | Entries reveal in turn at the village's stagger; a photo per entry with `image-reveal` from intensity 2 |

## Options considered

- **Hotels and tours in `storefront`**: a guesthouse is a local business, but rooms by the night, a booking engine and
  tours by the day are not a menu or a price list; an agent building a hotel site should find them together.
- **Travel as its own family**: two blocks (`trips-grid`, `trip-detail`) make a thin family; they share everything
  else with hotels.
- **Weddings as their own family**: a wedding page needs a hero with a countdown, a schedule and an RSVP, all of which
  a conference or a festival also uses; one `events` family serves both.
- **Rooms as `listing`s with `listing-cards`**: one type fewer, but rooms would carry `status` and `kind` they don't
  have, and lose guests, size and amenities groups.
- **`tickets` as a `pricing-plans` variant**: plans have monthly and yearly prices and a "most popular" plan; tickets
  have statuses, units and an external link; one block per job keeps both schemas plain.
- **A `stepper` component for the RSVP** (the survey's idea, Weddingly's steps): a component for one block; a form
  that reveals its next fields does the same in one screen.
- **Availability from the booking engine** (an API call or an embedded widget): a dependency and a key the project did
  not choose; a link with the dates filled in covers the references.

## Risks and open questions

1. **Families**: `hospitality` (hotels and travel) and `events` (conferences, festivals, weddings) (proposed), or
   travel and weddings as families of their own, or categories inside `storefront`?
2. **Rooms**: a `room` field type (proposed), or `listing` reused?
3. **`countdown`**: a new component in the foundations lot, with `offer-deal` moved onto it (proposed), or a countdown
   inside `hero-event` only?
4. **Requests**: by message by default, a booking engine's URL with the dates filled in, or `onSubmit` (proposed), or
   the booking engine's URL only?
5. **`agenda` with tabs** per day (the survey's ask, proposed), or days stacked as every reference shows them?
6. **"Add to calendar"** links (an `.ics` file per session or per event) in `agenda` and `hero-event`, or later?
7. **Placeholders**: eight Unsplash photos (proposed), or the existing `place-*` and `restaurant-room` only?
8. **Example pages**: four (`/examples/hotel`, `/examples/tours`, `/examples/conference`, `/examples/wedding`,
   proposed), or two (a hotel with its tours, and a conference with a wedding variant)?
9. **Order of the lots**: L0 (families, field types, `countdown`, placeholders, example skeletons), L (hospitality),
   M (events) (proposed), or events first?

## Plan

**Before every block**: inspect its references (section 8) and write the "Observed" note in the lot's pull request.

**Lot L0, foundations**: the families and categories, the field types with their tests, `countdown` (a component with
its page, demos and `offer-deal` on it), the placeholders, the example pages' skeletons. Done when a test block in each
new family shows in the gallery, `blocks.json` and `list_components` with `family` (no CLI release needed since
0.4.1).

**Lot L, hospitality**: the six blocks; `/examples/hotel` with a page per room, `/examples/tours` with a page per tour.

**Lot M, events**: the seven blocks; `/examples/conference` and `/examples/wedding`.

Each block passes the RFC-0008 quality gate (schema and example, server render, `pnpm axe` and `pnpm screenshots` in
every village, light and dark, at 360px and 1440px, the weight budget, intensity 1 and motion off, its page). Each lot
is one pull request, opened against `main`.
