import { Route } from '@tanstack/react-router';

import { rootRoute } from './Root.route';
import Tasks from './Tasks';
import { loader } from './Tasks.loader';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: Tasks,
  loader: loader,
});
