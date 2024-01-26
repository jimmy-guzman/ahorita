import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { tagsQueryOptions } from '@/hooks/api/useQueryTags';
import { rootRoute } from '@/routes/_root';

export const tagsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'tags',
  component: lazyRouteComponent(() => import('./component')),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tagsQueryOptions);
  },
});
