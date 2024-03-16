import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

import { meQueryOptions } from "@/api/query-me";
import { projectsQueryOptions } from "@/api/query-projects";

export const Route = createFileRoute("/projects")({
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
    await queryClient.ensureQueryData(projectsQueryOptions);
  },
});
