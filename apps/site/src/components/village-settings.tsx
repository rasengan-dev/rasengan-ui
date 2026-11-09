import { useId } from 'react';
import { Moon, Palette, Sun } from 'lucide-react';
import { natures, tints, villages, type Nature, type Tint, type Village } from '@rasengan-ui/villages';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { setSettings, useSettings, type Settings } from '@/settings';
import { cn } from '@/lib/utils';

/** A dot in the nature's own primary, whatever the page wears. */
function NatureDot({ nature, className }: { nature: Nature; className?: string }) {
  return <span data-nature={nature} className={cn('size-2.5 shrink-0 rounded-full bg-primary', className)} aria-hidden />;
}

/*
 * An option of a radio group drawn as a card: the whole card is the label, the radio shows the choice. The picked card
 * takes the primary's border on the muted fill, where the muted text keeps 4.5:1 (pnpm contrast checks that pair).
 */
const option =
  'flex cursor-pointer items-start gap-3 rounded-lg border-village p-3 transition-colors duration-fast hover:bg-muted has-data-[checked]:border-primary has-data-[checked]:bg-muted';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-2">
      <h3 id={id} className="font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

/** A theme other than the page's: a block preview's, a gallery's. Left out, the controls set the whole page. */
export interface ThemeControl {
  value: Settings;
  onChange: (patch: Partial<Settings>) => void;
}

/** The page's theme, or the one passed in. */
function useTheme(control?: ThemeControl) {
  const page = useSettings();
  return control ?? { value: page, onChange: setSettings };
}

/** The three axes with every option in view: villages with what they are, natures with their element, the greys. */
export function ThemeOptions({ control }: { control?: ThemeControl } = {}) {
  const {
    value: { village, nature, tint },
    onChange: setSettings,
  } = useTheme(control);
  const id = useId();

  return (
    <div className="grid gap-5">
      <Section id={`${id}-village`} title="Village">
        <RadioGroup
          aria-labelledby={`${id}-village`}
          value={village}
          onValueChange={(value) => setSettings({ village: value as Village })}
          className="gap-2"
        >
          {(Object.keys(villages) as Village[]).map((name) => (
            <label key={name} className={option}>
              <RadioGroupItem value={name} className="mt-0.5" />
              <span className="grid gap-0.5">
                <span className="text-sm font-medium">{villages[name].title}</span>
                <span className="text-xs leading-snug text-muted-foreground">{villages[name].description}</span>
              </span>
            </label>
          ))}
        </RadioGroup>
      </Section>

      <Section id={`${id}-nature`} title="Nature">
        <RadioGroup
          aria-labelledby={`${id}-nature`}
          value={nature}
          onValueChange={(value) => setSettings({ nature: value as Nature })}
          size="sm"
          className="grid-cols-2 gap-2"
        >
          {(Object.keys(natures) as Nature[]).map((name) => (
            <label key={name} className={cn(option, 'items-center gap-2.5 p-2.5')}>
              <RadioGroupItem value={name} />
              <NatureDot nature={name} className="size-3" />
              <span className="grid">
                <span className="text-sm font-medium">{natures[name].title}</span>
                <span className="text-xs text-muted-foreground">{natures[name].element}</span>
              </span>
            </label>
          ))}
        </RadioGroup>
      </Section>

      <Section id={`${id}-tint`} title="Greys">
        <ToggleGroup
          aria-labelledby={`${id}-tint`}
          variant="outline"
          size="sm"
          value={[tint]}
          // One is always picked: pressing the current one again keeps it.
          onValueChange={(values: string[]) => values[0] && setSettings({ tint: values[0] as Tint })}
          className="w-full *:flex-1"
        >
          {(Object.keys(tints) as Tint[]).map((name) => (
            <ToggleGroupItem key={name} value={name}>
              {tints[name].title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Section>
    </div>
  );
}

/** One button for the village, nature and greys: it shows the current pair and opens every option. */
export function ThemePopover({
  className,
  side = 'bottom',
  control,
  label = 'Theme',
  description = 'The whole page and every demo wear it. Kept in this browser.',
}: {
  className?: string;
  side?: 'top' | 'bottom';
  control?: ThemeControl;
  label?: string;
  description?: string;
}) {
  const {
    value: { village, nature },
  } = useTheme(control);
  return (
    <Popover>
      {/* Named by its text ("Theme Kiri Katon"): what is hidden on small screens is still read, so the visible words stay in the name. */}
      <PopoverTrigger render={<Button variant="ghost" size="sm" className={cn('gap-2', className)} />}>
        <span className="sr-only">{label}</span>
        <Palette className="sm:hidden" />
        <NatureDot nature={nature} className="hidden sm:block" />
        <span className="sr-only sm:not-sr-only">{villages[village].title}</span>
        <span className="sr-only text-muted-foreground md:not-sr-only">{natures[nature].title}</span>
      </PopoverTrigger>
      {/* Portaled to <body>, away from --header-height: Base UI's --available-height bounds it, as in the mobile menu. */}
      <PopoverContent side={side} align="end" sideOffset={8} className="max-h-(--available-height) w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain">
        <div className="mb-4 grid gap-1">
          <PopoverTitle>{label}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </div>
        <ThemeOptions control={control} />
      </PopoverContent>
    </Popover>
  );
}

export function SchemeToggle({ control, className }: { control?: ThemeControl; className?: string }) {
  const {
    value: { dark },
    onChange,
  } = useTheme(control);
  return (
    <Button variant="ghost" size="icon" className={className} aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={() => onChange({ dark: !dark })}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
