import type { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext } from '@tanstack/react-router';

import { RootLayout } from './_layout';

export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});
