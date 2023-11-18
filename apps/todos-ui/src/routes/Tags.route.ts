import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { getTags } from '@/lib/api';

import { rootRoute } from './Root.route';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tags',
  component: lazyRouteComponent(() => import('./Tags')),
  beforeLoad: () => ({
    queryOptions: { queryKey: ['tags'], queryFn: getTags } as const,
  }),
  load: async ({ context: { queryClient, queryOptions } }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
});
