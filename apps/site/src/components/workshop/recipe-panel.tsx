import type { ReactNode } from 'react';
import { CheckIcon } from 'lucide-react';
import { builtinRecipes, options, traitOptions, type Base, type BaseRecipe, type Recipe, type Traits } from '@rasengan-ui/villages/engine';
import { fonts } from '@rasengan-ui/villages/fonts';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
const radiusRem = (r: number) => `${Math.round((r <= 0.5 ? r * 1.25 : 0.625 + (r - 0.5) * 0.75) * 1000) / 1000}rem`;

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[^a-z]+|-+$/g, '');

const bases: { id: Base; hint: string }[] = [
  { id: 'konoha', hint: 'Warm, rounded and balanced.' },
  { id: 'kiri', hint: 'Soft contrast, glass, airy controls.' },
  { id: 'iwa', hint: 'Square, ink borders, mono labels, dense.' },
];

/** Brand colours to start from; any other is a colour pick away. */
const swatches = [
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
  quick: 'Quick',
  calm: 'Calm',
  gentle: 'Gentle',
  segmented: 'Segmented',
  bar: 'Bar',
  inverted: 'Inverted',
  halo: 'Halo',
  ring: 'Ring',
  scale: 'Scale',
  sink: 'Sink',
  plain: 'Plain',
  capitals: 'Caps',
  'mono-capitals': 'Mono caps',
  solid: 'Solid',
  glass: 'Glass',
  ink: 'Ink',
  pulse: 'Pulse',
  hatched: 'Hatched',
};

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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-b-(length:--border-width) px-5 py-5 last:border-b-0">
      <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{title}</h2>
      {children}
    </section>
  );
}

function Choice<T extends string | number>({ label, value, values, onChange, inline }: { label: string; value: T; values: readonly T[]; onChange: (value: T) => void; inline?: boolean }) {
  return (
    <div className={cn('grid gap-2', inline && 'grid-cols-[minmax(0,1fr)_auto] items-center')}>
      <span className="text-sm font-medium" id={`choice-${label}`}>
        {label}
      </span>
      <ToggleGroup
        variant="outline"
        size="sm"
        value={[String(value)]}
        onValueChange={(next) => {
          const picked = values.find((v) => String(v) === next[0]);
          if (picked !== undefined) onChange(picked);
        }}
        aria-labelledby={`choice-${label}`}
        className="flex-wrap"
      >
        {values.map((v) => (
          <ToggleGroupItem key={String(v)} value={String(v)}>
            {typeof v === 'number' ? `${v}px` : (labels[v as string] ?? v)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function Range({ label, value, display, min, max, step, onChange }: { label: string; value: number; display: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{display}</span>
      </div>
      <Slider aria-label={label} value={value} min={min} max={max} step={step} onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))} />
    </div>
  );
}

export function RecipePanel({ recipe, onChange, nameError }: { recipe: Recipe; onChange: (recipe: Recipe) => void; nameError?: string }) {
  const k = knobs(recipe);
  const set = (patch: Partial<Recipe>) => onChange({ ...recipe, ...patch });
  const brandColor = k.brand.color;
  const fontItems = Object.fromEntries(Object.keys(fonts).map((name) => [name, name]));

  return (
    <div className="flex flex-col">
      <Section title="Identity">
        <Field invalid={Boolean(nameError)}>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={recipe.title ?? ''}
            placeholder="Acme"
            onChange={(event) => {
              const title = event.target.value;
              set({ title, name: slugOf(title) });
            }}
          />
          <FieldDescription>
            {nameError ?? (
              <>
                <code className="font-mono text-xs">data-village="{recipe.name || '…'}"</code>
              </>
            )}
          </FieldDescription>
        </Field>
        <div className="grid gap-2">
          <span className="text-sm font-medium" id="base-label">
            Start from
          </span>
          <div role="radiogroup" aria-labelledby="base-label" className="grid gap-2">
            {bases.map(({ id, hint }) => {
              const on = (recipe.base ?? 'konoha') === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => onChange({ name: recipe.name, title: recipe.title, description: recipe.description, base: id, ...(recipe.brand ? { brand: recipe.brand } : {}) })}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-control border-village px-3 py-2.5 text-start outline-none transition-colors duration-fast focus-visible:focus-ring',
                    on ? 'border-primary bg-primary/10' : 'hover:bg-accent',
                  )}
                >
                  <span className="grid min-w-0 flex-1 gap-0.5">
                    <span className="text-sm font-semibold">{builtinRecipes[id].title}</span>
                    <span className="text-xs text-muted-foreground">{hint}</span>
                  </span>
                  {on ? <CheckIcon className="size-4 text-primary" aria-hidden /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="Brand colour">
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
                className={cn('aspect-square min-h-8 cursor-pointer rounded-control outline-none focus-visible:focus-ring', on ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : 'ring-1 ring-foreground/10 ring-inset')}
                style={{ background: s.color }}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <label className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-control ring-1 ring-foreground/15 ring-inset focus-within:focus-ring" style={{ background: brandColor ?? 'var(--primary)' }}>
            <span className="sr-only">Pick a colour</span>
            <input type="color" className="absolute inset-0 cursor-pointer opacity-0" value={brandColor && /^#[0-9a-f]{6}$/i.test(brandColor) ? brandColor : '#ff5a1f'} onChange={(event) => set({ brand: { color: event.target.value } })} />
          </label>
          <Input
            aria-label="Brand colour value"
            className="font-mono"
            placeholder={`${k.base.title}'s nature`}
            value={brandColor ?? ''}
            onChange={(event) => set(event.target.value ? { brand: { color: event.target.value } } : { brand: undefined })}
          />
        </div>
        <p className="text-xs text-muted-foreground">#rrggbb, rgb(…) or oklch(…). Empty: {k.base.title}'s own nature ({k.base.brand.nature}).</p>
      </Section>

      <Section title="Neutrals">
        <Range
          label="Grey hue"
          value={k.neutrals.hue}
          display={`${Math.round(k.neutrals.hue)}°`}
          min={0}
          max={360}
          step={1}
          onChange={(hue) => set({ neutrals: { ...recipe.neutrals, hue, inkHue: undefined } })}
        />
        <Range label="Tint" value={k.neutrals.chroma} display={`${Math.round(k.neutrals.chroma * 100)}%`} min={0} max={2} step={0.05} onChange={(chroma) => set({ neutrals: { ...recipe.neutrals, chroma } })} />
        <Choice label="Contrast" value={k.contrast} values={options.contrast} onChange={(contrast) => set({ contrast })} />
      </Section>

      <Section title="Shape">
        <Range label="Radius" value={k.radius} display={radiusRem(k.radius)} min={0} max={1} step={0.05} onChange={(radius) => set({ radius })} />
        <Choice label="Border width" value={k.border} values={options.border} onChange={(border) => set({ border })} />
      </Section>

      <Section title="Type">
        {(['body', 'heading'] as const).map((role) => (
          <Field key={role}>
            <FieldLabel>{role === 'body' ? 'Body font' : 'Heading font'}</FieldLabel>
            <Select items={fontItems} value={k.fonts[role]} onValueChange={(value) => value && set({ fonts: { ...recipe.fonts, [role]: value as string } })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(fonts).map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ))}
      </Section>

      <Section title="Feel">
        <Choice label="Density" value={k.density} values={options.density} onChange={(density) => set({ density })} />
        <Choice label="Depth" value={k.depth} values={options.depth} onChange={(depth) => set({ depth })} />
        <Choice label="Motion" value={k.motion} values={options.motion} onChange={(motion) => set({ motion })} />
      </Section>

      <Section title="Traits">
        {(Object.keys(traitOptions) as (keyof Traits)[]).map((trait) => (
          <Choice
            key={trait}
            inline
            label={traitLabels[trait]}
            value={k.traits[trait]}
            values={traitOptions[trait] as readonly string[]}
            onChange={(value) => set({ traits: { ...recipe.traits, [trait]: value } })}
          />
        ))}
      </Section>
    </div>
  );
}
