# RFC-0004: Rasengan UI — the twelve components a v1 needs

- Status: Accepted. Lots A, B and C built and live since 2026-11-04; open questions in the [roadmap](../roadmap.md)
- Author: Dilane Kombou
- Created: 2026-10-31
- Builds on: RFC-0002 (components, villages, quality gate), plan 002 (variant × tone × size), RFC-0003 (examples in
  the registry)
- Package(s): `registry/components` (12 new folders), `apps/site` (pages, search), `packages/core` (if a
  component needs a new `ui-*` variant)

## Summary

Rasengan UI has 29 components. This RFC adds the 12 that a first public version cannot do without, which takes the
collection to 41:

| Lot | Components |
|---|---|
| A. Markup | Kbd, Spinner, Empty, Button Group, Breadcrumb, Table, Pagination |
| B. Forms | Input Group, Combobox |
| C. Overlays and navigation | Sheet, Navigation Menu, Command |

They were picked from the 66 components of shadcn/ui (October 2026) with two questions: does a standard app or a
landing page need it from day one, and does Base UI 1.9 give us the primitive? Names and parts follow shadcn, as for
the first 29, so code moves between the two.

The site uses two of them as soon as they exist: the docs search becomes a `CommandDialog` and the shortcut hints
`Kbd`.

## Motivation

- **The first 29 cover forms, overlays and display, but not navigation or data.** A landing header needs a
  navigation menu and a mobile sheet; an app page needs a breadcrumb, a table, pagination and an empty state. Without
  them, the RFC-0001 blocks cannot be rebuilt (RFC-0002, Rollout step 6), and anyone building an app writes these
  pieces by hand, with raw colours that do not follow the village.
- **The site already hand-rolls two of them.** `apps/site` builds its search from Base UI Autocomplete inside a
  Dialog, and its `<kbd>` hints with inline classes. Both are components we owe users anyway; turning them into
  components makes the site their first user.
- **Agents ask for them.** With the MCP server (RFC-0003), an agent that finds no `table` or `sheet` writes one from
  memory. Every missing component is a place where the output stops following the village.
- **Most of them are cheap.** Seven are markup over existing tokens. Base UI ships the primitives for the other
  five: Drawer, Navigation Menu, Combobox, Autocomplete.

## Goals

- The 12 components, each through the RFC-0002 quality gate and the plan 002 axes where they make sense.
- shadcn's names and parts (`SheetContent side="left"`, `BreadcrumbLink`, `PaginationLink isActive`…), so shadcn code
  ports with its imports changed.
- No new npm dependency beyond `@base-ui/react`, `class-variance-authority` and `lucide-react`, which the collection
  already uses.
- The site's search and shortcut hints move to the new components.

## Non-goals

- Sidebar, Calendar, Date Picker, Input OTP, Hover Card, Context Menu, Item, Carousel, Number Field: they come next
  (see "Later"), not in this RFC.
- Data Table. It is a recipe (TanStack Table over `Table`), and becomes a block, not a component.
- The AI components shadcn added in 2026 (Attachment, Bubble, Marker, Message, Message Scroller, Questionnaire, Trace,
  Code Block). They belong to a separate collection, if we make one.
- Aspect Ratio and Typography. Tailwind's `aspect-*` and the villages' `font-display` already cover them.
- A Radix version. The Radix engine comes for the whole collection at once (RFC-0002, Rollout step 6).

## Decisions

| Topic | Decision |
|---|---|
| Scope | The 12 components above, in three lots, markup first |
| Names | shadcn's component and part names; differences are listed per component |
| Axes | `variant`, `tone`, `size` per plan 002, only where a component has real choices; none is added for symmetry |
| Sheet | Built on Base UI **Drawer**: four sides and swipe to close. No separate Drawer component |
| Command | Built on Base UI **Autocomplete** with `inline`, not on `cmdk`: no new dependency, and the site already proves it |
| Combobox | Base UI Combobox; single and multiple (chips); its trigger shares Select's variants and sizes |
| Links | Breadcrumb, Pagination and Navigation Menu links take a `render` prop, so a router's `<Link>` drops in |
| Tokens | No new contract token unless a village needs one; any addition goes to the contract, the three villages and `pnpm contrast` |
| Site | Search → `CommandDialog`, shortcut hints → `Kbd`, in the lot that ships each component; the mobile menu stays a Popover |

## Detailed design

Every component follows the RFC-0002 anatomy: `registry/components/<name>/` with `<name>.base.tsx`,
`<name>.styles.ts`, `meta.ts`, `<name>.demo.tsx` and, when it has axes, `<name>-variants.demo.tsx` /
`<name>-sizes.demo.tsx`. Each demo becomes a `registry:example` item (RFC-0003), so the MCP server serves it.

### Lot A — markup

**Kbd** (`kbd`). `Kbd`, `KbdGroup`. A `<kbd>` with the village's border, muted background and mono face.
`size`: `sm` / `default`. Used by Command, Tooltip and Dropdown Menu shortcuts.

**Spinner** (`spinner`). `Spinner`. Lucide's `Loader2Icon` spinning, `role="status"` and `aria-label="Loading"`.
`size`: `sm` / `default` / `lg` (the indicator sizes). It takes `currentColor`, so it follows the button or text it
sits in; `tone` sets it explicitly. With `prefers-reduced-motion` it turns slowly instead of stopping, so it still
reads as busy.

**Empty** (`empty`). `Empty`, `EmptyHeader`, `EmptyMedia` (`variant`: `default` / `icon`), `EmptyTitle`,
`EmptyDescription`, `EmptyContent`. `variant`: `default` / `outline` (a dashed border, for drop zones and empty
panels). Headings use `font-display` and the village's heading case.

**Button Group** (`button-group`). `ButtonGroup` (`orientation`: `horizontal` / `vertical`), `ButtonGroupSeparator`,
`ButtonGroupText`. `role="group"`. It joins its children: inner radii go to zero, borders collapse, focus raises the
focused child. It works with Button, Input, Select's trigger and Input Group, as shadcn's does. Iwa (no radius, heavy
borders) is the case to check: collapsed borders must not double.

**Breadcrumb** (`breadcrumb`). `Breadcrumb` (`<nav aria-label="Breadcrumb">`), `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink` (`render` prop), `BreadcrumbPage` (`aria-current="page"`), `BreadcrumbSeparator` (a chevron, or
children), `BreadcrumbEllipsis` (pairs with Dropdown Menu for collapsed levels). No axes.

**Table** (`table`). `Table` (wrapped in a horizontally scrolling container), `TableHeader`, `TableBody`,
`TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. `variant`: `default` / `striped`. `size`: `sm` /
`default` (row height and cell padding from the control spacing tokens, so Iwa is dense without a size prop). Selected
rows use `data-state="selected"`, as shadcn's.

**Pagination** (`pagination`). `Pagination` (`<nav aria-label="Pagination">`), `PaginationContent`,
`PaginationItem`, `PaginationLink` (`isActive` sets `aria-current="page"` and the outline style; `render` prop),
`PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`. Links use `buttonVariants`, so `size` is Button's.
Registry dependency: `button`.

### Lot B — forms

**Input Group** (`input-group`). `InputGroup`, `InputGroupAddon` (`align`: `inline-start` / `inline-end` /
`block-start` / `block-end`), `InputGroupInput`, `InputGroupTextarea`, `InputGroupButton`, `InputGroupText`. The
group draws the field (border, background, focus ring through `has-[:focus-visible]`) and the input inside is bare.
`variant` (`default` / `filled` / `underline`, plus Select's `ghost`) and `size` are Input's, read from the Field
context as Input does, so `<Field size="sm">` sizes the whole group. Registry dependencies: `input`, `textarea`, `button`.

**Combobox** (`combobox`). Base UI Combobox. `Combobox` (Root), `ComboboxInput` (Base UI's InputGroup, with the
trigger and the clear button inside), `ComboboxContent` (Portal, Positioner, Popup; the portal container comes from
`usePortalContainer()`, so it stays in a `VillageScope`), `ComboboxList`, `ComboboxItem` (with its indicator),
`ComboboxGroup`, `ComboboxLabel`, `ComboboxEmpty`, `ComboboxSeparator`, and for `multiple`: `ComboboxChips`,
`ComboboxChip`. The input takes Select's trigger variants and sizes (`default` / `filled` / `underline` / `ghost`
× `sm` / `default` / `lg`) and the popup Select's styles, so the two read as one family. Filtering is Base UI's
(`items` and `useFilter`). Registry dependencies: `input-group`, and `select`, whose list styles it shares.

### Lot C — overlays and navigation

**Sheet** (`sheet`). Base UI Drawer. `Sheet`, `SheetTrigger`, `SheetContent` (`side`: `top` / `right` / `bottom` /
`left`, default `right`; `showCloseButton`, default `true`), `SheetHeader`, `SheetFooter`, `SheetTitle`,
`SheetDescription`, `SheetClose`. Swiping toward the side it came from closes it (`swipeDirection` follows `side`).
`size`: `sm` / `default` / `lg` (width on the sides, height on top and bottom). `snapPoints` passes through for a
bottom sheet that stops halfway. The overlay, surface, shadow, blur and motion durations are Dialog's tokens, so a
sheet looks like a dialog of the same village. It animates with transitions on `transform`, not Dialog's keyframes:
the Drawer moves the panel with `--drawer-swipe-movement-*` while it is dragged and animates from there on release. A
bottom sheet shows a handle. The portal comes from `usePortalContainer()`.

shadcn has both Sheet (on Dialog) and Drawer (on vaul, bottom, swipeable). Base UI's Drawer does both, so one
component is enough. Whether to publish a `drawer` item that re-exports Sheet with `side="bottom"` for shadcn code is
an open question.

**Navigation Menu** (`navigation-menu`). Base UI Navigation Menu. `NavigationMenu`, `NavigationMenuList`,
`NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink` (`render` prop;
`active` sets `aria-current`), and `navigationMenuTriggerStyle()` as shadcn exports it. The viewport is rendered by
the root, sized by Base UI's `--popup-width` / `--popup-height`, and animated with the village's motion tokens.
Content panels are `popover` surfaces. The component is for wide screens; below `md`, headers switch to a Sheet, which
the header block and the site show.

**Command** (`command`). Base UI Autocomplete with `inline` (the list is always shown, no popup) and
`autoHighlight`. `Command` (Root), `CommandInput` (with a search icon), `CommandList`, `CommandEmpty`,
`CommandGroup`, `CommandGroupLabel` and `CommandCollection` (for grouped items), `CommandItem` (with `onSelect`),
`CommandSeparator`, `CommandShortcut` (a `Kbd`), and `CommandDialog` (Dialog + Command, with a visually hidden title
and description). Unless the project controls `value`, picking an item leaves the query as typed instead of writing
the item into the field. Registry dependencies: `dialog`, `kbd`.

The one real difference with shadcn: cmdk filters the items it finds in its children, Base UI filters an `items`
array and renders the list from it. Command follows Base UI (data in, render function out), which is what the site
search already does. The docs page shows the port from cmdk side by side.

### Site

| Lot | Change |
|---|---|
| A | `Kbd` replaces the inline `<kbd>` of the search trigger; component pages for the seven |
| B | Pages for Input Group and Combobox; the search field uses Input Group |
| C | `search.tsx` becomes a `CommandDialog`; pages for the three |

Each lot adds its pages to the catalogue, so the sidebar, the search, the screenshots and `pnpm axe` pick them up.

### Quality gate

As in RFC-0002, plus plan 002's demos:

- Renders correctly in Konoha, Kiri and Iwa × light and dark × two natures, overlays open.
- Keyboard and screen reader checks: roles and names above (`nav` landmarks, `aria-current`, `role="status"`), focus
  order, Escape and swipe for Sheet, arrow keys for Navigation Menu, Combobox and Command.
- Only contract tokens and `ui-*` variants; `pnpm contrast` passes if a token was added.
- `pnpm screenshots` and `pnpm axe` pass on the new pages; the demos build; `pnpm registry` publishes the items and
  their examples.

## Rollout

1. **Lot A**: Kbd, Spinner, Empty, Button Group, Breadcrumb, Table, Pagination; `Kbd` on the site.
2. **Lot B**: Input Group, then Combobox (it uses Input Group).
3. **Lot C**: Sheet, Navigation Menu, Command; the site's search moves to Command.
4. **Then**: the screenshot baseline is accepted again with the 12 new pages; RFC-0002's list of components points
   here.

### Later

In this order, each one needing its own decision:

| Component | Why later |
|---|---|
| Sidebar | The largest shadcn component (collapsible, mobile sheet, cookie state); built with the app blocks |
| Calendar, Date Picker | Done in RFC-0005, with Time Picker (2026-11-01) |
| Input OTP | Base UI `otp-field`; with the authentication blocks |
| Hover Card, Context Menu | Base UI `preview-card` and `context-menu`; useful, not essential |
| Item | A list or settings row with media, title and actions; with the app blocks |
| Carousel | For landing testimonials; to weigh against `packages/motion`'s Marquee |
| Number Field | Base UI `number-field`; shadcn has none, Base UI gives it for free |

## Alternatives considered

- **Command on `cmdk`, as shadcn.** Keeps shadcn's children-based API, but adds a dependency with its own filtering
  and accessibility model, next to a Base UI primitive that does the same job and that the site already uses.
- **Sheet on Dialog, as shadcn, plus a Drawer.** Two components for one primitive, and a sheet that cannot be swiped
  away on a phone.
- **Everything shadcn has.** 37 components at once would take weeks and spread the quality gate thin; half of them
  serve a minority of projects.
- **Fewer components, more blocks.** Blocks need these components; building blocks first would mean hand-rolling them
  inside each block.

## Open questions

1. Should Button get a `loading` prop (a `Spinner` and `disabled`), or should projects compose them, as shadcn does?
2. A `drawer` item that re-exports Sheet with `side="bottom"`, so shadcn's `Drawer` imports keep working?
3. Command: also accept children without `items`, filtering them ourselves like cmdk, to ease the port from shadcn?
4. Table: should a village (Iwa) default to `striped`, through a token, or is it always the project's choice?
5. Navigation Menu below `md`: leave the switch to a Sheet to blocks, or ship a `NavigationMenuMobile` that renders
   the same items in a Sheet?
6. The site's mobile menu is a Popover under the header, as on ui.shadcn.com. Keep it, or move it to a left `Sheet`
   once Sheet exists?
