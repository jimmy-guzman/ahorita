import { meQueryOptions } from "@/api/query-me";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.fetchQuery({
      ...meQueryOptions,
      staleTime: Number.POSITIVE_INFINITY,
    });

    if (!response.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Outlet,
});
