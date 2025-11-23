import { Link } from "@tanstack/react-router";
import type { APIRoutes } from "@/api/client";
import { cn } from "@/utils/cn";

interface ProjectTasksListProps {
  tasks: APIRoutes["tasks"]["get"]["response"]["200"];
}

const statusBadgeClass = {
  Backlog: "dsy-badge-neutral",
  Todo: "dsy-badge-info",
  "In Progress": "dsy-badge-warning",
  Done: "dsy-badge-success",
  Canceled: "dsy-badge-ghost",
} as const;

const priorityBadgeClass = {
  Low: "dsy-badge-ghost",
  Medium: "dsy-badge-warning",
  High: "dsy-badge-error",
} as const;

export const ProjectTasksList = ({ tasks }: ProjectTasksListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="dsy-alert dsy-alert-info">
        <span>No tasks for this project yet.</span>
      </div>
    );
  }

  return (
    <ul className="dsy-list mt-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="dsy-list-row flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex flex-1 flex-col gap-2">
            <Link
              className="dsy-link font-semibold text-sm sm:text-base"
              to={"/tasks/$taskId"}
              params={{ taskId: task.id }}
            >
              {task.name}
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="dsy-badge dsy-badge-outline dsy-badge-xs">
                {task.label}
              </span>
              <span
                className={cn(
                  "dsy-badge dsy-badge-xs",
                  statusBadgeClass[task.status],
                )}
              >
                {task.status}
              </span>

              <span
                className={cn(
                  "dsy-badge dsy-badge-xs",
                  priorityBadgeClass[task.priority],
                )}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>

          <div className="text-base-content/60 text-xs sm:pt-1">
            Updated{" "}
            {new Date(task.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </li>
      ))}
    </ul>
  );
};
