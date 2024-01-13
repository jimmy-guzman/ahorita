import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tasksQueryOptions } from '@/hooks/api/useQueryTasks';

import { rootRoute } from './rootRoute';

export const tasksRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'tasks',
  component: lazyRouteComponent(() => import('@/pages/Tasks')),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tasksQueryOptions());
  },
});
