import './index.css';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Router, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import toast from 'react-hot-toast';

import { route as homeRoute } from './routes/Home.route';
import { rootRoute } from './routes/Root.route';
import { route as tagsRoute } from './routes/Tags.route';
import { route as tasksRoute } from './routes/Tasks.route';

const routeTree = rootRoute.addChildren([homeRoute, tasksRoute, tagsRoute]);

const router = new Router({ routeTree });

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

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
