import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

import { groupsQueryOptions } from "@/api/query-groups";
import { meQueryOptions } from "@/api/query-me";

export const Route = createFileRoute("/groups")({
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.fetchQuery({
      ...meQueryOptions,
      staleTime: Infinity,
    });

    if (!response.data?.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(groupsQueryOptions);
  },
});
