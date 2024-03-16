import { createFileRoute } from "@tanstack/react-router";

import { projectQueryOptions } from "@/api/query-project";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQueryOptions(params.projectId));
  },
});
