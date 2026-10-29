import { useEffect, useState } from 'react';
import { Link, useLocation } from 'rasengan';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { sections } from './nav';
import { Sidebar } from './sidebar';

/** Below `lg`: the sections and the sidebar's pages behind a "Menu" button, like shadcn's. */
export function MobileMenu({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // A link was followed: close.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="ghost" size="sm" className={cn('-ms-2', className)} />}>
        <Menu />
        Menu
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="max-h-[calc(100svh-var(--header-height)-1rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto">
        <PopoverTitle className="sr-only">Menu</PopoverTitle>
        <nav aria-label="Main" className="mb-6 flex flex-col gap-1">
          {sections.map((section) => (
            <Link key={section.to} to={section.to} className="rounded-control px-3 py-1.5 text-lg font-medium outline-none focus-visible:focus-ring">
              {section.label}
            </Link>
          ))}
        </nav>
        <Sidebar />
      </PopoverContent>
    </Popover>
  );
}
