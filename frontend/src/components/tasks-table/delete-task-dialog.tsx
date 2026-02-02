import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { useMutation } from "@tanstack/react-query";
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
        <AlertDialog.Backdrop className="dsy-modal-backdrop" />
        <AlertDialog.Popup
          className={`dsy-modal ${open ? "dsy-modal-open" : ""}`}
        >
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
              <AlertDialog.Title className="dsy-modal-title">
                Are You Sure?
              </AlertDialog.Title>
              <AlertDialog.Description className="py-4">
                This action cannot be undone. This will permanently delete your
                task.
              </AlertDialog.Description>
              <div className="dsy-modal-action">
                <AlertDialog.Close className="dsy-btn">
                  Cancel
                </AlertDialog.Close>
                <button type="submit" className="dsy-btn dsy-btn-error">
                  Yes, delete task
                </button>
              </div>
            </form>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
