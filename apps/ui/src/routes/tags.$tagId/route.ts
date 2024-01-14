import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { tagQueryOptions } from '@/hooks/api/useTag';

import { tagsRoute } from '../tags/route';
import { Pending } from './pending';

export const tagRoute = new Route({
  getParentRoute: () => tagsRoute,
  path: '$tagId',
  component: lazyRouteComponent(() => import('./component')),
  pendingComponent: Pending,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tagQueryOptions(params.tagId));
  },
});
