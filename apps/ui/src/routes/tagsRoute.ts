import { lazyRouteComponent, Route } from '@tanstack/react-router';

import { CardLoading } from '@/components/atoms/CardLoading';
import { tagsQueryOptions } from '@/hooks/api/useQueryTags';
import { tagQueryOptions } from '@/hooks/api/useTag';
import { tasksByTagQueryOptions } from '@/hooks/api/useTasksByTag';

import { rootRoute } from './rootRoute';

export const tagsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'tags',
  component: lazyRouteComponent(() => import('@/pages/Tags')),
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(tagsQueryOptions);
  },
});

export const tagRoute = new Route({
  getParentRoute: () => tagsRoute,
  path: '$tagId',
  component: lazyRouteComponent(() => import('@/pages/Tag')),
  pendingComponent: CardLoading,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tagQueryOptions(params.tagId));
  },
});

export const addTagRoute = new Route({
  getParentRoute: () => tagsRoute,
  path: 'add',
  component: lazyRouteComponent(() => import('@/pages/AddTag')),
});

export const tasksByTagRoute = new Route({
  getParentRoute: () => tagRoute,
  path: 'tasks',
  component: lazyRouteComponent(() => import('@/pages/TasksByTag')),
  pendingComponent: CardLoading,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByTagQueryOptions(params.tagId));
  },
});

export const addTaskByTagRoute = new Route({
  getParentRoute: () => tagRoute,
  path: 'tasks/add',
  component: lazyRouteComponent(() => import('@/pages/AddTaskByTag')),
});
