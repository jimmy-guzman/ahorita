import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LayoutListIcon, ListChecksIcon, ListPlusIcon } from "lucide-react";
import { queryTasksOptions } from "@/api/query-tasks";

export const TasksStats = () => {
  const { data } = useSuspenseQuery(queryTasksOptions());

  return (
    <div className="dsy-stats dsy-stats-vertical sm:dsy-stats-horizontal bg-base-200 shadow-sm">
      <div className="dsy-stat">
        <div className="dsy-stat-figure">
          <Link
            to="/tasks"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            search={{ status: "Done" }}
          >
            <span className="sr-only">View Completed Tasks</span>
            <ListChecksIcon />
          </Link>
        </div>
        <div className="dsy-stat-title">Tasks Completed</div>
        <div className="dsy-stat-value">
          {data.filter((task) => task.status === "Done").length}
        </div>
      </div>

      <div className="dsy-stat">
        <div className="dsy-stat-figure">
          <Link
            to="/tasks"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            search={{ status: "In Progress" }}
          >
            <span className="sr-only">View In Progress Tasks</span>
            <LayoutListIcon />
          </Link>
        </div>
        <div className="dsy-stat-title">In Progress Tasks</div>
        <div className="dsy-stat-value">
          {data.filter((task) => task.status === "In Progress").length}
        </div>
      </div>

      <div className="dsy-stat">
        <div className="dsy-stat-figure">
          <Link to="/tasks" className="dsy-btn dsy-btn-neutral dsy-btn-circle">
            <span className="sr-only">View All Tasks</span>
            <ListPlusIcon />
          </Link>
        </div>
        <div className="dsy-stat-title">Total Tasks</div>
        <div className="dsy-stat-value">{data.length}</div>
      </div>
    </div>
  );
};
