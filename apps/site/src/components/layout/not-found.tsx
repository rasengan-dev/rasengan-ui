import { Link } from 'rasengan';
import { buttonVariants } from '@/components/ui/button';
import { Header } from './header';

/** Rasengan renders it outside the layouts, so it brings its own header. */
export default function NotFound() {
  return (
    <div className="min-h-svh [--header-height:4rem]">
      <Header />
      <main id="main" className="flex flex-col items-center px-4 py-28 text-center">
        <p className="m-0 font-mono text-sm text-primary">/ 404</p>
        <h1 className="mt-3.5 mb-0 font-display text-[34px] font-semibold tracking-display case-heading">Nothing here.</h1>
        <p className="mt-4 mb-0 max-w-[420px] text-muted-foreground">This page doesn't exist, or it moved.</p>
        <Link to="/components" className={buttonVariants({ className: 'mt-8' })}>
          See the components
        </Link>
      </main>
    </div>
  );
}
