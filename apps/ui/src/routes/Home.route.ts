import { Route } from '@tanstack/react-router';

import Home from './Home';
import { rootRoute } from './Root.route';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
