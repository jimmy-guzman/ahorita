import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  EllipsisIcon,
  EyeIcon,
  ListTodoIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { useState } from "react";

import type { APIRoutes } from "@/api/client";
import { editProjectOptions } from "@/api/edit-project";
import { queryMetadataOptions } from "@/api/query-metadata";

import { DeleteProject } from "../delete-project";
import { EditProject } from "../edit-project";

interface ProjectActionsProps {
  project: APIRoutes["projects"]["get"]["response"]["200"][number];
}

export const ProjectActions = ({ project }: ProjectActionsProps) => {
  const { data } = useSuspenseQuery(queryMetadataOptions());
  const editMutation = useMutation(editProjectOptions);

  const [editOpen, setEditOpen] = useState(false);
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
            <span className="sr-only">Open {project.name} menu</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="dsy-menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
          >
            <DropdownMenu.Label className="dsy-menu-title px-4 py-2">
              {project.name}
            </DropdownMenu.Label>

            <DropdownMenu.Item
              onSelect={() => {
                editMutation.mutate({
                  params: { projectId: project.id },
                  body: { isFavorite: !project.isFavorite },
                });
              }}
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              {project.isFavorite ? "Unfavorite" : "Favorite"}
              <StarIcon className="h-4 w-4" />
            </DropdownMenu.Item>

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
                  {data.projectStatuses.map((status) => (
                    <DropdownMenu.Item
                      key={status}
                      onSelect={() => {
                        editMutation.mutate({
                          params: { projectId: project.id },
                          body: { status },
                        });
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
                    >
                      {status}
                      {project.status === status && (
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
              <Link
                to="/projects/$projectId"
                params={{ projectId: project.id }}
              >
                View
                <EyeIcon className="h-4 w-4" />
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              asChild
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              <Link to="/tasks" search={{ projectId: project.id }}>
                View tasks
                <ListTodoIcon className="h-4 w-4" />
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setEditOpen(true)}
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm outline-none hover:bg-base-200 data-highlighted:bg-base-200"
            >
              Edit
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

      <EditProject
        projectId={project.id}
        open={editOpen}
        onOpenChange={setEditOpen}
        withTrigger={false}
      />

      <DeleteProject
        projectId={project.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        withTrigger={false}
      />
    </>
  );
};
