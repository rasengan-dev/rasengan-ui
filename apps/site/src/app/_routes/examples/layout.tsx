import { Outlet, useLocation, useNavigate, type LayoutComponent } from 'rasengan';
import { ExampleToolbar } from '@/components/layout/example-toolbar';
import { PageTransition } from '@/components/ui/page-transition';

/**
 * The example pages: the page alone, full window, with the floating theme toolbar. Moving between them goes behind
 * a page transition (RFC-0008, lot C): the toolbar's links are `TransitionLink`s, so the curtain covers the old page,
 * the router changes it, and the curtain uncovers the new one, in the village's colour and timing.
 */
const ExamplesLayout: LayoutComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <PageTransition id={pathname} navigate={navigate} effect="wipe" focus="h1">
      <Outlet />
      <ExampleToolbar switcher />
    </PageTransition>
  );
};

export default ExamplesLayout;
