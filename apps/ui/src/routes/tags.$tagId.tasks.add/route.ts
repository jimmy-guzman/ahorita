import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { tagRoute } from '@/routes/tags.$tagId/route';

export const addTaskByTagRoute = createRoute({
  getParentRoute: () => tagRoute,
  path: 'tasks/add',
  component: lazyRouteComponent(() => import('./component')),
});
