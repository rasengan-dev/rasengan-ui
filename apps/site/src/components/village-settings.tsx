import { Moon, Palette, Sun } from 'lucide-react';
import { natures, tints, villages, type Nature, type Tint, type Village } from '@rasengan-ui/villages';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setSettings, useSettings } from '@/settings';
import { cn } from '@/lib/utils';

const villageItems = Object.fromEntries(Object.entries(villages).map(([name, v]) => [name, v.title])) as Record<Village, string>;
const natureItems = Object.fromEntries(Object.entries(natures).map(([name, n]) => [name, n.title])) as Record<Nature, string>;
const tintItems = Object.fromEntries(Object.entries(tints).map(([name, t]) => [name, t.title])) as Record<Tint, string>;

/** A dot in the nature's own primary, whatever the page wears. */
function NatureDot({ nature }: { nature: Nature }) {
  return <span data-nature={nature} className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />;
}

const trigger = 'h-control-sm w-auto gap-1.5 text-sm';

/** The three axes as selectors: village, nature, greys. `stacked` lays them out as labelled fields. */
export function VillageSelectors({ stacked = false, className }: { stacked?: boolean; className?: string }) {
  const { village, nature, tint } = useSettings();

  const selects = [
    <Select key="village" items={villageItems} value={village} onValueChange={(value) => setSettings({ village: value as Village })}>
      <SelectTrigger aria-label={stacked ? undefined : 'Village'} className={cn(trigger, stacked && 'w-full')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(villages) as Village[]).map((name) => (
          <SelectItem key={name} value={name}>
            {villages[name].title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
    <Select key="nature" items={natureItems} value={nature} onValueChange={(value) => setSettings({ nature: value as Nature })}>
      <SelectTrigger aria-label={stacked ? undefined : 'Nature'} className={cn(trigger, stacked && 'w-full')}>
        <SelectValue>
          {(value: Nature) => (
            <span className="flex items-center gap-2">
              <NatureDot nature={value} />
              {natures[value].title}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(natures) as Nature[]).map((name) => (
          <SelectItem key={name} value={name}>
            <span className="flex items-center gap-2">
              <NatureDot nature={name} />
              {natures[name].title}
              <span className="text-muted-foreground">{natures[name].element}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
    <Select key="tint" items={tintItems} value={tint} onValueChange={(value) => setSettings({ tint: value as Tint })}>
      <SelectTrigger aria-label={stacked ? undefined : 'Greys'} className={cn(trigger, stacked && 'w-full')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(tints) as Tint[]).map((name) => (
          <SelectItem key={name} value={name}>
            {tints[name].title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
  ];

  if (!stacked) return <div className={cn('flex items-center gap-1.5', className)}>{selects}</div>;
  return (
    <div className={cn('grid gap-3', className)}>
      {selects.map((select, i) => (
        <Field key={select.key}>
          <FieldLabel>{['Village', 'Nature', 'Greys'][i]}</FieldLabel>
          {select}
        </Field>
      ))}
    </div>
  );
}

/** Below `md`, the selectors move into a popover behind one button. */
export function VillageSettingsPopover({ className }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Village settings" className={className} />}>
        <Palette />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <PopoverTitle className="sr-only">Village settings</PopoverTitle>
        <VillageSelectors stacked />
      </PopoverContent>
    </Popover>
  );
}

export function SchemeToggle() {
  const { dark } = useSettings();
  return (
    <Button variant="ghost" size="icon" aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={() => setSettings({ dark: !dark })}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
