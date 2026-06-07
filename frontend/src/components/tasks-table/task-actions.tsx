import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { DropdownMenu } from "radix-ui";
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm"
          >
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open {task.name} menu</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
          >
            <DropdownMenu.Label className="dsy-menu-title px-4 py-2">
              {task.name}
            </DropdownMenu.Label>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                Status
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  alignOffset={-4}
                  sideOffset={-4}
                  className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
                >
                  {data.statuses.map((status) => (
                    <DropdownMenu.Item
                      key={status}
                      onSelect={() => {
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
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                Priority
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  alignOffset={-4}
                  sideOffset={-4}
                  className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
                >
                  {data.priorities.map((priority) => (
                    <DropdownMenu.Item
                      key={priority}
                      onSelect={() => {
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
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200">
                Label
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  alignOffset={-4}
                  sideOffset={-4}
                  className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
                >
                  {data.labels.map((label) => (
                    <DropdownMenu.Item
                      key={label}
                      onSelect={() => {
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
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className="dsy-divider my-1" />

            <DropdownMenu.Item
              asChild
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
                View
                <EyeIcon className="h-4 w-4" />
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setRenameOpen(true)}
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              Rename
              <PencilIcon className="h-4 w-4" />
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setDeleteOpen(true)}
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-error text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              Delete
              <TrashIcon className="h-4 w-4" />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

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
