import { RouterComponent, defineRouter } from 'rasengan';
import Router from 'virtual:rasengan/router';
import NotFound from '@/components/layout/not-found';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
  notFoundComponent: NotFound,
})(AppRouter);
