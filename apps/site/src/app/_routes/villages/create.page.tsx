import { useEffect, useState } from 'react';
import { type PageComponent } from 'rasengan';
import {
  CheckIcon,
  ChevronsUpDownIcon,
  CircleAlertIcon,
  Columns2Icon,
  LinkIcon,
  LoaderIcon,
  MoonIcon,
  RotateCcwIcon,
  ShuffleIcon,
  SlidersHorizontalIcon,
  SunIcon,
} from 'lucide-react';
import { options, recipeFromLink, recipeLink, traitOptions, type Recipe, type Village } from '@rasengan-ui/villages/engine';
import { fontInfo, fonts } from '@rasengan-ui/villages/fonts';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/components/ui/toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { VillageScope, type VillageSettings } from '@/lib/village-scope';
import { cn } from '@/lib/utils';
import { AuthenticationExample } from '@/components/home/authentication';
import { DashboardExample } from '@/components/home/dashboard';
import { SettingsExample } from '@/components/home/settings';
import { ExportDialog } from '@/components/workshop/export-dialog';
import { PreviewCards } from '@/components/workshop/preview-cards';
import { RecipePanel, bases, knobs, swatches } from '@/components/workshop/recipe-panel';
import { Report } from '@/components/workshop/report';
import { useVillage, type VillageState } from '@/components/workshop/use-village';
import { useSettings } from '@/settings';

const initial: Recipe = { name: 'acme', title: 'Acme', base: 'konoha', brand: { color: '#ff5a1f' } };

const examples = [
  { value: 'cards', label: 'Cards', Example: PreviewCards },
  { value: 'dashboard', label: 'Dashboard', Example: DashboardExample },
  { value: 'settings', label: 'Settings', Example: SettingsExample },
  { value: 'authentication', label: 'Sign in', Example: AuthenticationExample },
];

const views = { light: ['light'], dark: ['dark'], both: ['light', 'dark'] } as const;

/** The Google Fonts stylesheet for the village's fonts, when the catalogue knows them. */
function fontsHref(village: Village) {
  const families = [...new Set(Object.values(village.knobs.fonts))].map(fontInfo).filter((f) => f.known && f.google);
  return families.length ? `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f.google}`).join('&')}&display=swap` : undefined;
}

/** The lines of an engine error about the name, for the name field. */
const nameError = (error?: string) =>
  error
    ?.split('\n')
    .map((line) => line.trim())
    .filter((line) => /"name"|built-in village|already a nature/.test(line))
    .join(' ') || undefined;

const pick = <T,>(values: readonly T[]): T => values[Math.floor(Math.random() * values.length)];
const sansFonts = Object.entries(fonts)
  .filter(([, f]) => f.category === 'sans')
  .map(([name]) => name);

/** A recipe at random, keeping the name: a base, a colour, every knob and every trait. */
function shuffled(recipe: Recipe): Recipe {
  return {
    name: recipe.name,
    title: recipe.title,
    description: recipe.description,
    base: pick(bases).id,
    brand: { color: pick(swatches).color },
    contrast: pick(options.contrast),
    radius: pick([0, 0.25, 0.5, 0.75, 1]),
    density: pick(options.density),
    depth: pick(options.depth),
    motion: pick(options.motion),
    border: pick(options.border),
    fonts: { body: pick(sansFonts), heading: pick(Object.keys(fonts)) },
    traits: Object.fromEntries(Object.entries(traitOptions).map(([trait, values]) => [trait, pick(values)])),
  };
}

/** The workshop's own controls wear the site's village in its dark scheme, apart from the village being made. */
function useChrome(): VillageSettings {
  const { village, nature, tint } = useSettings();
  return { village, nature, tint, scheme: 'dark' };
}

function Status({ state, chrome }: { state: VillageState; chrome: VillageSettings }) {
  const { village, error, pending } = state;
  const failing = village?.problems.length ?? 0;
  const moved = village?.adjustments.length ?? 0;
  const bad = Boolean(error) || failing > 0;
  const label = !village ? 'Making the village…' : error ? 'The recipe needs a fix' : failing ? `${failing} pair${failing > 1 ? 's' : ''} to fix` : 'Accessible';
  return (
    <VillageScope {...chrome} className="pointer-events-auto rounded-xl border-village shadow-lg">
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-xl py-2 ps-2.5 pe-3.5 text-sm font-medium outline-none transition-colors duration-fast hover:bg-accent focus-visible:focus-ring data-[popup-open]:bg-accent"
            />
          }
        >
          <span className={cn('grid size-6 place-items-center rounded-full', bad ? 'bg-destructive text-destructive-foreground' : 'bg-success text-success-foreground')} aria-hidden>
            {!village || pending ? <LoaderIcon className="size-3.5 animate-spin" /> : bad ? <CircleAlertIcon className="size-3.5" /> : <CheckIcon className="size-3.5" />}
          </span>
          <span role="status" aria-live="polite">
            {label}
          </span>
          {village && moved ? <span className="hidden text-muted-foreground sm:inline">· {moved} adjusted</span> : null}
        </PopoverTrigger>
        <PopoverContent side="top" align="start" sideOffset={10} className="hide-scrollbar max-h-[70svh] w-96 max-w-[calc(100vw-2rem)] overflow-y-auto">
          <Report state={state} />
        </PopoverContent>
      </Popover>
    </VillageScope>
  );
}

function Preview({ state, chrome }: { state: VillageState; chrome: VillageSettings }) {
  const [view, setView] = useState<keyof typeof views>('light');
  const [example, setExample] = useState('cards');
  const { Example } = examples.find((e) => e.value === example)!;
  const { village } = state;
  const href = village ? fontsHref(village) : undefined;
  return (
    <section aria-label="Preview" className="relative min-w-0 flex-1 overflow-hidden rounded-xl border-village bg-muted">
      {village ? <style>{village.css}</style> : null}
      {href ? <link rel="stylesheet" href={href} precedence="default" /> : null}
      {/* No scrollbar: the wheel, the trackpad and the keyboard still scroll the preview. */}
      <div className="hide-scrollbar h-full overflow-y-auto">
        {village ? (
          views[view].map((scheme) => (
            <VillageScope
              key={scheme}
              village={village.name}
              nature={village.ownNature ? village.name : village.knobs.brand.nature}
              // Every setting is the preview's own, so the page's village, nature, greys and scheme never reach it.
              tint="village"
              scheme={scheme}
              aria-label={`${village.title}, ${scheme}`}
              className={cn('px-3 pt-3 pb-24 sm:px-5 sm:pt-5 md:px-8 md:pt-8', view !== 'both' && 'min-h-full')}
            >
              <Example />
            </VillageScope>
          ))
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">Making the village…</div>
        )}
      </div>

      {/* After shadcn's /create: the status and the preview's pages float over the canvas, out of its way. */}
      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex flex-wrap items-end justify-between gap-1.5 sm:inset-x-3 sm:bottom-3 sm:gap-2">
        <Status state={state} chrome={chrome} />
        <VillageScope {...chrome} className="pointer-events-auto flex items-center gap-1 rounded-xl border-village p-1 shadow-lg">
          <ToggleGroup size="sm" value={[example]} onValueChange={(v) => v[0] && setExample(v[0])} aria-label="Preview" className="hidden sm:flex">
            {examples.map((e) => (
              <ToggleGroupItem key={e.value} value={e.value}>
                {e.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {/* A phone has no room for four tabs: the same choice as a menu. */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="sm:hidden" />}>
              {examples.find((e) => e.value === example)!.label}
              <ChevronsUpDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end">
              <DropdownMenuRadioGroup value={example} onValueChange={(v) => setExample(String(v))}>
                {examples.map((e) => (
                  <DropdownMenuRadioItem key={e.value} value={e.value}>
                    {e.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="mx-0.5 h-5 w-px bg-border" aria-hidden />
          <ToggleGroup size="sm" value={[view]} onValueChange={(v) => v[0] && setView(v[0] as keyof typeof views)} aria-label="Scheme">
            <ToggleGroupItem value="light" aria-label="Light">
              <SunIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark">
              <MoonIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="both" aria-label="Light and dark">
              <Columns2Icon />
            </ToggleGroupItem>
          </ToggleGroup>
        </VillageScope>
      </div>
    </section>
  );
}

const Workshop: PageComponent = () => {
  const [recipe, setRecipe] = useState<Recipe>(initial);
  const state = useVillage(recipe);
  const chrome = useChrome();
  const k = knobs(recipe);

  // A shared link opens on its recipe; the link follows every change, so the address bar is always shareable.
  useEffect(() => {
    try {
      const linked = recipeFromLink(window.location.href);
      if (linked && typeof linked === 'object') setRecipe(linked as Recipe);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => window.history.replaceState(window.history.state, '', recipeLink(recipe, window.location.pathname)), 300);
    return () => clearTimeout(timer);
  }, [recipe]);

  const link = typeof window === 'undefined' ? recipeLink(recipe) : recipeLink(recipe, `${window.location.origin}${window.location.pathname}`);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast('Link copied', { description: 'Anyone who opens it gets this recipe. Nothing is stored on our side.' });
    } catch {
      toast.error('The clipboard is blocked: copy the address bar instead.');
    }
  };

  const actions = (
    <>
      <div className="grid grid-cols-2 gap-1.5">
        <Button variant="outline" size="sm" onClick={copyLink}>
          <LinkIcon />
          Copy link
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRecipe({ name: recipe.name, title: recipe.title, description: recipe.description, base: recipe.base })}>
          <RotateCcwIcon />
          Reset
        </Button>
      </div>
      <Button variant="outline" onClick={() => setRecipe(shuffled(recipe))}>
        <ShuffleIcon />
        Shuffle
      </Button>
      <ExportDialog
        className="w-full"
        village={state.village}
        recipe={recipe}
        link={link}
        disabled={!state.village || Boolean(state.error) || Boolean(state.village.problems.length)}
      />
    </>
  );
  const panel = { recipe, onChange: setRecipe, nameError: nameError(state.error), actions };

  return (
    <main id="main" className="flex h-[calc(100svh-var(--header-height)-4.5rem)] gap-3 p-2 sm:p-3 lg:h-[calc(100svh-var(--header-height))]">
      <h1 className="sr-only">Village workshop: {k.base.title} and your recipe</h1>
      <VillageScope {...chrome} as="aside" aria-label="Recipe" className="hidden w-72 shrink-0 overflow-hidden rounded-xl border-village lg:flex lg:flex-col">
        <RecipePanel {...panel} className="h-full" />
      </VillageScope>

      <Preview state={state} chrome={chrome} />

      {/* Below lg the recipe is a bottom sheet, within the thumb's reach, over the preview it changes. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-(length:--border-width) bg-background/90 p-3 backdrop-blur-sm lg:hidden">
        <Sheet>
          <SheetTrigger render={<Button className="w-full" />}>
            <SlidersHorizontalIcon />
            Edit the recipe
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85svh]">
            <SheetHeader>
              <SheetTitle>Recipe</SheetTitle>
              <SheetDescription>The preview follows every change.</SheetDescription>
            </SheetHeader>
            <RecipePanel {...panel} className="min-h-0 flex-1" />
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
};

Workshop.metadata = {
  title: 'Village workshop · Rasengan UI',
  description: 'Found your own village: a brand colour and a few knobs, every component previewed, every colour pair checked for contrast.',
};

export default Workshop;
