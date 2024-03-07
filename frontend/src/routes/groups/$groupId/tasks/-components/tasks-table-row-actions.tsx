import { useMutation } from "@tanstack/react-query";
import { MenuIcon, TrashIcon } from "lucide-react";

import { deleteTaskMutationOptions } from "@/api/delete-task";
import { editTaskMutationOptions } from "@/api/edit-task";
import {
  type Priority,
  type Status,
  priorities,
  statuses,
} from "@/constants/tasks";

interface TaskTableActionsProps {
  task: {
    id: string;
    groupId: string;
    name: string;
    status: Status;
    priority: Priority;
    createdAt: string;
    updatedAt: string;
  };
}

export const TasksTableRowActions = ({ task }: TaskTableActionsProps) => {
  const deleteMutation = useMutation(deleteTaskMutationOptions);
  const editMutation = useMutation(editTaskMutationOptions);

  return (
    <details className="dsy-dropdown dsy-dropdown-end">
      <summary className="dsy-btn dsy-btn-ghost dsy-btn-sm">
        <MenuIcon />
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
                        params: { id: task.id },
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
                        params: { id: task.id },
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
        <div className="dsy-divider my-1" />
        <li>
          <button
            type="button"
            aria-label={`Delete ${task.name}`}
            onClick={() => deleteMutation.mutate(task.id)}
          >
            Delete
            <span className="dsy-badge dsy-badge-ghost">
              <TrashIcon className="h-4 w-4" />
            </span>
          </button>
        </li>
      </ul>
    </details>
  );
};
