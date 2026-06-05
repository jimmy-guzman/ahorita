import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ListPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { createTask } from "@/api/create-task";
import { queryMetadataOptions } from "@/api/query-metadata";
import { useAddTaskToProjectForm } from "@/hooks/forms/add-task-to-project";
import { Select } from "./shared/select";
import { TextInput } from "./shared/text-input";

export const AddTaskToProject = ({ projectId }: { projectId: string }) => {
  const { data: metadata } = useSuspenseQuery(queryMetadataOptions());
  const { handleSubmit, control, reset } = useAddTaskToProjectForm();
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
    mutate(
      { ...body, projectId },
      {
        onSuccess() {
          reset();
          setOpen(false);
        },
        onError(err) {
          setMutationError(
            "message" in err ? err.message : "Failed to add task",
          );
        },
      },
    );
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-primary dsy-btn-sm">
          <span className="hidden sm:inline">Add Task</span>
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
                Add Task
              </Dialog.Title>
              <Dialog.Description className="py-4 text-base-content/60 text-sm">
                This will add your task to your project.
              </Dialog.Description>
              <form className="flex flex-col gap-4" onSubmit={addToTasks}>
                <div className="flex flex-col gap-4">
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
                    Add Task <ListPlusIcon className="h-4 w-4" />
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
