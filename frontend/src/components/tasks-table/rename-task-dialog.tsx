import { useMutation } from "@tanstack/react-query";
import { SaveIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";

import { editTaskMutationOptions } from "@/api/edit-task";
import { TextInput } from "@/components/shared/text-input";
import { useRenameTaskForm } from "@/hooks/forms/rename-task";

interface RenameTaskDialogProps {
  name: string;
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RenameTaskDialog = ({
  name,
  taskId,
  open,
  onOpenChange,
}: RenameTaskDialogProps) => {
  const { mutate } = useMutation(editTaskMutationOptions);
  const form = useRenameTaskForm(name);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-sm absolute top-2 right-2"
                  aria-label="Close"
                >
                  <XIcon aria-hidden="true" className="h-4 w-4" />
                </button>
              </Dialog.Close>

              <Dialog.Title className="inline-flex items-center gap-2 font-bold text-lg">
                <SaveIcon aria-hidden="true" className="h-4 w-4" />
                Rename The Task
              </Dialog.Title>

              <Dialog.Description className="py-4 text-base-content/60 text-sm">
                Rename your task here. Click save when you're done.
              </Dialog.Description>

              <form
                onSubmit={form.handleSubmit((values) => {
                  mutate(
                    { params: { taskId }, body: values },
                    { onSuccess: () => onOpenChange(false) },
                  );
                })}
              >
                <TextInput control={form.control} name="name" label="Name" />
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-neutral dsy-btn-sm"
                  >
                    Save
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
