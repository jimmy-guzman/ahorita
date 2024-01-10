import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

import { rootRoute } from './Root.route';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tags',
  component: lazyRouteComponent(() => import('./Tags')),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tagsQueryOptions);
  },
});
