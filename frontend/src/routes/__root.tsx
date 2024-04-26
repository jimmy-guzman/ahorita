import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

import { cn } from "@/utils/cn";

const RouterDevTools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null;

const Root = () => {
  return (
    <>
      <Outlet />
      <Toaster
        cn={cn}
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
      <Suspense>
        <RouterDevTools position="bottom-left" />
      </Suspense>
    </>
  );
};

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({ component: Root });
