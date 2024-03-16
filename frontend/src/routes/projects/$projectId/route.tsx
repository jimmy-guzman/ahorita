import { createFileRoute } from "@tanstack/react-router";

import { groupQueryOptions } from "@/api/query-project";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(groupQueryOptions(params.projectId));
  },
});
