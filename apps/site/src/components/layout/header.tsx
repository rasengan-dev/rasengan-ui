import { Link, useLocation } from 'rasengan';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SchemeToggle, VillageSelectors, VillageSettingsPopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';
import { repository, sections } from './nav';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

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
