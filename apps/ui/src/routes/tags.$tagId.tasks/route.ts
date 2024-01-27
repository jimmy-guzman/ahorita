import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { tasksByTagQueryOptions } from '@/api/queryTasksByTag';

import { tagRoute } from '../tags.$tagId/route';

export const tasksByTagRoute = createRoute({
  getParentRoute: () => tagRoute,
  path: 'tasks',
  component: lazyRouteComponent(() => import('./component')),
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByTagQueryOptions(params.tagId));
  },
});
