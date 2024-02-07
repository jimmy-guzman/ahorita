/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as TagsRouteImport } from './routes/tags/route';
import { Route as IndexImport } from './routes/index';
import { Route as TagsAddRouteImport } from './routes/tags/add/route';
import { Route as TagsTagIdRouteImport } from './routes/tags/$tagId/route';
import { Route as TagsTagIdTasksRouteImport } from './routes/tags/$tagId/tasks/route';
import { Route as TagsTagIdAddTaskRouteImport } from './routes/tags/$tagId/add-task/route';

// Create/Update Routes

const TagsRouteRoute = TagsRouteImport.update({
  path: '/tags',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const TagsAddRouteRoute = TagsAddRouteImport.update({
  path: '/add',
  getParentRoute: () => TagsRouteRoute,
} as any);

const TagsTagIdRouteRoute = TagsTagIdRouteImport.update({
  path: '/$tagId',
  getParentRoute: () => TagsRouteRoute,
} as any);

const TagsTagIdTasksRouteRoute = TagsTagIdTasksRouteImport.update({
  path: '/tasks',
  getParentRoute: () => TagsTagIdRouteRoute,
} as any);

const TagsTagIdAddTaskRouteRoute = TagsTagIdAddTaskRouteImport.update({
  path: '/add-task',
  getParentRoute: () => TagsTagIdRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/tags': {
      preLoaderRoute: typeof TagsRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/tags/$tagId': {
      preLoaderRoute: typeof TagsTagIdRouteImport;
      parentRoute: typeof TagsRouteImport;
    };
    '/tags/add': {
      preLoaderRoute: typeof TagsAddRouteImport;
      parentRoute: typeof TagsRouteImport;
    };
    '/tags/$tagId/add-task': {
      preLoaderRoute: typeof TagsTagIdAddTaskRouteImport;
      parentRoute: typeof TagsTagIdRouteImport;
    };
    '/tags/$tagId/tasks': {
      preLoaderRoute: typeof TagsTagIdTasksRouteImport;
      parentRoute: typeof TagsTagIdRouteImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  TagsRouteRoute.addChildren([
    TagsTagIdRouteRoute.addChildren([
      TagsTagIdAddTaskRouteRoute,
      TagsTagIdTasksRouteRoute,
    ]),
    TagsAddRouteRoute,
  ]),
]);

/* prettier-ignore-end */
