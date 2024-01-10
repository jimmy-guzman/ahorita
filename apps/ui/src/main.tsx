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

import { route as homeRoute } from './routes/Home.route';
import { rootRoute } from './routes/Root.route';
import { route as tagsRoute } from './routes/Tags.route';
import { tasksRoute as tasksRoute } from './routes/Tasks.route';

const routeTree = rootRoute.addChildren([homeRoute, tasksRoute, tagsRoute]);

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
