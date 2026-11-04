import { Outlet, ScrollRestoration, type LayoutComponent } from 'rasengan';
import { Toaster } from '@/components/ui/toast';
import { Header } from '@/components/layout/header';

/** Every page: the skip link and the header, then the page; one Toaster for the whole site. */
const RootLayout: LayoutComponent = () => (
  <div className="min-h-svh [--header-height:4rem]">
    <a
      href="#main"
      className="sr-only rounded-control bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
    <Header />
    <Outlet />
    <ScrollRestoration />
    <Toaster />
  </div>
);

export default RootLayout;
