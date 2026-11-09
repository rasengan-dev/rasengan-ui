import { Link, useLocation } from 'rasengan';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { TransitionLink } from '@/components/ui/page-transition';
import { Separator } from '@/components/ui/separator';
import { SchemeToggle, ThemePopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';

const examples = [
  { to: '/examples/landing', label: 'Landing' },
  { to: '/examples/restaurant', label: 'Restaurant' },
  { to: '/examples/salon', label: 'Salon' },
];

/** The example pages, linked through the page transition: only inside a `PageTransition`. */
function ExampleSwitcher({ pathname }: { pathname: string }) {
  return (
    <>
      <nav aria-label="Examples" className="hidden items-center sm:flex">
        {examples.map((example) => (
          <TransitionLink
            key={example.to}
            href={example.to}
            aria-current={pathname === example.to ? 'page' : undefined}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'rounded-pill aria-[current=page]:bg-muted aria-[current=page]:text-foreground',
            )}
          >
            {example.label}
          </TransitionLink>
        ))}
      </nav>
      <Separator orientation="vertical" className="hidden h-4 data-[orientation=vertical]:self-center sm:block" />
    </>
  );
}

/**
 * The floating bar of the example and preview pages, which have no site header: back to the blocks, the theme
 * (village, nature, greys) and light or dark. With `switcher`, inside a `PageTransition` (the example pages), it also
 * links the examples to each other through the transition. It wears the theme it sets, like the page under it.
 */
export function ExampleToolbar({ switcher = false }: { switcher?: boolean }) {
  const { pathname } = useLocation();
  return (
    <div
      role="toolbar"
      aria-label="Example settings"
      className="fixed end-4 bottom-4 z-50 flex items-center gap-1 rounded-pill border-village bg-background/90 p-1 shadow-lg backdrop-blur-sm"
    >
      <Link
        to="/blocks"
        aria-label="Back to blocks"
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-pill')}
      >
        <ArrowLeft />
      </Link>
      <Separator orientation="vertical" className="h-4 data-[orientation=vertical]:self-center" />
      {switcher && <ExampleSwitcher pathname={pathname} />}
      <ThemePopover side="top" className="rounded-pill" />
      <SchemeToggle />
    </div>
  );
}
