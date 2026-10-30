import { Link, useLocation } from 'rasengan';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SchemeToggle, VillageSelectors, VillageSettingsPopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';
import { GitHubIcon } from '@/components/icons';
import { MobileMenu } from './mobile-menu';
import { repository, sections } from './nav';

/**
 * After shadcn's docs header: brand and sections on the left; on the right, the village selectors
 * (behind one button below `md`), GitHub and light/dark. Below `lg`, a menu replaces the sections.
 */
export function Header() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-(--header-height) max-w-[1440px] items-center gap-2 px-4 md:px-6">
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
          <VillageSelectors className="hidden md:flex" />
          <VillageSettingsPopover className="md:hidden" />
          <Separator orientation="vertical" className="mx-1 h-4 data-[orientation=vertical]:self-center" />
          <a href={repository} target="_blank" rel="noreferrer" aria-label="GitHub" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <GitHubIcon />
          </a>
          <SchemeToggle />
        </div>
      </div>
    </header>
  );
}
