import { useMutation } from "@tanstack/react-query";
import { AlertDialog } from "radix-ui";

import { deleteTaskMutationOptions } from "@/api/delete-task";

interface DeleteTaskDialogProps {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteTaskDialog = ({
  taskId,
  open,
  onOpenChange,
}: DeleteTaskDialogProps) => {
  const { mutate } = useMutation(deleteTaskMutationOptions);

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  mutate(taskId, {
                    onSuccess: () => {
                      onOpenChange(false);
                    },
                  });
                }}
              >
                <AlertDialog.Title className="font-bold text-lg">
                  Are You Sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="py-4 text-base-content/60 text-sm">
                  This action cannot be undone. This will permanently delete
                  your task.
                </AlertDialog.Description>
                <div className="flex justify-end gap-2">
                  <AlertDialog.Cancel asChild>
                    <button
                      type="button"
                      className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                    >
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-error dsy-btn-sm"
                  >
                    Yes, delete task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
