import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

import { rootRoute } from './rootRoute';

export const tagsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/tags',
  component: lazyRouteComponent(() => import('@/pages/Tags')),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tagsQueryOptions);
  },
});
