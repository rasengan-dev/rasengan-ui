import { Outlet, type LayoutComponent } from 'rasengan';
import { SiteFooter } from './footer';
import { Sidebar } from './sidebar';

/** The docs and component pages: a sticky sidebar from `lg`, the page beside it, then the site's footer under the page. */
export const DocsLayout: LayoutComponent = () => (
  <div className="mx-auto flex max-w-[1440px]">
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-[240px] shrink-0 overflow-y-auto px-3 py-8 hide-scrollbar lg:block">
      <Sidebar />
    </aside>
    {/* The footer sits outside <main>, so it stays the page's contentinfo landmark. */}
    <div className="flex min-w-0 flex-1 flex-col">
      <main id="main" className="min-w-0 flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  </div>
);
