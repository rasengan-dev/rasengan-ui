# 002 — Component variants

Add `variant`, `tone` and `size` to most of the 29 components, the way Button already has `variant` and `size`.
Today only Button, Toggle (and Toggle Group through its context), Badge and Alert have variants; Avatar has a
`size` read from `data-size`.

## Decisions (2026-10-30)

- **Three axes**: `size` (`sm` / `default` / `lg`), visual `variant`, and colour `tone`.
- **Two separate props**: `variant="soft" tone="success"`. Every style works with every tone.
- **Tone values**: `neutral` / `primary` / `success` / `warning` / `info` / `destructive`. `destructive` matches the
  existing `--destructive` token and shadcn. `variant="destructive"` stays (Button, Badge, Alert) as shorthand for
  `variant="default" tone="destructive"`, so shadcn code keeps working.
- **Style names**: shadcn's names stay (`default`, `secondary`, `outline`, `ghost`, `link`), `soft` is added, plus a
  few component-specific styles (Input `filled` / `underline`, Tabs `underline`, Card `elevated`…).
- **Villages can redefine variants** through contract tokens, as they already do for radii, shadows and cases.
- **Order**: lot 0 (tokens), then one lot per family. Each lot updates the site pages, screenshots and axe.
- **Figma later**: the site and the screenshots are the reference until then.

## How tone works

A tone is a utility that only sets custom properties, so variants are written once against `--tone*`, without a
`compoundVariants` entry per variant × tone pair:

```css
@utility tone-success {
	--tone: var(--success);                       /* solid background */
	--tone-foreground: var(--success-foreground); /* text on the solid colour */
	--tone-soft: var(--success-soft);             /* translucent wash */
	--tone-text: var(--success-text);             /* words in the tone: soft, outline, ghost, link */
	--tone-edge: color-mix(in oklab, var(--success-text) var(--soft-edge-alpha), transparent); /* soft's border */
}
```

```ts
variant: {
	default: "bg-tone text-tone-foreground hover:bg-tone/90",
	soft: "border-tone-edge bg-tone-soft text-tone-text",
	outline: "border-tone-text/40 text-tone-text …",
},
tone: { primary: "tone-primary", success: "tone-success", … },
```

Every village and nature scope declares the primary as the default tone, so `bg-tone` works without a `tone-*`
class and the current look does not change. `neutral` is the village's ink (foreground / background).

## Lot 0 — tokens (done 2026-10-30)

- `contract.css`
  - status colours `--success`, `--warning`, `--info` (+ `-foreground`, `-text`, `-soft`) and `--{primary,
    destructive,neutral}-{text,soft}`;
  - fixed hues `--success-hue: 150`, `--warning-hue: 75`, `--info-hue: 255` (a real blue: 240 runs out of sRGB
    chroma at the lightness white text needs);
  - knobs per mode `--status-l/c` (default: the primary's), `--on-status`, `--warning-l/c`, `--on-warning`
    (amber is light, with dark text), `--tone-text-l` (words in a tone, a little darker than the solid colour in
    light mode so they hold 4.5:1 on the soft wash), `--warning-text-l/c`, `--soft-alpha`, `--soft-edge-alpha`;
  - the six `tone-*` utilities and the `--color-tone*`, `--color-success…` theme names;
  - sizes `--control-text-sm/lg` (`text-control-sm/lg`) and `--indicator-sm/md/lg` (`size-indicator(-sm/-lg)`).
- Status colours are not multiplied by `--tint`. Onmyōton sets `--primary-text` to the ink.
- Konoha, Kiri, Iwa: values per mode, all colours inside sRGB. Iwa's soft is a flat tint inside a full-strength
  border (`--soft-edge-alpha: 100%`), like a printed stamp.
- `pnpm contrast` checks each tone: text on the solid colour, and its words on the page, a card and the soft wash
  over either (3,600 pairs, all ≥ 4.5:1; `CONTRAST_TONES=1` lists them).

## Lot 1 — form fields (done 2026-10-30)

- Input, Textarea, Select's trigger: `variant` (`default`, `filled`, `underline`; Select adds `ghost`) and `size`
  (`sm`, `default`, `lg`), as cva (`inputVariants`, `textareaVariants`, `selectTriggerVariants`, which replace the
  old `inputStyles` / `textareaStyles` / `selectStyles.trigger`), with `data-variant` / `data-size` on the element.
  Input's `size` replaces the `<input>` attribute.
- Field passes `size` and `variant` to its control through `@/lib/field-context` (new core file, in
  `rasengan-core`): a control's own props win. `size` also scales the Field's label, texts and gaps.
- Tokens: `--field-filled`, `--field-filled-hover`, `--field-filled-edge` (Iwa draws its border on the filled well).
- `cn()` now knows the contract's spacing names (`h-control-sm`, `px-input-x`, `size-indicator`…): before, a later
  `px-0` or `h-auto` did not replace them and the CSS order decided.
- Site: `<ComponentPreview name demo>` shows a component's other demos (`<name>-variants.demo.tsx`…);
  `pnpm screenshots` captures each as `<demo>--<combo>.png`.

## Lot 2 — state controls (done 2026-10-30)

- Checkbox, Radio group (on the group, items may override), Switch, Slider: `tone` (default `primary`) and `size`
  (`sm`, `default`, `lg`; indicators at `--indicator-sm/md/lg`). Switch and Slider read `--thumb-size` so the thumb's
  travel follows the size.
- Progress: `variant` (`default` grey track, `soft` track washed with the bar's tone), `tone`, `size` (track height).
- Toggle (and Toggle group through its context): `soft`, pressed as a primary wash.
- New token `--{tone}-border` / `--tone-border` (`border-tone-border`): the edge of a control filled with the tone,
  3:1 on the page. The colour itself, except `warning`, whose amber is too light: its text colour. `pnpm contrast`
  checks it on the page and on a card.
- Exports: `checkboxVariants`, `radioVariants`, `switchVariants`, `sliderVariants`, `progressVariants` (the old
  `*Styles.root` / `.item` are gone).

## Lot 3 — display (done 2026-10-30)

- Button: `soft`, `tone` (default `primary`), `icon-sm` / `icon-lg`. Tones go through compoundVariants so that
  `variant="destructive"` (= default + destructive tone) never meets a second tone class, `secondary` ignores the tone,
  and `outline` / `ghost` keep shadcn's neutral look in `primary` (other tones colour their text and edge). `link`'s
  `h-auto px-0` now comes after the size (it used to lose to `h-control px-control-x`).
- Badge: `soft`, `tone`, `size`, same rules as Button.
- Alert: `soft` and `outline`, `tone` (default `neutral`; on `default` it colours the icon and title); `destructive`
  kept as it was. The description stays in the foreground on a soft wash.
- Card: `variant` (`default`, `outline`, `ghost`, `elevated`) and `size` (`sm`, `default`, read by the parts through
  `group/card`). Avatar: cva, `xl` added. Separator: `dashed`.
- Exports: `cardVariants`, `avatarVariants`, `separatorVariants` (old `cardStyles.root`, `avatarStyles.root`,
  `separatorStyles` gone).

## Lot 4 — navigation and overlays (done 2026-10-30)

- Tabs: `variant` (`default` segmented, `underline`, `pills`) and `size` on `Tabs`, read by the list and tabs through a
  React context (not group selectors, so a nested Tabs keeps its own). `underline` and `pills` set
  `--tabs-list-padding: 0` so the tabs' height formula holds.
- Accordion: `variant` (`default`, `outline`, `separated`), through a context to the items.
- Dialog: `size` on `DialogContent` (`sm`, `default`, `lg`, `full`). Alert dialog: `sm`, `default`, `lg`, no `full`;
  its Action and Cancel pass `tone` to the Button.
- Toast: each type wears its tone (icon; error title too); `<Toaster variant="soft">` adds a wash of it over the opaque
  popover. A page can mount a second `<Toaster id>` and target it with `toasterId` (Sonner 2).
- Tooltip: `variant` (`default` inverted, `outline` on a popover surface, the arrow bordered on its outer edges).
- Exports: `tabsListVariants`, `tabsTriggerVariants`, `accordionVariants`, `dialogContentVariants`,
  `alertDialogContentVariants`, `tooltipVariants` (the old `.list`, `.tab`, `.root`, `.item`, `.popup` styles are gone).

All four lots done. Left: re-accept the screenshot baseline (new demo shots; the overlays' `-open` shots carry the
sidebar's CLI section added after the baseline), then Figma.

## Matrix

| Component | variant | tone | size |
| --- | --- | --- | --- |
| **Lot 1 — form fields** | | | |
| Input | default, filled, underline | — (invalid covers errors) | sm, default, lg |
| Textarea | default, filled, underline | — | sm, default, lg (text and padding) |
| Select (trigger) | default, filled, underline, ghost | — | sm, default, lg |
| Field | — | — | passes `size` to its control through context |
| **Lot 2 — state controls** | | | |
| Checkbox | — | primary…destructive | sm, default, lg |
| Radio Group | — | idem | sm, default, lg (through context) |
| Switch | — | idem | sm, default, lg |
| Slider | — | idem | sm, default, lg |
| Progress | default, soft (lighter track) | idem | sm, default, lg (bar height) |
| Toggle / Toggle Group | default, outline, + soft | — | already there, + lg checked |
| **Lot 3 — display** | | | |
| Button | + soft | all tones (except on secondary) | + `icon-sm`, `icon-lg` |
| Badge | + soft | all | sm, default, lg |
| Alert | default, soft, outline (+ destructive alias) | all | — |
| Card | default, outline, ghost, elevated | — | sm, default (padding) |
| Avatar | — | — | already sm/default/lg, moved to cva + xl |
| Separator | default, dashed | — | — |
| **Lot 4 — navigation and overlays** | | | |
| Tabs | default (segmented), underline, pills | — | sm, default, lg |
| Accordion | default, outline, separated | — | — |
| Dialog / Alert Dialog | — | — | sm, default, lg, full |
| Toast | default, soft | follows the toast type (success/warning/info/error) | — |
| Tooltip | default, outline | — | — |
| Dropdown Menu | — | items: `variant="destructive"` stays | — |

Out of scope: Label, Collapsible, Scroll Area, Skeleton, Popover (no meaningful axis).

## Per lot

1. Styles in `<name>.styles.ts` (cva), props in `<name>.base.tsx`, `data-variant` / `data-size` / `data-tone` on the
   root for villages and descendants.
2. Demo: a "Variants" section per axis on each page (`<ComponentPreview name="button-variants">`…), API table updated.
3. Check: `pnpm typecheck`, `pnpm registry`, `pnpm contrast`, `pnpm axe`, `pnpm screenshots` (new shots per variant,
   baseline accepted after review), and the CLI (`pnpm playground ui diff` shows the changes as `behind`).
