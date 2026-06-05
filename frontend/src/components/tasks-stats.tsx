import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LayoutListIcon, ListChecksIcon, ListPlusIcon } from "lucide-react";

import { queryTasksOptions } from "@/api/query-tasks";

export const TasksStats = () => {
  const { data } = useSuspenseQuery(queryTasksOptions());

  const done = data.filter((t) => t.status === "Done").length;
  const inProgress = data.filter((t) => t.status === "In Progress").length;
  const total = data.length;

  return (
    <div className="flex divide-x divide-base-300 overflow-hidden rounded-box border border-base-300">
      <Link
        to="/tasks"
        search={{ status: "Done" }}
        className="flex flex-1 flex-col gap-1 px-5 py-4 transition-colors hover:bg-base-200"
      >
        <div className="flex items-center gap-2 text-base-content/50">
          <ListChecksIcon className="h-4 w-4" />
          <span className="font-medium text-xs uppercase tracking-wider">
            Completed
          </span>
        </div>
        <span className="font-semibold text-3xl tabular-nums">{done}</span>
      </Link>

      <Link
        to="/tasks"
        search={{ status: "In Progress" }}
        className="flex flex-1 flex-col gap-1 px-5 py-4 transition-colors hover:bg-base-200"
      >
        <div className="flex items-center gap-2 text-base-content/50">
          <LayoutListIcon className="h-4 w-4" />
          <span className="font-medium text-xs uppercase tracking-wider">
            In Progress
          </span>
        </div>
        <span className="font-semibold text-3xl tabular-nums">
          {inProgress}
        </span>
      </Link>

      <Link
        to="/tasks"
        className="flex flex-1 flex-col gap-1 px-5 py-4 transition-colors hover:bg-base-200"
      >
        <div className="flex items-center gap-2 text-base-content/50">
          <ListPlusIcon className="h-4 w-4" />
          <span className="font-medium text-xs uppercase tracking-wider">
            Total
          </span>
        </div>
        <span className="font-semibold text-3xl tabular-nums">{total}</span>
      </Link>
    </div>
  );
};
