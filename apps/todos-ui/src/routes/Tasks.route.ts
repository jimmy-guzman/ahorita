import { Route } from '@tanstack/react-router';

import { getTodos } from '../lib/api';
import { rootRoute } from './Root.route';
import Tasks from './Tasks';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: Tasks,
  beforeLoad: () => ({
    queryOptions: { queryKey: ['tasks'], queryFn: getTodos } as const,
  }),
  load: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
});
