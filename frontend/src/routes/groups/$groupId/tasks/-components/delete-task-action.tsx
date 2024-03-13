import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

import { deleteTaskMutationOptions } from "@/api/delete-task";

import { Dialog } from "@/components/dialog";
import { useDialog } from "@/hooks/use-dialog";

interface DeleteTaskActionProps {
  name: string;
  id: string;
}

export const DeleteTaskAction = ({ name, id }: DeleteTaskActionProps) => {
  const { mutateAsync } = useMutation(deleteTaskMutationOptions);
  const { ref, show, close } = useDialog();

  return (
    <>
      <button
        type="button"
        aria-label={`Delete ${name}`}
        onClick={() => show()}
      >
        Delete
        <span className="dsy-badge dsy-badge-ghost">
          <TrashIcon className="h-4 w-4" />
        </span>
      </button>
      <Dialog ref={ref}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            await mutateAsync(id);
            close();
          }}
        >
          <h3>Are You Sure?</h3>
          <div className="dsy-modal-action">
            <button
              type="button"
              className="dsy-btn dsy-btn-outline"
              onClick={() => close()}
            >
              No
            </button>
            <button type="submit" className="dsy-btn dsy-btn-neutral">
              Yes
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
