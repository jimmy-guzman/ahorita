import './index.css';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-hot-toast';

import { homeRoute } from './routes/homeRoute';
import { rootRoute } from './routes/rootRoute';
import {
  addTagRoute,
  addTaskByTagRoute,
  tagRoute,
  tagsRoute,
  tasksByTagRoute,
} from './routes/tagsRoute';

const queryCache = new QueryCache({
  onError: (error) => toast.error(`Something went wrong: ${error.message}`),
});

const mutationCache = new MutationCache({
  onError: (error) => toast.error(`Something went wrong: ${error.message}`),
});

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tagsRoute.addChildren([
    tagRoute.addChildren([tasksByTagRoute, addTaskByTagRoute]),
    addTagRoute,
  ]),
]);

const router = new Router({
  routeTree,
  defaultPreloadStaleTime: 0,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}
