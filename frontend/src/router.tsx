import { createRouter } from "@tanstack/react-router";

import { ErrorStatus } from "./components/error-status";
import { NotFound } from "./components/not-found";
import queryClient from "./query-client";
import { routeTree } from "./route-tree.gen";

export const router = createRouter({
  routeTree,
  defaultPreloadStaleTime: 0,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorStatus,
  defaultStructuralSharing: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
