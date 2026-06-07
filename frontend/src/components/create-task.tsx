import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ListPlusIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";

import { createTask } from "@/api/create-task";
import { queryMetadataOptions } from "@/api/query-metadata";
import { projectsQueryOptions } from "@/api/query-projects";
import { useCreateTaskForm } from "@/hooks/forms/create-task";

import { Select } from "./shared/select";
import { TextInput } from "./shared/text-input";

const routeApi = getRouteApi("/(authenticated)/tasks/");

export const CreateTask = () => {
  const { projectId } = routeApi.useSearch();
  const { data: metadata } = useSuspenseQuery(queryMetadataOptions());
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { handleSubmit, control, reset } = useCreateTaskForm(
    projectId ?? projects[0]?.id,
  );
  const { mutate, isPending } = useMutation(createTask);
  const [open, setOpen] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setMutationError(null);
    }
  };

  const addToTasks = handleSubmit((body) => {
    setMutationError(null);
    mutate(body, {
      onSuccess() {
        reset();
        setOpen(false);
      },
      onError(err) {
        setMutationError(
          "message" in err ? err.message : "Failed to create task",
        );
      },
    });
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-primary dsy-btn-sm">
          <span className="hidden sm:inline">Create Task</span>
          <ListPlusIcon className="h-4 w-4" />
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
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-sm absolute top-2 right-2"
                  aria-label="Close"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </Dialog.Close>
              <Dialog.Title className="font-bold text-lg">
                Create Task
              </Dialog.Title>
              {projects.length === 0 ? (
                <>
                  <Dialog.Description className="sr-only">
                    No projects available. Create a project to add tasks.
                  </Dialog.Description>
                  <div role="alert" className="dsy-alert dsy-alert-soft mt-4">
                    <span>
                      You need a project before creating a task.{" "}
                      <Link
                        to="/projects"
                        className="dsy-link dsy-link-primary"
                        onClick={() => handleOpenChange(false)}
                      >
                        Create a project
                      </Link>
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                      >
                        Close
                      </button>
                    </Dialog.Close>
                  </div>
                </>
              ) : (
                <>
                  <Dialog.Description className="py-4 text-base-content/60 text-sm">
                    This will create your task. Click save when you're done.
                  </Dialog.Description>
                  <form className="flex flex-col gap-4" onSubmit={addToTasks}>
                    <div className="flex flex-col gap-4">
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
                    {mutationError && (
                      <div
                        role="alert"
                        className="dsy-alert dsy-alert-error dsy-alert-soft"
                      >
                        <span>{mutationError}</span>
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                        onClick={() => handleOpenChange(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="dsy-btn dsy-btn-primary dsy-btn-sm"
                        disabled={isPending}
                      >
                        New Task <ListPlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
