import { useMutation } from "@tanstack/react-query";
import { FolderPlusIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";

import { createProjectOptions } from "@/api/create-project";
import { TextInput } from "@/components/shared/text-input";
import { useCreateProjectForm } from "@/hooks/forms/create-project";

export const CreateProject = () => {
  const { mutate, isPending } = useMutation(createProjectOptions);
  const { handleSubmit, control, reset } = useCreateProjectForm();
  const [open, setOpen] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setMutationError(null);
    }
  };

  const addToProjects = handleSubmit((body) => {
    setMutationError(null);
    mutate(body, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError(err) {
        setMutationError(
          "message" in err ? err.message : "Failed to create project",
        );
      },
    });
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-primary dsy-btn-sm">
          <span className="hidden sm:inline">Create Project</span>
          <FolderPlusIcon className="h-4 w-4" />
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
                Create Project
              </Dialog.Title>
              <Dialog.Description className="py-4 text-base-content/60 text-sm">
                This will create your project. Click save when you're done.
              </Dialog.Description>
              <form className="flex flex-col gap-4" onSubmit={addToProjects}>
                <TextInput control={control} name="name" label="Name" />
                <TextInput
                  control={control}
                  name="description"
                  label="Description"
                />
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
                    Create Project <FolderPlusIcon className="h-4 w-4" />
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
