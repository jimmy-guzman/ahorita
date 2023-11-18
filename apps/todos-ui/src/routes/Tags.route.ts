import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { rootRoute } from './Root.route';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tags',
  component: lazyRouteComponent(() => import('./Tags')),
});
