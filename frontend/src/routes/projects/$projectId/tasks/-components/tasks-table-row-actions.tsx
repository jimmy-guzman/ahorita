import { useMutation } from "@tanstack/react-query";
import { EllipsisIcon } from "lucide-react";

import { editTaskMutationOptions } from "@/api/edit-task";
import {
  type Priority,
  type Status,
  labels,
  priorities,
  statuses,
} from "@/constants/tasks";

import { DeleteTaskAction } from "./delete-task-action";
import { RenameTaskAction } from "./rename-task-action";

interface TaskTableActionsProps {
  task: {
    id: string;
    projectId: string;
    name: string;
    status: Status;
    priority: Priority;
    label: "Feature" | "Bug" | "Documentation";
    createdAt: string;
    updatedAt: string;
  };
}

export const TasksTableRowActions = ({ task }: TaskTableActionsProps) => {
  const editMutation = useMutation(editTaskMutationOptions);

  return (
    <details className="dsy-dropdown dsy-dropdown-end">
      <summary className="dsy-btn dsy-btn-ghost dsy-btn-sm">
        <EllipsisIcon />
        <span className="sr-only">Open menu</span>
      </summary>
      <ul
        aria-label={`${task.name} actions`}
        className="dsy-dropdown-content dsy-menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li className="dsy-menu-title">{task.name}</li>
        <li>
          <details>
            <summary>Status</summary>
            <ul>
              {statuses.map(({ status, label }) => (
                <li key={status}>
                  <button
                    type="button"
                    onClick={() => {
                      editMutation.mutate({
                        params: { taskId: task.id },
                        body: { status },
                      });
                    }}
                  >
                    {label}
                    {task.status === status && (
                      <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Priority</summary>
            <ul>
              {priorities.map(({ priority, label }) => (
                <li key={priority}>
                  <button
                    type="button"
                    onClick={() => {
                      editMutation.mutate({
                        params: { taskId: task.id },
                        body: { priority },
                      });
                    }}
                  >
                    {label}
                    {task.priority === priority && (
                      <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Label</summary>
            <ul>
              {labels.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => {
                      editMutation.mutate({
                        params: { taskId: task.id },
                        body: { label },
                      });
                    }}
                  >
                    {label}
                    {task.label === label && (
                      <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <div className="dsy-divider my-1" />
        <li>
          <RenameTaskAction name={task.name} taskId={task.id} />
        </li>
        <li>
          <DeleteTaskAction name={task.name} taskId={task.id} />
        </li>
      </ul>
    </details>
  );
};
