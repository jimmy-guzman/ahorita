import { createFileRoute } from "@tanstack/react-router";

import { OverviewChart } from "@/components/overview-chart";
import { TasksStats } from "@/components/tasks-stats";

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div className="prose dsy-prose">
        <h2>Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <TasksStats />
        <div className="dsy-card bg-base-200 shadow-sm">
          <div className="dsy-card-body">
            <h2 className="dsy-card-title">Overview</h2>
            <OverviewChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/$username")({
  component: Component,
});
