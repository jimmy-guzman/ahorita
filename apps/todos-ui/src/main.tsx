import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, Router } from '@tanstack/react-router';

import { rootRoute } from './routes/Root.route';
import { route as homeRoute } from './routes/Home.route';

import './index.css';

const routeTree = rootRoute.addChildren([homeRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
