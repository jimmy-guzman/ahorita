import { Dialog } from "@base-ui-components/react/dialog";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon, XIcon } from "lucide-react";
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
        <Dialog.Backdrop className="dsy-modal-backdrop" />
        <Dialog.Popup className={`dsy-modal ${open ? "dsy-modal-open" : ""}`}>
          <div className="dsy-modal-box">
            <Dialog.Close className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2">
              <XIcon className="h-4 w-4" />
            </Dialog.Close>

            <Dialog.Title className="dsy-modal-title">
              Rename The Task
            </Dialog.Title>

            <Dialog.Description className="py-4">
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
              <div className="dsy-modal-action">
                <button type="submit" className="dsy-btn dsy-btn-primary">
                  <SaveIcon className="h-4 w-4" />
                  Save
                </button>
              </div>
            </form>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
