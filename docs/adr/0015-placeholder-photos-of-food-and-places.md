# ADR-0015 — Food and places are Unsplash photos too; the dashboard is a real screen made from the components

| | |
|---|---|
| Status | Accepted |
| Date | 2026-11-09 |
| Replaces | RFC-0008, rule 7 ("illustrations"), for the dishes, the kitchen and the dining room; extends ADR-0014 beyond people |

## Context

RFC-0008 rule 7 gave the blocks "a small set of open placeholder images (illustrations, and product shots made from the
components)". The dishes, the kitchen and the dining room were drawn as flat SVG illustrations, and `product-dashboard`
was a grey wireframe. ADR-0014 brought real photos for people only. Next to real portraits, the drawn plates and the
wireframe read as unfinished, on the site's examples and in the Blocks launch film (2026-11-09), and the maintainer
asked for real images.

## Decision

- **Dishes and places are Unsplash photos**, under the Unsplash License, never Unsplash+, shipped exactly as ADR-0014's
  portraits: cropped to the placeholder's frame (1200 × 900, the kitchen 1000 × 1200), WebP, base64 in an SVG, credited
  in `registry/placeholders/CREDITS.md`. Eight files: `dish-stew`, `dish-fish`, `dish-plantain`, `dish-salad`,
  `dish-dessert`, `dish-chicken` (new, for the menu's Poulet DG, which shared the stew's image), `kitchen`,
  `restaurant-room`.
- **`product-dashboard` is a real screen**: the site's dashboard example rebuilt with Senbon's invoicing data (the
  fictional product of the marketing examples), captured at 1280 × 800 in Konoha, nature Onmyoton, neutral greys, so
  it sits in any village. It is Rasengan UI's own work, under its MIT licence. RFC-0008's "product shots made from the
  components" now holds for it.
- **The examples' words follow the photos**: alt texts describe what each photo shows, and a dish whose name the photo
  contradicts is renamed (menu-cards: "Egusi with assorted meats", "Fried plantain", "Avocado bowl", "Puff-puff").
  Dishes without an image keep their names.
- Still drawn: the logo marks (RFC-0009, decision 4), `map-akwa`, and `product-invoice`, `product-payment`,
  `product-phone`.

## Options ruled out

- **Keeping the illustrations**: the maintainer's call was real images.
- **Loading photos from Unsplash at runtime**: remote content in a block (RFC-0008); examples break offline.
- **The existing home dashboard as is**: it shows a deploy platform in Katon, against an invoicing landing page in any
  nature.

## Consequences

- `rasengan-placeholders` grows by about 0.8 MB (about 1.4 MB with the portraits): every block that depends on it pulls
  it. Keeping placeholders few matters more now; a later change may split the item by family.
- Adding or replacing a photo means checking it is not Unsplash+, and updating `CREDITS.md` and the alts that show it.
- The dashboard's source is a capture-only copy of `apps/site/src/components/home/dashboard.tsx` (never committed); to
  change the screen, rebuild it the same way and re-capture.

## Revisit when

`rasengan-placeholders` grows past what a project tolerates to install for one block, or Unsplash changes its licence.
