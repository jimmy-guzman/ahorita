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

import type { FileRoutesById } from "@/route-tree.gen";

afterEach(() => {
  cleanup();
});

interface WrapperProps {
  children: ReactNode;
  path: keyof FileRoutesById;
  initialEntries: string[];
}

const Wrapper = ({ children, path, initialEntries }: WrapperProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const rootRoute = createRootRoute();
  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => children,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([testingRoute]),
    history: createMemoryHistory({ initialEntries }),
    context: { queryClient },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const customRender = async (
  ui: ReactElement,
  {
    path = "/",
    initialEntries = [path],
    ...options
  }: Omit<RenderOptions, "wrapper"> & Partial<WrapperProps> = {},
) => {
  const result = await act(async () => {
    return render(ui, {
      wrapper: ({ children }) => {
        return (
          <Wrapper path={path} initialEntries={initialEntries}>
            {children}
          </Wrapper>
        );
      },
      ...options,
    });
  });

  return {
    user: userEvent.setup(),
    ...result,
  };
};

export { renderHook, screen, within } from "@testing-library/react";

export { customRender as render };
