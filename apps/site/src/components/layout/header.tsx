import { Link, useLocation } from 'rasengan';
import { PlusIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SchemeToggle, ThemePopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';
import { GitHubIcon } from '@/components/icons';
import { MobileMenu } from './mobile-menu';
import { Search } from './search';
import { repository, sections } from './nav';

/**
 * After shadcn's docs header: brand and sections on the left; on the right, the search, the theme (village, nature and
 * greys in one popover), GitHub, light/dark, and last New (the village workshop, hidden on it). Below `lg`, a menu
 * replaces the sections.
 */
export function Header() {
  const { pathname } = useLocation();
  // The workshop and the blocks pages fill the window: their header spans it too, lined up with what is below.
  const full = pathname.startsWith('/villages') || pathname.startsWith('/blocks');
  // New leads to the workshop: on the workshop itself it has nothing to offer.
  const creating = pathname.replace(/\/$/, '') === '/villages/create';
  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm">
      <div className={cn('mx-auto flex h-(--header-height) items-center gap-2', full ? 'px-2 sm:px-3' : 'max-w-[1440px] px-4 md:px-6')}>
        <MobileMenu className="lg:hidden" />
        <Link to="/" className="hidden items-center gap-2 rounded-control pe-2 outline-none focus-visible:focus-ring lg:flex">
          <img src="/rasengan.svg" alt="" className="size-5" />
          <span className="font-display font-semibold tracking-display">Rasengan UI</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {sections.map((section) => {
            const active = section.match(pathname);
            return (
              <Link
                key={section.to}
                to={section.to}
                aria-current={active ? 'page' : undefined}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), !active && 'text-muted-foreground')}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
        <div className="ms-auto flex items-center gap-1.5">
          <Search className="sm:w-48 md:w-56 lg:w-64" />
          <ThemePopover />
          <Separator orientation="vertical" className="mx-1 h-4 data-[orientation=vertical]:self-center" />
          <a href={repository} target="_blank" rel="noreferrer" aria-label="GitHub" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <GitHubIcon />
          </a>
          <SchemeToggle />
          {!creating && (
            <Link to="/villages/create" aria-label="New village" className={cn(buttonVariants({ size: 'sm' }), 'ms-1')}>
              <PlusIcon />
              New
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
