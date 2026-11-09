import { Outlet, type LayoutComponent } from 'rasengan';
import { ExampleToolbar } from '@/components/layout/example-toolbar';

/** A block's full-window preview: the block alone, with the floating theme toolbar. */
const PreviewLayout: LayoutComponent = () => (
  <>
    <Outlet />
    <ExampleToolbar />
  </>
);

export default PreviewLayout;
