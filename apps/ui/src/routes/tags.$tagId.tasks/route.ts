import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { tasksByTagQueryOptions } from '@/hooks/api/useTasksByTag';

import { tagRoute } from '../tags.$tagId/route';

export const tasksByTagRoute = createRoute({
  getParentRoute: () => tagRoute,
  path: 'tasks',
  component: lazyRouteComponent(() => import('./component')),
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByTagQueryOptions(params.tagId));
  },
});
