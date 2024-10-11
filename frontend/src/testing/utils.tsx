import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { RenderOptions } from "@testing-library/react";
import { act, cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  const rootRoute = createRootRoute();
  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => children,
  });
  const routeTree = rootRoute.addChildren([testingRoute]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory(),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error this is due the testing router diverging from the application router */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const customRender = async (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper"> = {},
) => {
  const result = await act(async () =>
    render(ui, {
      wrapper: Wrapper,
      ...options,
    }),
  );

  return {
    user: userEvent.setup(),
    ...result,
  };
};

export { renderHook, screen, within } from "@testing-library/react";

export { customRender as render };
