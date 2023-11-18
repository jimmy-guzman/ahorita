import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { getTodos } from '../lib/api';
import { rootRoute } from './Root.route';

export const tasksRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'tasks',
  component: lazyRouteComponent(() => import('./Tasks')),
  beforeLoad: () => ({
    queryOptions: { queryKey: ['tasks'], queryFn: getTodos } as const,
  }),
  load: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
});
