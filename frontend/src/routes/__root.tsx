import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

const Root = () => {
  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "dsy-alert",
            success: "dsy-alert-success",
            info: "dsy-alert-info",
            error: "dsy-alert-error",
            loading: "dsy-alert-info",
            warning: "dsy-alert-warning",
          },
        }}
      />
      <TanStackDevtools
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
};

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({ component: Root });
