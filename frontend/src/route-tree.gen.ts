/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignupImport } from "./routes/signup";
import { Route as LoginImport } from "./routes/login";
import { Route as AuthRouteImport } from "./routes/_auth/route";
import { Route as IndexImport } from "./routes/index";
import { Route as AuthProjectsImport } from "./routes/_auth/projects";
import { Route as AuthProjectsIndexImport } from "./routes/_auth/projects.index";
import { Route as AuthProjectsNewImport } from "./routes/_auth/projects.new";
import { Route as AuthProjectsProjectIdImport } from "./routes/_auth/projects.$projectId";
import { Route as AuthProjectsProjectIdIndexImport } from "./routes/_auth/projects.$projectId.index";
import { Route as AuthProjectsProjectIdTasksImport } from "./routes/_auth/projects.$projectId.tasks";
import { Route as AuthProjectsProjectIdTasksIndexImport } from "./routes/_auth/projects.$projectId.tasks.index";
import { Route as AuthProjectsProjectIdTasksNewImport } from "./routes/_auth/projects.$projectId.tasks.new";
import { Route as AuthProjectsProjectIdTasksTaskIdImport } from "./routes/_auth/projects.$projectId.tasks.$taskId";

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: "/signup",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const AuthRouteRoute = AuthRouteImport.update({
  id: "/_auth",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const AuthProjectsRoute = AuthProjectsImport.update({
  path: "/projects",
  getParentRoute: () => AuthRouteRoute,
} as any);

const AuthProjectsIndexRoute = AuthProjectsIndexImport.update({
  path: "/",
  getParentRoute: () => AuthProjectsRoute,
} as any);

const AuthProjectsNewRoute = AuthProjectsNewImport.update({
  path: "/new",
  getParentRoute: () => AuthProjectsRoute,
} as any);

const AuthProjectsProjectIdRoute = AuthProjectsProjectIdImport.update({
  path: "/$projectId",
  getParentRoute: () => AuthProjectsRoute,
} as any);

const AuthProjectsProjectIdIndexRoute = AuthProjectsProjectIdIndexImport.update(
  {
    path: "/",
    getParentRoute: () => AuthProjectsProjectIdRoute,
  } as any,
);

const AuthProjectsProjectIdTasksRoute = AuthProjectsProjectIdTasksImport.update(
  {
    path: "/tasks",
    getParentRoute: () => AuthProjectsProjectIdRoute,
  } as any,
);

const AuthProjectsProjectIdTasksIndexRoute =
  AuthProjectsProjectIdTasksIndexImport.update({
    path: "/",
    getParentRoute: () => AuthProjectsProjectIdTasksRoute,
  } as any);

const AuthProjectsProjectIdTasksNewRoute =
  AuthProjectsProjectIdTasksNewImport.update({
    path: "/new",
    getParentRoute: () => AuthProjectsProjectIdTasksRoute,
  } as any);

const AuthProjectsProjectIdTasksTaskIdRoute =
  AuthProjectsProjectIdTasksTaskIdImport.update({
    path: "/$taskId",
    getParentRoute: () => AuthProjectsProjectIdTasksRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_auth": {
      id: "/_auth";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/signup": {
      id: "/signup";
      path: "/signup";
      fullPath: "/signup";
      preLoaderRoute: typeof SignupImport;
      parentRoute: typeof rootRoute;
    };
    "/_auth/projects": {
      id: "/_auth/projects";
      path: "/projects";
      fullPath: "/projects";
      preLoaderRoute: typeof AuthProjectsImport;
      parentRoute: typeof AuthRouteImport;
    };
    "/_auth/projects/$projectId": {
      id: "/_auth/projects/$projectId";
      path: "/$projectId";
      fullPath: "/projects/$projectId";
      preLoaderRoute: typeof AuthProjectsProjectIdImport;
      parentRoute: typeof AuthProjectsImport;
    };
    "/_auth/projects/new": {
      id: "/_auth/projects/new";
      path: "/new";
      fullPath: "/projects/new";
      preLoaderRoute: typeof AuthProjectsNewImport;
      parentRoute: typeof AuthProjectsImport;
    };
    "/_auth/projects/": {
      id: "/_auth/projects/";
      path: "/";
      fullPath: "/projects/";
      preLoaderRoute: typeof AuthProjectsIndexImport;
      parentRoute: typeof AuthProjectsImport;
    };
    "/_auth/projects/$projectId/tasks": {
      id: "/_auth/projects/$projectId/tasks";
      path: "/tasks";
      fullPath: "/projects/$projectId/tasks";
      preLoaderRoute: typeof AuthProjectsProjectIdTasksImport;
      parentRoute: typeof AuthProjectsProjectIdImport;
    };
    "/_auth/projects/$projectId/": {
      id: "/_auth/projects/$projectId/";
      path: "/";
      fullPath: "/projects/$projectId/";
      preLoaderRoute: typeof AuthProjectsProjectIdIndexImport;
      parentRoute: typeof AuthProjectsProjectIdImport;
    };
    "/_auth/projects/$projectId/tasks/$taskId": {
      id: "/_auth/projects/$projectId/tasks/$taskId";
      path: "/$taskId";
      fullPath: "/projects/$projectId/tasks/$taskId";
      preLoaderRoute: typeof AuthProjectsProjectIdTasksTaskIdImport;
      parentRoute: typeof AuthProjectsProjectIdTasksImport;
    };
    "/_auth/projects/$projectId/tasks/new": {
      id: "/_auth/projects/$projectId/tasks/new";
      path: "/new";
      fullPath: "/projects/$projectId/tasks/new";
      preLoaderRoute: typeof AuthProjectsProjectIdTasksNewImport;
      parentRoute: typeof AuthProjectsProjectIdTasksImport;
    };
    "/_auth/projects/$projectId/tasks/": {
      id: "/_auth/projects/$projectId/tasks/";
      path: "/";
      fullPath: "/projects/$projectId/tasks/";
      preLoaderRoute: typeof AuthProjectsProjectIdTasksIndexImport;
      parentRoute: typeof AuthProjectsProjectIdTasksImport;
    };
  }
}

// Create and export the route tree

interface AuthProjectsProjectIdTasksRouteChildren {
  AuthProjectsProjectIdTasksTaskIdRoute: typeof AuthProjectsProjectIdTasksTaskIdRoute;
  AuthProjectsProjectIdTasksNewRoute: typeof AuthProjectsProjectIdTasksNewRoute;
  AuthProjectsProjectIdTasksIndexRoute: typeof AuthProjectsProjectIdTasksIndexRoute;
}

const AuthProjectsProjectIdTasksRouteChildren: AuthProjectsProjectIdTasksRouteChildren =
  {
    AuthProjectsProjectIdTasksTaskIdRoute:
      AuthProjectsProjectIdTasksTaskIdRoute,
    AuthProjectsProjectIdTasksNewRoute: AuthProjectsProjectIdTasksNewRoute,
    AuthProjectsProjectIdTasksIndexRoute: AuthProjectsProjectIdTasksIndexRoute,
  };

const AuthProjectsProjectIdTasksRouteWithChildren =
  AuthProjectsProjectIdTasksRoute._addFileChildren(
    AuthProjectsProjectIdTasksRouteChildren,
  );

interface AuthProjectsProjectIdRouteChildren {
  AuthProjectsProjectIdTasksRoute: typeof AuthProjectsProjectIdTasksRouteWithChildren;
  AuthProjectsProjectIdIndexRoute: typeof AuthProjectsProjectIdIndexRoute;
}

const AuthProjectsProjectIdRouteChildren: AuthProjectsProjectIdRouteChildren = {
  AuthProjectsProjectIdTasksRoute: AuthProjectsProjectIdTasksRouteWithChildren,
  AuthProjectsProjectIdIndexRoute: AuthProjectsProjectIdIndexRoute,
};

const AuthProjectsProjectIdRouteWithChildren =
  AuthProjectsProjectIdRoute._addFileChildren(
    AuthProjectsProjectIdRouteChildren,
  );

interface AuthProjectsRouteChildren {
  AuthProjectsProjectIdRoute: typeof AuthProjectsProjectIdRouteWithChildren;
  AuthProjectsNewRoute: typeof AuthProjectsNewRoute;
  AuthProjectsIndexRoute: typeof AuthProjectsIndexRoute;
}

const AuthProjectsRouteChildren: AuthProjectsRouteChildren = {
  AuthProjectsProjectIdRoute: AuthProjectsProjectIdRouteWithChildren,
  AuthProjectsNewRoute: AuthProjectsNewRoute,
  AuthProjectsIndexRoute: AuthProjectsIndexRoute,
};

const AuthProjectsRouteWithChildren = AuthProjectsRoute._addFileChildren(
  AuthProjectsRouteChildren,
);

interface AuthRouteRouteChildren {
  AuthProjectsRoute: typeof AuthProjectsRouteWithChildren;
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthProjectsRoute: AuthProjectsRouteWithChildren,
};

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof AuthRouteRouteWithChildren;
  "/login": typeof LoginRoute;
  "/signup": typeof SignupRoute;
  "/projects": typeof AuthProjectsRouteWithChildren;
  "/projects/$projectId": typeof AuthProjectsProjectIdRouteWithChildren;
  "/projects/new": typeof AuthProjectsNewRoute;
  "/projects/": typeof AuthProjectsIndexRoute;
  "/projects/$projectId/tasks": typeof AuthProjectsProjectIdTasksRouteWithChildren;
  "/projects/$projectId/": typeof AuthProjectsProjectIdIndexRoute;
  "/projects/$projectId/tasks/$taskId": typeof AuthProjectsProjectIdTasksTaskIdRoute;
  "/projects/$projectId/tasks/new": typeof AuthProjectsProjectIdTasksNewRoute;
  "/projects/$projectId/tasks/": typeof AuthProjectsProjectIdTasksIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof AuthRouteRouteWithChildren;
  "/login": typeof LoginRoute;
  "/signup": typeof SignupRoute;
  "/projects/new": typeof AuthProjectsNewRoute;
  "/projects": typeof AuthProjectsIndexRoute;
  "/projects/$projectId": typeof AuthProjectsProjectIdIndexRoute;
  "/projects/$projectId/tasks/$taskId": typeof AuthProjectsProjectIdTasksTaskIdRoute;
  "/projects/$projectId/tasks/new": typeof AuthProjectsProjectIdTasksNewRoute;
  "/projects/$projectId/tasks": typeof AuthProjectsProjectIdTasksIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_auth": typeof AuthRouteRouteWithChildren;
  "/login": typeof LoginRoute;
  "/signup": typeof SignupRoute;
  "/_auth/projects": typeof AuthProjectsRouteWithChildren;
  "/_auth/projects/$projectId": typeof AuthProjectsProjectIdRouteWithChildren;
  "/_auth/projects/new": typeof AuthProjectsNewRoute;
  "/_auth/projects/": typeof AuthProjectsIndexRoute;
  "/_auth/projects/$projectId/tasks": typeof AuthProjectsProjectIdTasksRouteWithChildren;
  "/_auth/projects/$projectId/": typeof AuthProjectsProjectIdIndexRoute;
  "/_auth/projects/$projectId/tasks/$taskId": typeof AuthProjectsProjectIdTasksTaskIdRoute;
  "/_auth/projects/$projectId/tasks/new": typeof AuthProjectsProjectIdTasksNewRoute;
  "/_auth/projects/$projectId/tasks/": typeof AuthProjectsProjectIdTasksIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | ""
    | "/login"
    | "/signup"
    | "/projects"
    | "/projects/$projectId"
    | "/projects/new"
    | "/projects/"
    | "/projects/$projectId/tasks"
    | "/projects/$projectId/"
    | "/projects/$projectId/tasks/$taskId"
    | "/projects/$projectId/tasks/new"
    | "/projects/$projectId/tasks/";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | ""
    | "/login"
    | "/signup"
    | "/projects/new"
    | "/projects"
    | "/projects/$projectId"
    | "/projects/$projectId/tasks/$taskId"
    | "/projects/$projectId/tasks/new"
    | "/projects/$projectId/tasks";
  id:
    | "__root__"
    | "/"
    | "/_auth"
    | "/login"
    | "/signup"
    | "/_auth/projects"
    | "/_auth/projects/$projectId"
    | "/_auth/projects/new"
    | "/_auth/projects/"
    | "/_auth/projects/$projectId/tasks"
    | "/_auth/projects/$projectId/"
    | "/_auth/projects/$projectId/tasks/$taskId"
    | "/_auth/projects/$projectId/tasks/new"
    | "/_auth/projects/$projectId/tasks/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthRouteRoute: typeof AuthRouteRouteWithChildren;
  LoginRoute: typeof LoginRoute;
  SignupRoute: typeof SignupRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  LoginRoute: LoginRoute,
  SignupRoute: SignupRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/projects"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_auth/projects": {
      "filePath": "_auth/projects.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/projects/$projectId",
        "/_auth/projects/new",
        "/_auth/projects/"
      ]
    },
    "/_auth/projects/$projectId": {
      "filePath": "_auth/projects.$projectId.tsx",
      "parent": "/_auth/projects",
      "children": [
        "/_auth/projects/$projectId/tasks",
        "/_auth/projects/$projectId/"
      ]
    },
    "/_auth/projects/new": {
      "filePath": "_auth/projects.new.tsx",
      "parent": "/_auth/projects"
    },
    "/_auth/projects/": {
      "filePath": "_auth/projects.index.tsx",
      "parent": "/_auth/projects"
    },
    "/_auth/projects/$projectId/tasks": {
      "filePath": "_auth/projects.$projectId.tasks.tsx",
      "parent": "/_auth/projects/$projectId",
      "children": [
        "/_auth/projects/$projectId/tasks/$taskId",
        "/_auth/projects/$projectId/tasks/new",
        "/_auth/projects/$projectId/tasks/"
      ]
    },
    "/_auth/projects/$projectId/": {
      "filePath": "_auth/projects.$projectId.index.tsx",
      "parent": "/_auth/projects/$projectId"
    },
    "/_auth/projects/$projectId/tasks/$taskId": {
      "filePath": "_auth/projects.$projectId.tasks.$taskId.tsx",
      "parent": "/_auth/projects/$projectId/tasks"
    },
    "/_auth/projects/$projectId/tasks/new": {
      "filePath": "_auth/projects.$projectId.tasks.new.tsx",
      "parent": "/_auth/projects/$projectId/tasks"
    },
    "/_auth/projects/$projectId/tasks/": {
      "filePath": "_auth/projects.$projectId.tasks.index.tsx",
      "parent": "/_auth/projects/$projectId/tasks"
    }
  }
}
ROUTE_MANIFEST_END */
