import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

import { editTaskMutationOptions } from "@/api/edit-task";
import { TextInput } from "@/components/text-input";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

interface RenameTaskDialogProps {
  name: string;
  id: string;
}

export const RenameTaskAction = ({ name, id }: RenameTaskDialogProps) => {
  const editMutation = useMutation(editTaskMutationOptions);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    values: { name },
  });

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        Rename
        <span className="dsy-badge dsy-badge-ghost">
          <PencilIcon className="h-4 w-4" />
        </span>
      </button>
      {createPortal(
        <dialog className="dsy-modal" ref={dialogRef}>
          <div className="dsy-modal-box">
            <form method="dialog">
              <button
                type="submit"
                className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </form>

            <h3 className="font-bold text-lg">Rename The Task</h3>
            <form
              onSubmit={form.handleSubmit((values) => {
                editMutation.mutate(
                  { params: { id }, body: values },
                  { onSuccess: () => dialogRef.current?.close() },
                );
              })}
            >
              <TextInput control={form.control} name="name" label="Name" />
              <div className="dsy-modal-action">
                <button
                  type="button"
                  className="dsy-btn dsy-btn-outline"
                  onClick={() => dialogRef.current?.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="dsy-btn dsy-btn-neutral">
                  Save <SaveIcon />
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="dsy-modal-backdrop">
            <button type="submit">close</button>
          </form>
        </dialog>,
        document.body,
      )}
    </>
  );
};
