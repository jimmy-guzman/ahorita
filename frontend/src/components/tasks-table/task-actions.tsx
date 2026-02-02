import { Menu } from "@base-ui-components/react/menu";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import type { APIRoutes } from "@/api/client";
import { editTaskMutationOptions } from "@/api/edit-task";
import { queryMetadataOptions } from "@/api/query-metadata";

import { DeleteTaskDialog } from "./delete-task-dialog";
import { RenameTaskDialog } from "./rename-task-dialog";

interface TaskTableActionsProps {
  task: APIRoutes["tasks"]["get"]["response"]["200"][number];
}

export const TaskActions = ({ task }: TaskTableActionsProps) => {
  const { data } = useSuspenseQuery(queryMetadataOptions());
  const editMutation = useMutation(editTaskMutationOptions);

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Menu.Root>
        <Menu.Trigger className="dsy-btn dsy-btn-ghost dsy-btn-sm">
          <EllipsisIcon />
          <span className="sr-only">Open {task.name} menu</span>
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="end">
            <Menu.Popup className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
              <div className="dsy-menu-title px-4 py-2">{task.name}</div>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                  Status
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4} sideOffset={-4}>
                    <Menu.Popup className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                      {data.statuses.map((status) => (
                        <Menu.Item
                          key={status}
                          onClick={() => {
                            editMutation.mutate({
                              params: { taskId: task.id },
                              body: { status },
                            });
                          }}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
                        >
                          {status}
                          {task.status === status && (
                            <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                  Priority
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4} sideOffset={-4}>
                    <Menu.Popup className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                      {data.priorities.map((priority) => (
                        <Menu.Item
                          key={priority}
                          onClick={() => {
                            editMutation.mutate({
                              params: { taskId: task.id },
                              body: { priority },
                            });
                          }}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
                        >
                          {priority}
                          {task.priority === priority && (
                            <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                  Label
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4} sideOffset={-4}>
                    <Menu.Popup className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                      {data.labels.map((label) => (
                        <Menu.Item
                          key={label}
                          onClick={() => {
                            editMutation.mutate({
                              params: { taskId: task.id },
                              body: { label },
                            });
                          }}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
                        >
                          {label}
                          {task.label === label && (
                            <span className="dsy-badge dsy-badge-xs dsy-badge-info" />
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className="dsy-divider my-1" />

              <Menu.Item
                render={
                  <Link to="/tasks/$taskId" params={{ taskId: task.id }} />
                }
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
              >
                View
                <span className="dsy-badge dsy-badge-ghost">
                  <EyeIcon className="h-4 w-4" />
                </span>
              </Menu.Item>

              <Menu.Item
                onClick={() => setRenameOpen(true)}
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
              >
                Rename
                <span className="dsy-badge dsy-badge-ghost">
                  <PencilIcon className="h-4 w-4" />
                </span>
              </Menu.Item>

              <Menu.Item
                onClick={() => setDeleteOpen(true)}
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
              >
                Delete
                <span className="dsy-badge dsy-badge-ghost">
                  <TrashIcon className="h-4 w-4" />
                </span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <RenameTaskDialog
        name={task.name}
        taskId={task.id}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />

      <DeleteTaskDialog
        taskId={task.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};
