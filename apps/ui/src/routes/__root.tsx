/* eslint-disable import/exports-last */
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { Toaster } from '@/components/Toaster';

const RouterDevTools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

const Root = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <Suspense>
        <RouterDevTools position='bottom-left' />
      </Suspense>
    </>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({ component: Root });
