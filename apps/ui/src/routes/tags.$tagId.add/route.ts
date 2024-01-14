import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tagsRoute } from '../tags/route';

export const addTagRoute = new Route({
  getParentRoute: () => tagsRoute,
  path: 'add',
  component: lazyRouteComponent(() => import('./component')),
});
