import { createFileRoute } from "@tanstack/react-router";

import { OverviewChart } from "@/components/overview-chart";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { TasksStats } from "@/components/tasks-stats";

function Component() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-base-content text-xl">Dashboard</h1>
      <TasksStats />
      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-base-content/60 text-sm uppercase tracking-wider">
          Overview
        </h2>
        <OverviewChart />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: Component,
  errorComponent: RouteErrorComponent,
  pendingComponent: () => (
    <div className="flex flex-col gap-6">
      <div className="dsy-skeleton h-7 w-28" />

      {/* Stat grid skeleton */}
      <div className="flex divide-x divide-base-300 overflow-hidden rounded-box border border-base-300">
        {Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          <div key={i} className="flex flex-1 flex-col gap-2 px-5 py-4">
            <div className="dsy-skeleton h-3 w-20" />
            <div className="dsy-skeleton h-8 w-12" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div>
        <div className="dsy-skeleton mb-3 h-4 w-16" />
        <div className="dsy-skeleton h-64 w-full" />
      </div>
    </div>
  ),
});
