# RFC-0012 — Interface components: the six pieces the next blocks are made of

| | |
|---|---|
| Status | Accepted (2026-11-24). Questions 1 to 6 settled, see "Decisions"; progress in the [roadmap](../roadmap.md) |
| Date | 2026-11-24 |
| Author | Dilane Kombou |
| Builds on | RFC-0002 (components, villages, quality gate), RFC-0004 (Number Field on its later list), plan 002 (`variant` × `tone` × `size`), ADR-0009 (categories), ADR-0011 (native scroll snapping), invariant 21 (a pause control for what moves on its own), the [Framer templates survey](../surveys/2026-11-23-framer-templates.md) |
| Packages | `registry/components` (six new folders), `registry/blocks/gallery-grid`, `registry/blocks/reviews-rating` and `registry/blocks/booking-form` (rebuilt on the new components), `apps/site` (pages) |
| Decision needed | — (questions 1 to 6 settled, see "Decisions") |

## Problem

RFC-0010 and RFC-0011 built every motion component the [survey](../surveys/2026-11-23-framer-templates.md) marks P1.
The survey's P1 **interface** components are still missing, and the P1 blocks of the next RFCs are made of them:

| Component | What it is | P1 blocks that need it |
|---|---|---|
| `number-field` | A − / + field for a quantity or a number of guests | `product-detail`, `reservation-widget`, `cart-drawer` |
| `rating` | Stars, read-only (4.9 out of 5) and as an input | `listing-cards`, `product-grid`, `reviews-rating` (today) |
| `chip` | A tag you pick (a time slot, a popular search) or remove (an active filter) | `search-hero`, `filter-bar`, `reservation-widget` |
| `lightbox` | A full-screen image viewer with arrows, keys and swipe | `gallery-grid` (today), `case-study`, `listing-detail`, `rooms` |
| `video` | A video player, and its version in a dialog ("Watch the demo") | `hero-video`, `hero-product`, SaaS heroes |
| `announcement-bar` | A band at the top of the page, dismissible or scrolling | every kind of site, commerce and SaaS first |

Two blocks already carry their own copy: `gallery-grid` has a lightbox of its own in a Dialog, and `reviews-rating`
draws its stars by hand. Without these components, each sector block would build its own again, as `steps-scroll` did
before `sticky-scroll` (RFC-0010).

## Goals

1. Six components on the same contract as every other: copied into the project, contract names only, every village,
   light and dark, `variant` × `tone` × `size` where they make sense, the quality gate.
2. **Base UI where it has the primitive**: `number-field`, `radio-group` (the rating input), `toggle-group` (picked
   chips), `dialog` (the lightbox, the video dialog). The browser for the rest: `<video>`, native scroll snapping
   (ADR-0011).
3. **Light**: about 2 to 4 kB gzip each beyond `cn()` and Base UI; nothing from Motion.
4. `gallery-grid` and `reviews-rating` rebuilt on `lightbox` and `rating`, with the same schema, so `rasengan-ui update`
   brings them in as it brought `sticky-scroll` into `steps-scroll`.

## Non-goals

- **The survey's P2 interface components** (`audio-player`, `compare-slider`, `countdown`, `toc`, `share-buttons`,
  `device-frame`, `theme-toggle`, `stepper`): a later RFC.
- **A video player of our own**: no custom scrubber, volume or quality menu. Once playing, the browser's controls.
  No streaming formats (HLS, DASH).
- **New blocks.** The sector blocks that use these come with their own RFCs.
- **New contract tokens.** Stars take a tone; the rest uses what the contract has.

## Proposal

### 1. The components

| Name | Parts | Category | Builds on | Lot |
|---|---|---|---|---|
| `number-field` | `NumberField`, `NumberFieldGroup`, `NumberFieldDecrement`, `NumberFieldInput`, `NumberFieldIncrement` | forms | Base UI `number-field` | A |
| `rating` | `Rating` (read-only), `RatingGroup` (input) | forms | an SVG star; Base UI `radio-group` for the input | A |
| `chip` | `Chip`, `ChipGroup`, `ChipRemove` | forms | Base UI `toggle` and `toggle-group` | A |
| `announcement-bar` | `AnnouncementBar`, `AnnouncementBarClose` | feedback | `marquee` for the scrolling form | A |
| `lightbox` | `Lightbox`, `LightboxTrigger`, `LightboxContent` | overlays | Dialog, native scroll snapping | B |
| `video` | `Video`, `VideoDialog`, `VideoDialogTrigger`, `VideoDialogContent` | display | `<video>`, Dialog | B |

shadcn has none of the six, so the part names follow Base UI's where Base UI has the component (`NumberField…`) and
shadcn's habits otherwise (`…Trigger`, `…Content`, `…Close`).

### 2. Notes on each

**`number-field`** takes Base UI's props as they are (`min`, `max`, `step`, `format` for `Intl.NumberFormat`,
`smallStep`, `largeStep`). The group looks like `input-group`: a field of the village's height (`h-control`) with the
two buttons inside, `pressable`, so they sink in Iwa and drop onto their lip in Kusa. `size` and `variant` come from
`Field` as for `input`. The buttons say what they do to a screen reader ("Fewer guests", "More guests": a `labels`
prop, English by default).

```tsx
<NumberField defaultValue={2} min={1} max={12}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
```

**`rating`** is two parts in one item:
- `Rating value={4.7} max={5}`: stars filled to the tenth, `role="img"` with `aria-label="4.7 out of 5"`. Optional
  `showValue` writes the number beside them.
- `RatingGroup name="score"`: a `radio-group` of `max` radios, each a star labelled "1 star", "2 stars"…; arrow keys move,
  hovering previews the score, it posts in a form like any radio. Optional `allowHalf` is a question (5).
- `tone` (default `warning`, the stars' yellow) fills the stars; empty stars are the muted foreground in the input (3:1
  at least, WCAG 1.4.11) and the border colour in the read-only form, where the number says the rest.

**`chip`** covers two uses with one look:
- **Picked**: `ChipGroup` is a Base UI `toggle-group` (`multiple` or single), each `Chip` a toggle (`ui-pressed`).
  Time slots, "popular searches", sizes.
- **Removed**: a `Chip` with a `ChipRemove` inside, a button labelled "Remove Paris". Active filters.
- `variant` `outline` (default) · `soft` · `solid`; `tone`; `size` `sm` · `default`. Height and radius from the contract
  (`h-control-sm`, `rounded-pill`).
- A `Chip` with `render={<a href="…" />}` is a link chip, for "popular searches" that go somewhere.

**`announcement-bar`** is a band in the tone (`soft` or `solid`), with a message, an optional link and either:
- `dismissible`: an `AnnouncementBarClose` button; with a `dismissKey`, the choice is remembered (question 4);
- `scrolling`: the message runs as a `marquee`, so it keeps `marquee`'s pause button (invariant 21) and its reduced
  motion behaviour (with motion off or at intensity 0, the message stands still and wraps).

It renders a `<section aria-label="Announcement">` (the label a prop), not a live region: it is there on load, nothing
to announce.

**`lightbox`** opens one picture of a set full screen:

```tsx
<Lightbox images={photos}>
  {photos.map((photo, i) => (
    <LightboxTrigger key={photo.src} index={i} render={<button />}>
      <img src={photo.src} alt={photo.alt} />
    </LightboxTrigger>
  ))}
  <LightboxContent />
</Lightbox>
```

- A Dialog, full screen, on the village's backdrop. The pictures sit in a row with native scroll snapping (as the
  carousel, ADR-0011): a swipe on a touch screen, the arrow keys and two buttons elsewhere, a counter ("3 / 11"), the
  caption under the picture.
- The title of the dialog is the picture's `alt`, so a screen reader hears what opened. Focus returns to the trigger.
- Pictures load as they come near (`loading="lazy"` on the row), so a set of fifty costs one.

**`video`**:
- `Video` wraps a `<video>`: the poster, and a large play button in the tone until it plays; then the browser's
  controls. `captions` takes `<track>` files. `autoPlay` (a muted background loop, for `hero-video`) always shows a
  pause button (invariant 21) and does not start under reduced motion: the poster stays.
- `VideoDialog` puts it in a Dialog behind a trigger ("Watch the demo"); closing the dialog pauses it.
- Embeds (YouTube, Vimeo) are question 3.

### 3. Villages and motion

Nothing here is a motion component. What moves uses the village's durations and easings through CSS: the stars'
hover preview, a chip's press, the lightbox's slides (smooth scrolling, instant under reduced motion), the dialogs'
own entrance. Kusa's lip comes through the contract's shadows on the number field's buttons, picked chips and the
play button.

### 4. The two blocks

- `gallery-grid` keeps its schema and its look; its Dialog, arrows and counter become a `Lightbox`. It gains swipe on
  touch screens.
- `reviews-rating` keeps its schema; its `Stars` becomes `Rating`.
- `booking-form` keeps its schema; its party size moves from a Select to a `number-field` ("Decisions", question 6).

The three are tried with `rasengan-ui update` on a project that edited them, as 0010-Q5 was.

## Options considered

- **Number Field as an `input-group` recipe** (an input and two buttons, documented): no component to maintain, but
  every project would rewrite the clamping, the long press and `Intl` formatting that Base UI already does.
- **Rating on a `slider`**: one control, but a slider says "60 %", not "3 stars", and it does not post a whole number
  by default.
- **Chips as a `toggle-group` variant** (`variant="chips"`) plus a Badge with a remove button: no new item, but
  removing is not toggling, and the two uses would not share a look or a size.
- **A lightbox on `gallery-3d` or `carousel`**: the carousel is a row inside the page, not a full-screen dialog;
  sharing the scroll snapping is enough.
- **A custom video player** (Plyr-like controls themed by the village): the most visible gain, but weeks of work and
  accessibility the browser's controls already have. A later RFC if the blocks ask for it.

## Risks and open questions

1. **`rating`: one item with `Rating` and `RatingGroup` (proposed), or two items** (`rating` and `rating-input`)? One
   item keeps the stars' drawing in one place; two keep the read-only one lighter (no Base UI).
2. **`chip`: its own item (proposed), or a `toggle-group` variant and a Badge with a remove button**?
3. **Video embeds**: files only (proposed for lot B), or also YouTube and Vimeo through a facade that loads the player
   only on click, from `youtube-nocookie.com`, so nothing reaches Google before the visitor asks?
4. **Remembering a dismissed announcement**: `dismissKey` in `localStorage`, hidden before paint by a small inline
   script as the site's settings are (proposed: no flash on a prerendered page, but one more thing to put in
   `<head>`); or remembered without the script (the bar flashes on load); or never remembered.
5. **Half stars in `RatingGroup`** (`allowHalf`): reviews are whole stars on most sites; half stars double the radios.
   Leave them out of the input (proposed) and keep tenths for the read-only `Rating`?
6. **`booking-form`'s party size**: today a Select of 1 to `max`. Move it to `number-field` (one tap per guest, a
   field the survey's `reservation-widget` will share), or keep the Select (one tap to any number on a phone)?

## Decisions

Settled by the maintainer on 2026-11-24:

| Question | Decision |
|---|---|
| 1. `rating` | **One item, two parts**: `Rating` (read-only, `role="img"`) and `RatingGroup` (input on Base UI's `radio-group`), sharing the star's drawing |
| 2. `chip` | **Its own item**: `Chip`, `ChipGroup` (on `toggle-group`) and `ChipRemove`, one look for picked and removed chips |
| 3. Video embeds | **Files only** in lot B. YouTube and Vimeo, through a facade that loads the player on click, wait for a block that needs them |
| 4. A dismissed announcement | **Remembered under `dismissKey` in `localStorage`, hidden before paint by a small inline script** for prerendered pages; without `dismissKey`, it closes for the page only |
| 5. Half stars in `RatingGroup` | **No**: the input is whole stars; the read-only `Rating` keeps tenths |
| 6. `booking-form`'s party size | **A `number-field`**, in lot A, with the same schema (`fields.party.max` is the field's `max`) |

## Plan

**Lot A, forms and the band**: `number-field` (and `booking-form`'s party size on it), `rating` (and `reviews-rating`
on it), `chip`, `announcement-bar`.

**Lot B, media**: `lightbox` (and `gallery-grid` on it), `video`.

Each lot is done when its components have pages, demos published as examples and the villages grid, and pass
`pnpm typecheck`, `pnpm test`, `pnpm contrast` if a tone pair is new, `pnpm axe` and `pnpm screenshots` in every
village, light and dark, with the keyboard, a touch screen and a screen reader checked by hand; the rebuilt blocks also
pass the server render test and a `rasengan-ui update` over an edited copy. Each lot is one pull request, opened
against `main`.
