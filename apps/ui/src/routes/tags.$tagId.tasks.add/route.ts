import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tagRoute } from '@/routes/tags.$tagId/route';

export const addTaskByTagRoute = new Route({
  getParentRoute: () => tagRoute,
  path: 'tasks/add',
  component: lazyRouteComponent(() => import('./component')),
});
