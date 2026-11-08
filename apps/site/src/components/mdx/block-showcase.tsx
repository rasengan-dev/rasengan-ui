import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'rasengan';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Maximize2,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { blockCategories } from '@/registry/block-categories';
import { blocks, getBlock, type BlockEntry } from '@/blocks-catalogue';
import { components } from '@/catalogue';
import { ScopedTheme, useScopedTheme } from '@/components/theme-scope';
import { SchemeToggle, ThemePopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';
import { SourceCode } from './code-block';

/* The frame's widths. Blocks answer their container, not the window (ADR-0013), so narrowing a div is enough. */
const widths = {
  phone: { label: 'Phone', width: '375px', Icon: Smartphone },
  tablet: { label: 'Tablet', width: '768px', Icon: Tablet },
  desktop: { label: 'Desktop', width: '100%', Icon: Monitor },
} as const;

type Width = keyof typeof widths;

/** The blocks around this one: previous and next, and the first block of the previous and next category. */
function neighbours(block: BlockEntry) {
  const index = blocks.indexOf(block);
  const key = (b: BlockEntry) => `${b.families[0]}/${b.category}`;
  const before = blocks.slice(0, index).reverse();
  const after = blocks.slice(index + 1);
  const previousCategory = before.find((b) => key(b) !== key(block));
  return {
    previous: blocks[index - 1],
    next: blocks[index + 1],
    // The first block of the previous category, not its last.
    previousCategory: previousCategory && blocks.find((b) => key(b) === key(previousCategory)),
    nextCategory: after.find((b) => key(b) !== key(block)),
  };
}

const iconButton = cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }));

/** A link drawn as an icon button, named by its tooltip; a dimmed placeholder when there is nowhere to go. */
function NavLink({
  to,
  label,
  children,
}: {
  to?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!to)
    return (
      <span className={cn(iconButton, 'opacity-40')} aria-hidden="true">
        {children}
      </span>
    );
  return (
    <Tooltip>
      <TooltipTrigger render={<Link to={to} aria-label={label} className={iconButton} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* Clipboard refused: the command stays selectable. */
    }
  }
  return (
    <div className="flex h-8 min-w-0 items-center gap-1 rounded-control border-village bg-card ps-3 pe-1 font-mono text-xs">
      <span className="truncate select-all">{command}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy the install command'}
        className={cn(iconButton, 'size-6 shrink-0')}
      >
        {copied ? (
          <Check className="size-3.5 tone-success text-tone-text" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}

/**
 * `<BlockShowcase name="pricing-plans" />`: the top of a block's page, after shadcnblocks' block pages. The title and
 * summary; a bar to move between blocks (previous and next, categories, `[` and `]`) and open it full screen; then the
 * preview with its own bar: Preview or Code, the install command, phone, tablet or desktop width, and a village,
 * nature and scheme for the preview alone. Under it, the facts that help choose it.
 */
export function BlockShowcase({ name }: { name: string }) {
  const block = getBlock(name);
  const { previous, next, previousCategory, nextCategory } = neighbours(block);
  const [width, setWidth] = useState<Width>('desktop');
  const theme = useScopedTheme();
  const navigate = useNavigate();
  const category = blockCategories[block.category];

  // [ and ]: previous and next block, unless typing.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        target.closest('input, textarea, select, [contenteditable]')
      )
        return;
      if (event.key === '[' && previous) navigate(previous.href);
      if (event.key === ']' && next) navigate(next.href);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previous, next, navigate]);

  const built = block.components
    .map((n) => components.find((c) => c.name === n))
    .filter((c) => c !== undefined);
  const pairs = (block.pairsWith ?? [])
    .map((n) => blocks.find((b) => b.name === n))
    .filter((b) => b !== undefined);

  return (
    <div data-slot="block-showcase" className="mb-12">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[30px] leading-[1.1] font-semibold tracking-display case-heading md:text-[36px]">
            {block.title}
          </h1>
          <Badge variant="outline" className="capitalize">
            {block.status}
          </Badge>
        </div>
        <p className="max-w-3xl text-[15.5px] leading-[1.7] text-muted-foreground">
          {block.summary}
        </p>
      </header>

      <div className="mt-6 overflow-hidden rounded-xl border-village bg-card">
        <div className="flex flex-wrap items-center gap-2 border-b-(length:--border-width) px-3 py-2">
          <nav aria-label="Breadcrumb" className="min-w-0 text-sm">
            <ol className="flex items-center gap-1.5 text-muted-foreground">
              <li>
                <Link
                  to="/blocks"
                  className="rounded-control outline-none hover:text-foreground focus-visible:focus-ring"
                >
                  Blocks
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
              <li>
                <Link
                  to={`/blocks?category=${block.category}`}
                  className="rounded-control outline-none hover:text-foreground focus-visible:focus-ring"
                >
                  {category.title}
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
              <li aria-current="page" className="truncate text-foreground">
                {block.title}
              </li>
            </ol>
          </nav>
          <nav aria-label="Other blocks" className="ms-auto flex items-center gap-0.5">
            <NavLink
              to={previousCategory?.href}
              label={
                previousCategory
                  ? `Previous category: ${blockCategories[previousCategory.category].title}`
                  : ''
              }
            >
              <ChevronsLeft />
            </NavLink>
            <NavLink
              to={previous?.href}
              label={previous ? `Previous block: ${previous.title} ([)` : ''}
            >
              <ChevronLeft />
            </NavLink>
            <NavLink to={next?.href} label={next ? `Next block: ${next.title} (])` : ''}>
              <ChevronRight />
            </NavLink>
            <NavLink
              to={nextCategory?.href}
              label={
                nextCategory ? `Next category: ${blockCategories[nextCategory.category].title}` : ''
              }
            >
              <ChevronsRight />
            </NavLink>
            <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={`/preview/${block.name}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open full screen, in a new tab"
                    className={iconButton}
                  />
                }
              >
                <Maximize2 />
              </TooltipTrigger>
              <TooltipContent>Open full screen</TooltipContent>
            </Tooltip>
          </nav>
        </div>

        <Tabs defaultValue="preview">
          <div className="flex flex-wrap items-center gap-2 border-b-(length:--border-width) px-3 py-2">
            <TabsList aria-label={`${block.title}: preview or code`}>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <CopyCommand command={`npx rasengan-ui add ${block.name}`} />
            <div className="ms-auto flex items-center gap-1">
              <ToggleGroup
                size="sm"
                variant="outline"
                value={[width]}
                onValueChange={(value) => value[0] && setWidth(value[0] as Width)}
                aria-label="Preview width"
                className="max-md:hidden"
              >
                {Object.entries(widths).map(([id, { label, Icon }]) => (
                  <ToggleGroupItem key={id} value={id} aria-label={label}>
                    <Icon aria-hidden="true" />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ThemePopover
                control={theme}
                label="Preview theme"
                description="The village, nature and greys of this preview only; the page keeps its own."
              />
              <SchemeToggle control={theme} className="size-8" />
            </div>
          </div>
          <TabsContent
            value="preview"
            data-slot="block-preview"
            data-block={block.name}
            className="bg-muted/60 p-0 md:p-4"
          >
            <div
              data-width={width}
              style={{ width: widths[width].width }}
              className="mx-auto max-w-full overflow-hidden transition-[width] duration-(--duration-normal) ease-(--ease-out) md:rounded-lg md:border-village"
            >
              <ScopedTheme value={theme.value}>{block.Demo ? <block.Demo /> : null}</ScopedTheme>
            </div>
          </TabsContent>
          <TabsContent value="code">
            {block.source ? <SourceCode source={block.source} /> : null}
          </TabsContent>
        </Tabs>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Use it
          </dt>
          <dd>{block.useWhen}</dd>
        </div>
        {block.avoidWhen && (
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Avoid it
            </dt>
            <dd>{block.avoidWhen}</dd>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Built with
          </dt>
          <dd className="flex flex-wrap gap-x-2 gap-y-1">
            {built.length
              ? built.map((c) => (
                  <Link
                    key={c.name}
                    to={c.href}
                    className="rounded-control underline decoration-border underline-offset-4 outline-none hover:decoration-foreground focus-visible:focus-ring"
                  >
                    {c.title}
                  </Link>
                ))
              : 'Tailwind classes and Lucide icons'}
          </dd>
        </div>
        {pairs.length > 0 && (
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Pairs with
            </dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-1">
              {pairs.map((b) => (
                <Link
                  key={b.name}
                  to={b.href}
                  className="rounded-control underline decoration-border underline-offset-4 outline-none hover:decoration-foreground focus-visible:focus-ring"
                >
                  {b.title}
                </Link>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
