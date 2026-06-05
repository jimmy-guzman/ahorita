import { createFileRoute } from "@tanstack/react-router";

import { queryTaskOptions } from "@/api/query-task";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { TaskDetails } from "@/components/task-details";

export const Route = createFileRoute("/(authenticated)/tasks/$taskId")({
  component: TaskDetails,
  errorComponent: RouteErrorComponent,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(queryTaskOptions(params));
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-4">
      <div className="dsy-skeleton h-7 w-64" />
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          <div key={i} className="dsy-skeleton h-4 w-24" />
        ))}
      </div>
    </div>
  ),
});
