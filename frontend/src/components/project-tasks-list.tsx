import { Link } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";

import type { APIRoutes } from "@/api/client";

import { PriorityCell } from "./tasks-table/priority-cell";
import { TasksTableStatusCell } from "./tasks-table/status-cell";
import { TaskActions } from "./tasks-table/task-actions";

interface ProjectTasksListProps {
  tasks: APIRoutes["tasks"]["get"]["response"]["200"];
}

export const ProjectTasksList = ({ tasks }: ProjectTasksListProps) => {
  if (tasks.length === 0) {
    return (
      <div role="alert" className="dsy-alert dsy-alert-soft">
        <ListPlusIcon aria-hidden="true" className="h-4 w-4" />
        <span>No tasks for this project yet.</span>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="group flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-base-200"
        >
          <TasksTableStatusCell status={task.status} />

          <Link
            className="flex-1 truncate font-medium hover:underline"
            to="/tasks/$taskId"
            params={{ taskId: task.id }}
          >
            {task.name}
          </Link>

          <span className="hidden text-base-content/50 text-xs sm:inline">
            {task.label}
          </span>

          <PriorityCell priority={task.priority} />

          <span className="hidden text-base-content/30 text-xs sm:inline">
            {new Date(task.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>

          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <TaskActions task={task} />
          </div>
        </li>
      ))}
    </ul>
  );
};
