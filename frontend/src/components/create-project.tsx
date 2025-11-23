import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FolderPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createProjectOptions } from "@/api/create-project";
import { TextInput } from "@/components/shared/text-input";
import { useCreateProjectForm } from "@/hooks/forms/create-project";

export const CreateProject = () => {
  const { mutate, isPending } = useMutation(createProjectOptions);
  const { handleSubmit, control, reset } = useCreateProjectForm();
  const [open, setOpen] = useState(false);

  const addToProjects = handleSubmit((body) => {
    mutate(body, {
      onSuccess: ({ name, id }) => {
        reset();
        setOpen(false);
        toast.success(`Project ${name} has been created`, {
          action: (
            <Link
              to="/projects/$projectId"
              params={{ projectId: id }}
              className="dsy-link"
            >
              View Project
            </Link>
          ),
        });
      },
    });
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-neutral dsy-btn-sm">
          <span className="hidden sm:inline">Create Project</span>
          <FolderPlusIcon />
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
                Create Project
              </Dialog.Title>
              <Dialog.Description className="py-4">
                This will create your project. Click save when you're done.
              </Dialog.Description>
              <form className="flex flex-col gap-4" onSubmit={addToProjects}>
                <TextInput control={control} name="name" label="Name" />
                <TextInput
                  control={control}
                  name="description"
                  label="Description"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-accent dsy-btn-sm"
                    disabled={isPending}
                  >
                    Create Project <FolderPlusIcon />
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
