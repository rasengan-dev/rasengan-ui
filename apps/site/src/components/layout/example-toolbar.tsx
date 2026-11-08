import { Link } from 'rasengan';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SchemeToggle, ThemePopover } from '@/components/village-settings';
import { cn } from '@/lib/utils';

/**
 * The floating bar of the example pages, which have no site header: back to the blocks, the theme (village, nature,
 * greys) and light or dark. It wears the theme it sets, like the example under it.
 */
export function ExampleToolbar() {
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
      <ThemePopover side="top" className="rounded-pill" />
      <SchemeToggle />
    </div>
  );
}
