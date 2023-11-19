import type { QueryClient } from '@tanstack/react-query';
import { rootRouteWithContext } from '@tanstack/react-router';

import { RootLayout } from '@/layouts/RootLayout';

export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});
