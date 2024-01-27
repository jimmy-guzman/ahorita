import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { queryClient } from './queryClient';
import { rootRoute } from './routes/_root';
import { indexRoute } from './routes/index/route';
import { addTaskByTagRoute } from './routes/tags.$tagId.tasks.add/route';
import { tasksByTagRoute } from './routes/tags.$tagId.tasks/route';
import { tagRoute } from './routes/tags.$tagId/route';
import { addTagRoute } from './routes/tags.add/route';
import { tagsRoute } from './routes/tags/route';

const routeTree = rootRoute.addChildren([
  indexRoute,
  tagsRoute.addChildren([
    tagRoute.addChildren([tasksByTagRoute, addTaskByTagRoute]),
    addTagRoute,
  ]),
]);

const router = createRouter({
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
