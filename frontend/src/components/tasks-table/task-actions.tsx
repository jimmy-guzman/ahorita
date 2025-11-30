import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EllipsisIcon, EyeIcon } from "lucide-react";
import { useRef } from "react";

import type { APIRoutes } from "@/api/client";
import { editTaskMutationOptions } from "@/api/edit-task";
import { queryMetadataOptions } from "@/api/query-metadata";

import { DeleteTaskAction } from "./delete-task-action";
import { RenameTaskAction } from "./rename-task-action";

interface TaskTableActionsProps {
  task: APIRoutes["tasks"]["get"]["response"]["200"][number];
}

export const TaskActions = ({ task }: TaskTableActionsProps) => {
  const { data } = useSuspenseQuery(queryMetadataOptions());
  const editMutation = useMutation(editTaskMutationOptions);
  const ref = useRef<HTMLDetailsElement>(null);

  const closeActions = () => {
    if (ref.current) {
      ref.current.open = false;
    }
  };

  return (
    <details className="dsy-dropdown dsy-dropdown-end" ref={ref}>
      <summary className="dsy-btn dsy-btn-ghost dsy-btn-sm">
        <EllipsisIcon />
        <span className="sr-only">Open menu</span>
      </summary>
      <ul
        aria-label={`${task.name} actions`}
        className="dsy-dropdown-content dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
      >
        <li className="dsy-menu-title">{task.name}</li>
        <li>
          <details>
            <summary>Status</summary>
            <ul>
              {data.statuses.map((status) => (
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
                    {status}
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
              {data.priorities.map((priority) => (
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
                    {priority}
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
              {data.labels.map((label) => (
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
          <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
            View
            <span className="dsy-badge dsy-badge-ghost">
              <EyeIcon className="h-4 w-4" />
            </span>
          </Link>
        </li>
        <li>
          <RenameTaskAction name={task.name} taskId={task.id} />
        </li>
        <li>
          <DeleteTaskAction
            name={task.name}
            taskId={task.id}
            closeActions={closeActions}
          />
        </li>
      </ul>
    </details>
  );
};
