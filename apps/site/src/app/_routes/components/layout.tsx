import { Outlet, type LayoutComponent } from 'rasengan';
import { Sidebar } from '@/components/layout/sidebar';

/** The docs pages: a sticky sidebar from `lg`, the page beside it. */
const ComponentsLayout: LayoutComponent = () => (
  <div className="mx-auto flex max-w-[1440px]">
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-[240px] shrink-0 overflow-y-auto px-3 py-8 hide-scrollbar lg:block">
      <Sidebar />
    </aside>
    <main id="main" className="min-w-0 flex-1">
      <Outlet />
    </main>
  </div>
);

export default ComponentsLayout;
