import { Route } from '@tanstack/react-router';

import Home from './Home';
import { loader } from './Home.loader';
import { rootRoute } from './Root.route';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  loader: loader,
});
