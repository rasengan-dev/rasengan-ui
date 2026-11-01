import { useEffect, useState } from 'react';
import { Link, type PageComponent } from 'rasengan';
import { CheckIcon, CircleAlertIcon, LinkIcon, RotateCcwIcon, SlidersHorizontalIcon } from 'lucide-react';
import { recipeFromLink, recipeLink, type Recipe, type Village } from '@rasengan-ui/villages/engine';
import { fontInfo } from '@rasengan-ui/villages/fonts';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/components/ui/toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { VillageScope } from '@/lib/village-scope';
import { cn } from '@/lib/utils';
import { AuthenticationExample } from '@/components/home/authentication';
import { PreviewCards } from '@/components/workshop/preview-cards';
import { DashboardExample } from '@/components/home/dashboard';
import { SettingsExample } from '@/components/home/settings';
import { ExportDialog } from '@/components/workshop/export-dialog';
import { RecipePanel, knobs } from '@/components/workshop/recipe-panel';
import { Report } from '@/components/workshop/report';
import { useVillage } from '@/components/workshop/use-village';

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

function Preview({ village }: { village?: Village }) {
  const [view, setView] = useState<keyof typeof views>('light');
  const [example, setExample] = useState('cards');
  const { Example } = examples.find((e) => e.value === example)!;
  const href = village ? fontsHref(village) : undefined;
  const failing = village?.problems.length ?? 0;
  return (
    <section aria-labelledby="preview-title" className="grid min-w-0 content-start gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 id="preview-title" className="font-display text-xl font-semibold tracking-display case-heading">
          {village?.title ?? 'Your village'}
        </h1>
        {village ? (
          <a href="#report" className={cn('inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium', failing ? 'tone-destructive' : 'tone-success', 'bg-tone-soft text-tone-text')}>
            {failing ? <CircleAlertIcon className="size-3.5" aria-hidden /> : <CheckIcon className="size-3.5" aria-hidden />}
            {failing ? `${failing} pair${failing > 1 ? 's' : ''} to fix` : 'Accessible'}
          </a>
        ) : null}
        <div className="ms-auto flex flex-wrap items-center gap-2">
          <ToggleGroup variant="outline" size="sm" value={[example]} onValueChange={(v) => v[0] && setExample(v[0])} aria-label="Preview">
            {examples.map((e) => (
              <ToggleGroupItem key={e.value} value={e.value}>
                {e.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup variant="outline" size="sm" value={[view]} onValueChange={(v) => v[0] && setView(v[0] as keyof typeof views)} aria-label="Scheme">
            <ToggleGroupItem value="light">Light</ToggleGroupItem>
            <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
            <ToggleGroupItem value="both">Both</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {village ? (
        <>
          <style>{village.css}</style>
          {href ? <link rel="stylesheet" href={href} precedence="default" /> : null}
          {views[view].map((scheme) => (
            <VillageScope
              key={scheme}
              village={village.name}
              nature={village.ownNature ? village.name : village.knobs.brand.nature}
              scheme={scheme}
              aria-label={`${village.title}, ${scheme}`}
              className="overflow-hidden rounded-xl border-village bg-background p-3 text-foreground sm:p-4 md:p-6"
            >
              <Example />
            </VillageScope>
          ))}
        </>
      ) : (
        <div className="grid min-h-96 place-items-center rounded-xl border-village bg-muted/40 text-sm text-muted-foreground">Making the village…</div>
      )}
    </section>
  );
}

const Workshop: PageComponent = () => {
  const [recipe, setRecipe] = useState<Recipe>(initial);
  const state = useVillage(recipe);
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

  return (
    <main id="main" className="mx-auto w-full max-w-[1680px] pb-20 lg:pb-0">
      <div className="flex flex-wrap items-center gap-3 border-b-(length:--border-width) px-4 py-4 md:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/docs/villages" className="rounded-sm outline-none hover:text-foreground focus-visible:focus-ring">
            Villages
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-foreground" aria-current="page">
            Workshop
          </span>
        </nav>
        <span className="text-sm text-muted-foreground">
          from <strong className="font-semibold text-foreground">{k.base.title}</strong>
        </span>
        <div className="ms-auto flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setRecipe({ name: recipe.name, title: recipe.title, description: recipe.description, base: recipe.base })}>
            <RotateCcwIcon />
            Reset to {k.base.title}
          </Button>
          <Button variant="outline" onClick={copyLink}>
            <LinkIcon />
            Copy link
          </Button>
          <ExportDialog village={state.village} recipe={recipe} link={link} disabled={!state.village || Boolean(state.error) || Boolean(state.village.problems.length)} />
        </div>
      </div>

      {/*
       * Phones: the report, the preview, then the recipe. From lg the recipe is a sticky column and the report sits
       * above the preview; from 2xl the report is a column of its own on the right.
       */}
      <div className="grid items-start gap-6 p-4 md:p-6 lg:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)_320px]">
        <aside
          aria-label="Recipe"
          className="hidden overflow-hidden rounded-xl border-village bg-card text-card-foreground lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:block lg:max-h-[calc(100svh-var(--header-height)-3rem)] lg:overflow-y-auto"
        >
          <RecipePanel recipe={recipe} onChange={setRecipe} nameError={nameError(state.error)} />
        </aside>
        <aside
          id="report"
          aria-label="Accessibility report"
          className="order-1 min-w-0 scroll-mt-24 lg:order-none lg:col-start-2 lg:row-start-1 2xl:sticky 2xl:top-[calc(var(--header-height)+1.5rem)] 2xl:col-start-3"
        >
          <Report state={state} />
        </aside>
        <div className="order-2 min-w-0 lg:order-none lg:col-start-2 lg:row-start-2 2xl:row-start-1">
          <Preview village={state.village} />
        </div>
      </div>

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
            <div className="min-h-0 overflow-y-auto">
              <RecipePanel recipe={recipe} onChange={setRecipe} nameError={nameError(state.error)} />
            </div>
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
