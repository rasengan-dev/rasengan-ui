import type { ReactNode } from 'react';
import { ActivityIcon, ContrastIcon, LayersIcon, MapPinIcon, Rows3Icon, Settings2Icon, SquareIcon } from 'lucide-react';
import { builtinRecipes, options, traitOptions, type Base, type BaseRecipe, type Recipe, type Traits } from '@rasengan-ui/villages/engine';
import { fonts } from '@rasengan-ui/villages/fonts';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

/** The recipe's value for a knob, or its base's. */
export function knobs(recipe: Recipe) {
  const base: BaseRecipe = builtinRecipes[recipe.base ?? 'konoha'];
  return {
    base,
    brand: recipe.brand ?? base.brand,
    neutrals: { ...base.neutrals, ...recipe.neutrals },
    contrast: recipe.contrast ?? base.contrast,
    radius: recipe.radius ?? base.radius,
    density: recipe.density ?? base.density,
    depth: recipe.depth ?? base.depth,
    motion: recipe.motion ?? base.motion,
    border: recipe.border ?? base.border,
    fonts: { ...base.fonts, ...recipe.fonts },
    traits: { ...base.traits, ...recipe.traits },
  };
}

/** The radius knob as the engine writes it (resolve.ts): 0.5 is 0.625rem, 1 is 1rem. */
const radiusRem = (r: number) => Math.round((r <= 0.5 ? r * 1.25 : 0.625 + (r - 0.5) * 0.75) * 1000) / 1000;

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[^a-z]+|-+$/g, '');

export const bases: { id: Base; hint: string }[] = [
  { id: 'konoha', hint: 'Warm, rounded, balanced' },
  { id: 'kiri', hint: 'Soft contrast, glass, airy' },
  { id: 'iwa', hint: 'Square, ink borders, mono labels' },
  { id: 'kusa', hint: 'Chunky 3D, on a lip' },
];

/** Brand colours to start from; any other is a colour pick away. */
export const swatches = [
  { name: 'Ember', color: '#ff5a1f' },
  { name: 'Gold', color: '#f5c518' },
  { name: 'Leaf', color: '#22c55e' },
  { name: 'Teal', color: '#14b8a6' },
  { name: 'Tide', color: '#0ea5e9' },
  { name: 'Indigo', color: '#4f46e5' },
  { name: 'Plum', color: '#7c3aed' },
  { name: 'Rose', color: '#db2777' },
];

const labels: Record<string, string> = {
  soft: 'Soft',
  standard: 'Standard',
  high: 'High',
  compact: 'Compact',
  default: 'Default',
  comfortable: 'Airy',
  flat: 'Flat',
  raised: 'Raised',
  hard: 'Hard',
  lip: 'Lip',
  quick: 'Quick',
  calm: 'Calm',
  gentle: 'Gentle',
  bouncy: 'Bouncy',
  segmented: 'Segmented',
  bar: 'Bar',
  inverted: 'Inverted',
  halo: 'Halo',
  ring: 'Ring',
  scale: 'Scale',
  sink: 'Sink',
  drop: 'Drop',
  plain: 'Plain',
  capitals: 'Caps',
  'mono-capitals': 'Mono caps',
  solid: 'Solid',
  glass: 'Glass',
  ink: 'Ink',
  pulse: 'Pulse',
  hatched: 'Hatched',
};
const label = (value: string | number) => (typeof value === 'number' ? `${value}px` : (labels[value] ?? value));

const traitLabels: Record<keyof Traits, string> = {
  tabs: 'Tabs',
  highlight: 'Highlight',
  focus: 'Focus',
  press: 'Press',
  labels: 'Control labels',
  headings: 'Headings',
  surfaces: 'Surfaces',
  edges: 'Edges',
  skeleton: 'Loading',
};

/* One setting per row, as a label over its value and a hint of it on the right; the row opens a menu beside it. */
const row =
  'flex w-full cursor-pointer items-center justify-between gap-3 rounded-control px-3 py-2 text-start outline-none transition-colors duration-fast hover:bg-accent focus-visible:focus-ring data-[popup-open]:bg-accent';

function RowBody({ name, value, hint }: { name: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <>
      <span className="grid min-w-0 gap-0.5">
        <span className="text-xs text-muted-foreground">{name}</span>
        <span className="truncate text-sm font-medium">{value}</span>
      </span>
      <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">{hint}</span>
    </>
  );
}

function MenuRow<T extends string | number>({ name, value, values, onChange, hint, describe }: { name: string; value: T; values: readonly T[]; onChange: (value: T) => void; hint?: ReactNode; describe?: (value: T) => string }) {
  const shown = describe?.(value) ?? label(value);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<button type="button" className={row} aria-label={`${name}: ${shown}`} />}>
        <RowBody name={name} value={shown} hint={hint} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" sideOffset={14} className="min-w-52">
        <DropdownMenuRadioGroup
          value={String(value)}
          onValueChange={(next) => {
            const picked = values.find((v) => String(v) === String(next));
            if (picked !== undefined) onChange(picked);
          }}
        >
          {values.map((v) => (
            <DropdownMenuRadioItem key={String(v)} value={String(v)}>
              {describe?.(v) ?? label(v)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PopoverRow({ name, value, hint, title, description, children }: { name: string; value: string; hint?: ReactNode; title: string; description?: string; children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger render={<button type="button" className={row} aria-label={`${name}: ${value}`} />}>
        <RowBody name={name} value={value} hint={hint} />
      </PopoverTrigger>
      <PopoverContent side="right" align="start" sideOffset={14} className="grid w-80 gap-4">
        <div className="grid gap-1">
          <PopoverTitle>{title}</PopoverTitle>
          {description ? <PopoverDescription>{description}</PopoverDescription> : null}
        </div>
        {children}
      </PopoverContent>
    </Popover>
  );
}

function Range({ name, value, display, min, max, step, onChange }: { name: string; value: number; display: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{display}</span>
      </div>
      <Slider aria-label={name} value={value} min={min} max={max} step={step} onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))} />
    </div>
  );
}

const Dot = ({ color }: { color: string }) => <span className="size-4 rounded-full ring-1 ring-foreground/20 ring-inset" style={{ background: color }} aria-hidden />;

export interface RecipePanelProps {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
  nameError?: string;
  /** The buttons at the bottom: copy the link, reset, shuffle, export. */
  actions?: ReactNode;
  className?: string;
}

/** The recipe as a menu, after shadcn's /create: a row per knob, a menu beside each, the actions at the bottom. */
export function RecipePanel({ recipe, onChange, nameError, actions, className }: RecipePanelProps) {
  const k = knobs(recipe);
  const set = (patch: Partial<Recipe>) => onChange({ ...recipe, ...patch });
  const brandColor = k.brand.color;
  const fontNames = Object.keys(fonts);
  const changedTraits = (Object.keys(traitOptions) as (keyof Traits)[]).filter((t) => recipe.traits?.[t] !== undefined && recipe.traits[t] !== k.base.traits[t]).length;
  const r = radiusRem(k.radius);

  return (
    <div className={cn('flex min-h-0 flex-col', className)}>
      <div className="grid gap-1.5 border-b-(length:--border-width) p-3">
        <label htmlFor="village-name" className="px-1 text-xs text-muted-foreground">
          Village
        </label>
        <Input
          id="village-name"
          value={recipe.title ?? ''}
          placeholder="Acme"
          aria-invalid={nameError ? true : undefined}
          aria-describedby="village-name-hint"
          onChange={(event) => {
            const title = event.target.value;
            set({ title, name: slugOf(title) });
          }}
        />
        <p id="village-name-hint" className={cn('px-1 text-xs', nameError ? 'tone-destructive text-tone-text' : 'font-mono text-muted-foreground')}>
          {nameError ?? `data-village="${recipe.name || '…'}"`}
        </p>
      </div>

      <div className="hide-scrollbar grid min-h-0 flex-1 content-start gap-0.5 overflow-y-auto p-1.5">
        <MenuRow
          name="Base"
          value={recipe.base ?? 'konoha'}
          values={bases.map((b) => b.id)}
          describe={(id) => builtinRecipes[id].title}
          hint={<MapPinIcon />}
          onChange={(base) => onChange({ name: recipe.name, title: recipe.title, description: recipe.description, base, ...(recipe.brand ? { brand: recipe.brand } : {}) })}
        />

        <PopoverRow
          name="Brand colour"
          value={brandColor ?? `${k.base.title}'s nature`}
          hint={<Dot color={brandColor ?? 'var(--primary)'} />}
          title="Brand colour"
          description={`Any colour. If text on it would be hard to read, it is adjusted as little as possible. Empty: ${k.base.title}'s own colour.`}
        >
          <div role="radiogroup" aria-label="Brand colour" className="grid grid-cols-8 gap-1.5">
            {swatches.map((s) => {
              const on = brandColor?.toLowerCase() === s.color;
              return (
                <button
                  key={s.name}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={s.name}
                  title={s.name}
                  onClick={() => set({ brand: { color: s.color } })}
                  className={cn('aspect-square cursor-pointer rounded-control outline-none focus-visible:focus-ring', on ? 'ring-2 ring-foreground ring-offset-2 ring-offset-popover' : 'ring-1 ring-foreground/15 ring-inset')}
                  style={{ background: s.color }}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <label className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-control ring-1 ring-foreground/20 ring-inset focus-within:focus-ring" style={{ background: brandColor ?? 'var(--primary)' }}>
              <span className="sr-only">Pick a colour</span>
              <input type="color" className="absolute inset-0 cursor-pointer opacity-0" value={brandColor && /^#[0-9a-f]{6}$/i.test(brandColor) ? brandColor : '#ff5a1f'} onChange={(event) => set({ brand: { color: event.target.value } })} />
            </label>
            <Input
              aria-label="Brand colour value"
              className="font-mono"
              placeholder="#rrggbb, rgb(…), oklch(…)"
              value={brandColor ?? ''}
              onChange={(event) => set(event.target.value ? { brand: { color: event.target.value } } : { brand: undefined })}
            />
          </div>
          {brandColor ? (
            <Button variant="ghost" size="sm" className="justify-self-start" onClick={() => set({ brand: undefined })}>
              Use {k.base.title}'s nature instead
            </Button>
          ) : null}
        </PopoverRow>

        <PopoverRow
          name="Neutrals"
          value={`${Math.round(k.neutrals.hue)}° · ${Math.round(k.neutrals.chroma * 100)}% tint`}
          hint={<Dot color={`oklch(0.72 ${Math.min(0.12, 0.05 * k.neutrals.chroma)} ${k.neutrals.hue})`} />}
          title="Neutrals"
          description="The greys of backgrounds, borders and text: their hue, and how tinted they are."
        >
          <Range name="Grey hue" value={k.neutrals.hue} display={`${Math.round(k.neutrals.hue)}°`} min={0} max={360} step={1} onChange={(hue) => set({ neutrals: { ...recipe.neutrals, hue, inkHue: undefined } })} />
          <Range name="Tint" value={k.neutrals.chroma} display={`${Math.round(k.neutrals.chroma * 100)}%`} min={0} max={2} step={0.05} onChange={(chroma) => set({ neutrals: { ...recipe.neutrals, chroma } })} />
        </PopoverRow>

        <MenuRow name="Contrast" value={k.contrast} values={options.contrast} hint={<ContrastIcon />} onChange={(contrast) => set({ contrast })} />

        <PopoverRow
          name="Radius"
          value={`${r}rem`}
          hint={<span className="size-4 border-2 border-current" style={{ borderRadius: `${Math.min(r * 10, 8)}px` }} aria-hidden />}
          title="Radius"
          description="0 is square; Konoha is 0.625rem, Kiri 1rem."
        >
          <Range name="Radius" value={k.radius} display={`${r}rem`} min={0} max={1} step={0.05} onChange={(radius) => set({ radius })} />
        </PopoverRow>

        <MenuRow name="Border width" value={k.border} values={options.border} hint={<SquareIcon style={{ strokeWidth: k.border * 1.5 }} />} onChange={(border) => set({ border })} />

        <MenuRow
          name="Heading font"
          value={k.fonts.heading}
          values={fontNames}
          hint={<span className="text-sm font-semibold" style={{ fontFamily: `"${k.fonts.heading}"` }}>Aa</span>}
          describe={(f) => f}
          onChange={(heading) => set({ fonts: { ...recipe.fonts, heading } })}
        />
        <MenuRow
          name="Body font"
          value={k.fonts.body}
          values={fontNames}
          hint={<span className="text-sm" style={{ fontFamily: `"${k.fonts.body}"` }}>Aa</span>}
          describe={(f) => f}
          onChange={(body) => set({ fonts: { ...recipe.fonts, body } })}
        />

        <MenuRow name="Density" value={k.density} values={options.density} hint={<Rows3Icon />} onChange={(density) => set({ density })} />
        <MenuRow name="Depth" value={k.depth} values={options.depth} hint={<LayersIcon />} onChange={(depth) => set({ depth })} />
        <MenuRow name="Motion" value={k.motion} values={options.motion} hint={<ActivityIcon />} onChange={(motion) => set({ motion })} />

        <PopoverRow
          name="Traits"
          value={changedTraits ? `${changedTraits} changed from ${k.base.title}` : `As ${k.base.title}`}
          hint={<Settings2Icon />}
          title="Traits"
          description="How tabs, focus, labels, surfaces and other details look. Any you leave come from the base village."
        >
          <div className="grid gap-3">
            {(Object.keys(traitOptions) as (keyof Traits)[]).map((trait) => (
              <div key={trait} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="text-sm" id={`trait-${trait}`}>
                  {traitLabels[trait]}
                </span>
                <ToggleGroup
                  variant="outline"
                  size="sm"
                  value={[k.traits[trait]]}
                  onValueChange={(next) => next[0] && set({ traits: { ...recipe.traits, [trait]: next[0] } })}
                  aria-labelledby={`trait-${trait}`}
                >
                  {(traitOptions[trait] as readonly string[]).map((v) => (
                    <ToggleGroupItem key={v} value={v}>
                      {label(v)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            ))}
          </div>
        </PopoverRow>
      </div>

      {actions ? <div className="grid gap-1.5 border-t-(length:--border-width) p-3">{actions}</div> : null}
    </div>
  );
}
