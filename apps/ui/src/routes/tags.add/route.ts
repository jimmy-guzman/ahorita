import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { tagsRoute } from '../tags/route';

export const addTagRoute = createRoute({
  getParentRoute: () => tagsRoute,
  path: 'add',
  component: lazyRouteComponent(() => import('./component')),
});
