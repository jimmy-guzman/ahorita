import { useSuspenseQuery } from "@tanstack/react-query";
import { LayoutListIcon, ListChecksIcon, ListPlusIcon } from "lucide-react";

import { tasksQueryOptions } from "@/api/query-tasks";

export const TasksStats = () => {
  const { data } = useSuspenseQuery(tasksQueryOptions());

  return (
    <div className="dsy-stats dsy-stats-vertical sm:dsy-stats-horizontal bg-base-200 shadow">
      <div className="dsy-stat">
        <div className="dsy-stat-figure text-secondary">
          <ListChecksIcon />
        </div>
        <div className="dsy-stat-title">Tasks Completed</div>
        <div className="dsy-stat-value">
          {data.filter((task) => task.status === "Done").length}
        </div>
      </div>

      <div className="dsy-stat">
        <div className="dsy-stat-figure text-secondary">
          <LayoutListIcon />
        </div>
        <div className="dsy-stat-title">In Progress Tasks</div>
        <div className="dsy-stat-value">
          {data.filter((task) => task.status === "In Progress").length}
        </div>
      </div>

      <div className="dsy-stat">
        <div className="dsy-stat-figure text-secondary">
          <ListPlusIcon />
        </div>
        <div className="dsy-stat-title">Total Tasks</div>
        <div className="dsy-stat-value">{data.length}</div>
      </div>
    </div>
  );
};
