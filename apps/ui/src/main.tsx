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

import { rootRoute } from './routes/_root';
import { indexRoute } from './routes/index/route';
import { addTaskByTagRoute } from './routes/tags.$tagId.add.tasks.add/route';
import { addTagRoute } from './routes/tags.$tagId.add/route';
import { tasksByTagRoute } from './routes/tags.$tagId.tasks/route';
import { tagRoute } from './routes/tags.$tagId/route';
import { tagsRoute } from './routes/tags/route';

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
  indexRoute,
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
