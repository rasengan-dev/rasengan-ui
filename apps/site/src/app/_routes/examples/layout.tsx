import { Outlet, type LayoutComponent } from 'rasengan';
import { ExampleToolbar } from '@/components/layout/example-toolbar';

/** The example pages: the page alone, full window, with the floating theme toolbar. */
const ExamplesLayout: LayoutComponent = () => (
  <>
    <Outlet />
    <ExampleToolbar />
  </>
);

export default ExamplesLayout;
