import { cn } from '@/lib/utils';

const link = 'underline underline-offset-4 hover:text-foreground';

/** The site's footer: what it is built on, and who made it. The home page and the docs layout both end with it. */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn('border-t-(length:--border-width) px-4 py-8 text-center text-sm leading-relaxed text-muted-foreground', className)}>
      Built on{' '}
      <a href="https://base-ui.com" className={link}>
        Base UI
      </a>{' '}
      and Tailwind CSS, for{' '}
      <a href="https://rasengan.dev" className={link}>
        Rasengan.js
      </a>{' '}
      and every React app.
      <br />
      Designed and built by{' '}
      <a href="https://dilane3.dev" target="_blank" rel="noreferrer" className="font-medium text-foreground underline underline-offset-4">
        Dilane Kombou
      </a>
      .
    </footer>
  );
}
