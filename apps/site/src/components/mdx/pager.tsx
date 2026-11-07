import { Link, useLocation } from 'rasengan';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blocks } from '@/blocks-catalogue';
import { components } from '@/catalogue';
import { cn } from '@/lib/utils';

/** Previous/next links, in the sidebar's order (the catalogues'), rather than written in each page: components, or blocks. */
export function Pager() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  const list: { href: string; title: string }[] = path.startsWith('/blocks') ? blocks : components;
  const index = list.findIndex((c) => c.href === path);
  if (index === -1) return null;
  const previous = list[index - 1];
  const next = list[index + 1];

  const card = 'group flex flex-1 flex-col gap-1 rounded-lg border-village p-4 transition-colors hover:bg-accent focus-visible:focus-ring';
  const label = 'inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase';

  return (
    <nav aria-label="Pages" className="mt-16 flex flex-col gap-3 sm:flex-row">
      {previous ? (
        <Link to={previous.href} className={card}>
          <span className={label}>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="font-display font-semibold tracking-display">{previous.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next && (
        <Link to={next.href} className={cn(card, 'items-end text-right')}>
          <span className={label}>
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold tracking-display">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
