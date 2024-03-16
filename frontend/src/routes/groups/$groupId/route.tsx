import { groupQueryOptions } from "@/api/query-group";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/groups/$groupId")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(groupQueryOptions(params.groupId));
  },
});
