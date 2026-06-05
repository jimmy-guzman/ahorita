import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { FolderPenIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { editProjectOptions } from "@/api/edit-project";
import { projectQueryOptions } from "@/api/query-project";
import { TextInput } from "@/components/shared/text-input";
import { useEditProjectForm } from "@/hooks/forms/edit-project";
import { cn } from "@/utils/cn";

interface EditProjectProps {
  className?: string;
  hideText?: boolean;
  projectId: string;
}

export const EditProject = ({
  className = "dsy-btn dsy-btn-neutral dsy-btn-sm",
  hideText = false,
  projectId,
}: EditProjectProps) => {
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
  const { mutate } = useMutation(editProjectOptions);
  const [open, setOpen] = useState(false);

  const form = useEditProjectForm(project);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className={cn(className)}>
          <span className={cn(hideText ? "sr-only" : "hidden sm:inline")}>
            Edit{" "}
          </span>
          <FolderPenIcon className="h-4 w-4" />
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
                Edit Project
              </Dialog.Title>
              <Dialog.Description className="py-4 text-base-content/60 text-sm">
                Make changes to your project here. Click save when you're done.
              </Dialog.Description>
              <form
                onSubmit={form.handleSubmit((values) => {
                  mutate(
                    { params: { projectId }, body: values },
                    { onSuccess: () => setOpen(false) },
                  );
                })}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <TextInput
                      control={form.control}
                      name="name"
                      label="Name"
                      className="w-full"
                    />
                    <TextInput
                      control={form.control}
                      name="description"
                      label="Description"
                    />
                  </div>
                  <fieldset className="dsy-fieldset">
                    <legend className="dsy-fieldset-legend">
                      Project Options
                    </legend>
                    <div className="flex gap-4">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          className="dsy-toggle"
                          {...form.register("isFavorite")}
                        />
                        Favorite
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          className="dsy-toggle"
                          {...form.register("isDone")}
                        />
                        Done
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-neutral dsy-btn-sm"
                  >
                    Save <SaveIcon className="h-4 w-4" />
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
