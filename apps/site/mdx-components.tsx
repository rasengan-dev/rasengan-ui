import type React from 'react';
import type { ComponentProps, ElementType } from 'react';
import { Link, useLocation } from 'rasengan';
import { defineMDXConfig } from '@rasenganjs/mdx';
import { BlockShowcase } from '@/components/mdx/block-showcase';
import { Callout } from '@/components/mdx/callout';
import { CodeFigure, CodePre, CodeTitle, InlineCode } from '@/components/mdx/code-block';
import { ComponentIndex } from '@/components/mdx/component-index';
import { ComponentPreview } from '@/components/mdx/component-preview';
import { ContentSchema } from '@/components/mdx/content-schema';
import { Pager } from '@/components/mdx/pager';
import { Step, Steps } from '@/components/mdx/steps';
import { Toc } from '@/components/mdx/toc';
import { VillageGrid } from '@/components/mdx/village-grid';
import { cn } from '@/lib/utils';

/** Gives an element fixed classes, merged with any the MDX passes. */
function styled(Tag: keyof React.JSX.IntrinsicElements, base: string) {
  const Component = ({ className, ...props }: { className?: string; [prop: string]: unknown }) => (
    <Tag className={cn(base, className)} {...props} />
  );
  Component.displayName = Tag;
  return Component;
}

const heading =
  'font-display font-semibold tracking-display case-heading scroll-mt-[calc(var(--header-height)+1.5rem)]';
// The primary's words, not its fill (RFC-0006, "The brand colour's three roles"): text-primary is not held to 4.5:1 on the page.
const link =
  'font-medium tone-primary text-tone-text underline decoration-tone-text/40 underline-offset-4 hover:decoration-tone-text';

/**
 * How every `.page.mdx` renders, after Hiraiship's apps/docs, in the contract's tokens: the docs
 * wear the village picked in the toolbar. `<ComponentIndex>`, `<ComponentPreview>`, `<BlockShowcase>`,
 * `<ContentSchema>`, `<VillageGrid>`, `<Note>`,
 * `<Callout>`, `<Steps>` and `<Link>` are usable in MDX without an import.
 */
export default defineMDXConfig({
  components: {
    h1: styled('h1', cn(heading, 'mt-0 mb-3 text-[34px] leading-[1.1] md:text-[40px]')),
    h2: styled('h2', cn(heading, 'mt-12 mb-3 border-b-(length:--border-width) pb-2 text-[24px]')),
    h3: styled('h3', cn(heading, 'mt-8 mb-2 text-[19px]')),
    h4: styled('h4', cn(heading, 'mt-6 mb-2 text-base')),
    p: styled('p', 'my-4 text-[15.5px] leading-[1.7] text-muted-foreground'),
    a: styled('a', link),
    strong: styled('strong', 'font-semibold text-foreground'),
    ul: styled(
      'ul',
      'my-4 list-disc ps-6 text-[15.5px] text-muted-foreground marker:text-muted-foreground',
    ),
    ol: styled(
      'ol',
      'my-4 list-decimal ps-6 text-[15.5px] text-muted-foreground marker:text-muted-foreground',
    ),
    li: styled('li', 'my-1.5 leading-[1.7]'),
    blockquote: styled(
      'blockquote',
      'my-6 border-s-2 border-primary ps-4 text-muted-foreground italic',
    ),
    hr: styled('hr', 'my-10'),
    kbd: styled(
      'kbd',
      'rounded-sm border-village bg-muted px-1.5 py-0.5 font-mono text-[0.8em] text-foreground',
    ),
    figure: CodeFigure,
    figcaption: CodeTitle,
    pre: CodePre,
    code: InlineCode,
    table: ({ className, ...props }: ComponentProps<'table'>) => (
      // Focusable and named: on a phone a wide table scrolls, and the keyboard must be able to scroll it.
      <div
        role="region"
        aria-label="Table"
        tabIndex={0}
        className="my-6 w-full overflow-x-auto rounded-lg border-village outline-none focus-visible:focus-ring"
      >
        <table className={cn('w-full border-collapse text-sm', className)} {...props} />
      </div>
    ),
    /* A floor on each column: on a phone a wide table scrolls instead of squeezing every column to a word per line. */
    th: styled(
      'th',
      'min-w-28 border-b-(length:--border-width) bg-muted px-4 py-2.5 text-start font-semibold text-foreground',
    ),
    td: styled(
      'td',
      'min-w-28 border-b-(length:--border-width) px-4 py-2.5 align-top text-muted-foreground',
    ),
    Note: Callout,
    Callout,
    Steps,
    Step,
    BlockShowcase,
    ComponentIndex,
    ComponentPreview,
    ContentSchema,
    VillageGrid,
    Link: ({ className, ...props }: ComponentProps<typeof Link>) => (
      <Link className={cn(link, className)} {...props} />
    ),
    /* defineMDXConfig types `components` as intrinsic elements only, while MDX also accepts custom ones. */
  } as Record<string, ElementType>,

  toc: (items) => <Toc items={items} />,

  layout: ({ children, toc }) => <Article toc={toc}>{children}</Article>,
});

/**
 * The page's column: 760px for reading. A block page takes the whole width, so its showcase can show a desktop
 * layout; the prose under it keeps a reading width.
 */
function Article({ children, toc }: { children: React.ReactNode; toc?: React.ReactNode }) {
  const { pathname } = useLocation();
  const wide = pathname.startsWith('/blocks/');
  return (
    <div className="flex gap-12 px-4 pt-10 pb-16 md:px-10 lg:pt-14">
      <article
        className={cn(
          'mx-auto w-full min-w-0',
          wide ? 'max-w-none [&>:not([data-slot=block-showcase])]:max-w-3xl' : 'max-w-[760px]',
        )}
      >
        {children}
        <Pager />
      </article>
      {toc}
    </div>
  );
}
