import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ListPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createTask } from "@/api/create-task";
import { queryMetadataOptions } from "@/api/query-metadata";
import { projectsQueryOptions } from "@/api/query-projects";
import { useCreateTaskForm } from "@/hooks/forms/create-task";

import { Select } from "./shared/select";
import { TextInput } from "./shared/text-input";

const routeApi = getRouteApi("/_auth/tasks/");

export const CreateTask = () => {
  const { projectId } = routeApi.useSearch();
  const { data: metadata } = useSuspenseQuery(queryMetadataOptions());
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { handleSubmit, control, reset } = useCreateTaskForm(
    projectId ?? projects[0]?.id,
  );
  const { mutate, isPending } = useMutation(createTask);
  const [open, setOpen] = useState(false);

  const addToTasks = handleSubmit((body) => {
    mutate(body, {
      onSuccess({ name, id }) {
        reset();

        toast.success(`Task ${name} has been created`, {
          action: (
            <Link
              to="/tasks/$taskId"
              params={{ taskId: id }}
              className="dsy-link"
            >
              View
            </Link>
          ),
        });
        setOpen(false);
      },
    });
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-neutral dsy-btn-sm">
          <span className="hidden sm:inline">Create Task</span>
          <ListPlusIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box overflow-visible">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              </Dialog.Close>
              <Dialog.Title className="font-bold text-lg">
                Create Task
              </Dialog.Title>
              <Dialog.Description className="py-4">
                This will create your task. Click save when you're done.
              </Dialog.Description>
              <form className="flex flex-col gap-4" onSubmit={addToTasks}>
                <div className="flex flex-col gap-2">
                  {projects.length > 0 && (
                    <Select
                      control={control}
                      name="projectId"
                      label="Project"
                      className="w-full"
                    >
                      {projects.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  )}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Select
                      control={control}
                      name="label"
                      label="Label"
                      className="w-full"
                    >
                      {metadata.labels.map((label) => (
                        <option key={label} value={label}>
                          {label}
                        </option>
                      ))}
                    </Select>
                    <Select
                      control={control}
                      name="priority"
                      label="Priority"
                      className="w-full"
                    >
                      {metadata.priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <TextInput control={control} name="name" label="Name" />
                </div>
                <div className="flex justify-end gap-2">
                  <Link to=".." className="dsy-btn dsy-btn-neutral">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-accent"
                    disabled={isPending}
                  >
                    New Task <ListPlusIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
