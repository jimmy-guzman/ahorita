import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

import { deleteTaskMutationOptions } from "@/api/delete-task";
import { useState } from "react";

interface DeleteTaskActionProps {
  name: string;
  id: string;
}

export const DeleteTaskAction = ({ name, id }: DeleteTaskActionProps) => {
  const { mutate } = useMutation(deleteTaskMutationOptions);
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Delete ${name}`}
          onClick={() => setOpen(true)}
        >
          Delete
          <span className="dsy-badge dsy-badge-ghost">
            <TrashIcon className="h-4 w-4" />
          </span>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  mutate(id, { onSuccess: () => setOpen(false) });
                }}
              >
                <AlertDialog.Title>Are You Sure?</AlertDialog.Title>
                <div className="dsy-modal-action">
                  <button
                    type="button"
                    className="dsy-btn dsy-btn-neutral"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="dsy-btn dsy-btn-error">
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
