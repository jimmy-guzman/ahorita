import { Route } from '@tanstack/react-router';

import { rootRoute } from './Root.route';
import Tags from './Tags';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/tags',
  component: Tags,
});
