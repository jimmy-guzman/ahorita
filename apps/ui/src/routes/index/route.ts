import { Route } from '@tanstack/react-router';

import { rootRoute } from '../_root';
import Home from './component';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
