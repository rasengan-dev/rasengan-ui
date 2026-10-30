import { natures, villages, type Nature, type Village } from '@rasengan-ui/villages';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { setSettings, useSettings } from '@/settings';

/** Beside the examples: the village as a segmented control and the natures as swatches, both for the whole page. */
export function VillageSwitch({ className }: { className?: string }) {
  const { village, nature } = useSettings();
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <ToggleGroup
        variant="outline"
        size="sm"
        value={[village]}
        onValueChange={(value) => value[0] && setSettings({ village: value[0] as Village })}
        aria-label="Village"
      >
        {(Object.keys(villages) as Village[]).map((name) => (
          <ToggleGroupItem key={name} value={name}>
            {villages[name].title}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <TooltipProvider>
        <div role="radiogroup" aria-label="Nature" className="flex items-center gap-1">
          {(Object.keys(natures) as Nature[]).map((name) => (
            <Tooltip key={name}>
              <TooltipTrigger
                role="radio"
                aria-checked={nature === name}
                aria-label={natures[name].title}
                onClick={() => setSettings({ nature: name })}
                className={cn(
                  'grid size-7 cursor-pointer place-items-center rounded-full outline-none focus-visible:focus-ring',
                  nature === name && 'ring-2 ring-foreground/60',
                )}
              >
                <span data-nature={name} className="size-4 rounded-full bg-primary" />
              </TooltipTrigger>
              <TooltipContent>
                {natures[name].title} · {natures[name].element}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
