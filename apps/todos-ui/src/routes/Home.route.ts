import { Route } from '@tanstack/react-router';
import { rootRoute } from './Root.route';
import Home from './Home';
import { loader } from './Home.loader';

export const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  loader: loader,
});
