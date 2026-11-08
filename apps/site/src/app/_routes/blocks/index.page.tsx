import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams, type PageComponent } from 'rasengan';
import { ArrowRight, Search } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  blockCategories,
  blockFamilies,
  type BlockCategory,
  type BlockFamily,
} from '@/registry/block-categories';
import { blocks } from '@/blocks-catalogue';
import { BlockThumbnail } from '@/components/gallery/block-thumbnail';
import { NewDot } from '@/components/layout/new-dot';
import { useScopedTheme } from '@/components/theme-scope';
import { SchemeToggle, ThemePopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';

type Family = BlockFamily | 'all';

/**
 * /blocks: every block as a live thumbnail, after shadcnblocks' galleries. Search, a family filter and a category rail
 * narrow the grid; the thumbnails wear a theme of their own, set in the bar. `?category=pricing` opens on a category
 * (the block pages' breadcrumb links there).
 */
const BlockGallery: PageComponent = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<Family>('all');
  const [category, setCategory] = useState<BlockCategory | 'all'>('all');
  const theme = useScopedTheme();

  // The category from the address, after hydration: the prerendered page shows them all.
  useEffect(() => {
    const asked = params.get('category');
    if (asked && asked in blockCategories) setCategory(asked as BlockCategory);
  }, [params]);

  function pick(next: BlockCategory | 'all') {
    setCategory(next);
    setParams(next === 'all' ? {} : { category: next }, {
      replace: true,
      preventScrollReset: true,
    });
  }

  const inFamily = blocks.filter((b) => family === 'all' || b.families.includes(family));
  const categories = useMemo(
    () =>
      (Object.keys(blockCategories) as BlockCategory[])
        .map((id) => ({
          id,
          title: blockCategories[id].title,
          count: inFamily.filter((b) => b.category === id).length,
        }))
        .filter((c) => c.count > 0),
    [inFamily],
  );
  const q = query.trim().toLowerCase();
  const shown = inFamily.filter(
    (b) =>
      (category === 'all' || b.category === category) &&
      (!q ||
        [b.title, b.summary, b.useWhen, blockCategories[b.category].title].some((text) =>
          text.toLowerCase().includes(q),
        )),
  );

  const families: { id: Family; title: string; count: number }[] = [
    { id: 'all', title: 'All', count: blocks.length },
    ...(Object.keys(blockFamilies) as BlockFamily[]).map((id) => ({
      id,
      title: blockFamilies[id].title,
      count: blocks.filter((b) => b.families.includes(id)).length,
    })),
  ];

  const rail = (current: boolean) =>
    cn(
      'flex w-full items-center justify-between gap-3 rounded-control px-3 py-1.5 text-start text-sm whitespace-nowrap outline-none transition-colors focus-visible:focus-ring',
      current
        ? 'bg-highlight font-medium text-highlight-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    );

  return (
    <div className="px-4 pt-10 pb-16 md:px-8 lg:pt-14">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-[34px] leading-[1.1] font-semibold tracking-display case-heading md:text-[40px]">
          Blocks
        </h1>
        <p className="max-w-2xl text-[15.5px] leading-[1.7] text-muted-foreground">
          {blocks.length} page sections built on the components, in every village. Each takes its
          content as one typed object, so you or an agent fill it in without touching the layout.
          Install one and its code is yours.
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          See them together:
          {[
            { to: '/examples/landing', label: 'a landing page' },
            { to: '/examples/restaurant', label: 'a restaurant' },
          ].map((example) => (
            <Link
              key={example.to}
              to={example.to}
              className="inline-flex items-center gap-1.5 rounded-control font-medium tone-primary text-tone-text underline-offset-4 outline-none hover:underline focus-visible:focus-ring"
            >
              {example.label}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          ))}
        </p>
      </header>

      <div className="sticky top-(--header-height) z-20 -mx-4 mt-8 flex flex-wrap items-center gap-3 border-y-(length:--border-width) bg-background/90 px-4 py-3 backdrop-blur-sm md:-mx-8 md:px-8">
        <div className="relative w-full sm:w-64">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks"
            aria-label="Search blocks"
            className="ps-8"
          />
        </div>
        <ToggleGroup
          variant="outline"
          size="sm"
          value={[family]}
          onValueChange={(value) => {
            if (!value[0]) return;
            setFamily(value[0] as Family);
            pick('all');
          }}
          aria-label="Family"
        >
          {families.map((f) => (
            <ToggleGroupItem key={f.id} value={f.id}>
              {f.title}
              <span className="text-muted-foreground tabular-nums">{f.count}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="ms-auto flex items-center gap-1">
          <ThemePopover
            control={theme}
            label="Thumbnails theme"
            description="The village, nature and greys of the thumbnails; the page keeps its own."
          />
          <SchemeToggle control={theme} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav
          aria-label="Categories"
          className="lg:sticky lg:top-[calc(var(--header-height)+5rem)] lg:self-start"
        >
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 hide-scrollbar lg:mx-0 lg:flex-col lg:px-0">
            <li>
              <button
                type="button"
                aria-pressed={category === 'all'}
                onClick={() => pick('all')}
                className={rail(category === 'all')}
              >
                All
                <span className="tabular-nums">{inFamily.length}</span>
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={category === c.id}
                  onClick={() => pick(c.id)}
                  className={rail(category === c.id)}
                >
                  {c.title}
                  <span className="tabular-nums">{c.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label={`${shown.length} blocks`}>
          {shown.length === 0 ? (
            <Empty className="border-village">
              <EmptyHeader>
                <EmptyTitle>No block matches “{query}”</EmptyTitle>
                <EmptyDescription>
                  Try another word, or clear the search and the filters.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 2xl:grid-cols-3">
              {/* The title is the link, stretched over the card: the thumbnail holds the block's own links. */}
              {shown.map((block) => (
                <li key={block.name} className="group relative flex flex-col gap-3">
                  <div className="overflow-hidden rounded-lg border-village transition-colors group-hover:border-primary group-has-focus-visible:border-primary">
                    <BlockThumbnail block={block} theme={theme.value} />
                  </div>
                  <div className="flex flex-col gap-0.5 px-0.5">
                    <Link
                      to={block.href}
                      className="flex items-center gap-2 rounded-control font-medium outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:focus-ring"
                    >
                      {block.title}
                      {block.isNew && <NewDot />}
                    </Link>
                    <p className="text-sm text-muted-foreground">{block.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

BlockGallery.metadata = {
  title: 'Blocks · Rasengan UI',
  description:
    'Page sections built on the components, with typed content an agent can fill: heroes, features, pricing, FAQ and more, in every village.',
};

export default BlockGallery;
