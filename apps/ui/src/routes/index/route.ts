import { createRoute } from '@tanstack/react-router';

import { rootRoute } from '../_root';
import Home from './component';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
