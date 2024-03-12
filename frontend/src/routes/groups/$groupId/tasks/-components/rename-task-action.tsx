import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { editTaskMutationOptions } from "@/api/edit-task";
import { Dialog } from "@/components/dialog";
import { TextInput } from "@/components/text-input";
import { useDialog } from "@/hooks/use-dialog";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

interface RenameTaskActionProps {
  name: string;
  id: string;
}

export const RenameTaskAction = ({ name, id }: RenameTaskActionProps) => {
  const editMutation = useMutation(editTaskMutationOptions);
  const { ref, show, close } = useDialog();
  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    values: { name },
  });

  return (
    <>
      <button type="button" onClick={() => show()}>
        Rename
        <span className="dsy-badge dsy-badge-ghost">
          <PencilIcon className="h-4 w-4" />
        </span>
      </button>
      <Dialog ref={ref}>
        <h3 className="font-bold text-lg">Rename The Task</h3>
        <form
          onSubmit={form.handleSubmit((values) => {
            editMutation.mutate(
              { params: { id }, body: values },
              { onSuccess: () => close() },
            );
          })}
        >
          <TextInput control={form.control} name="name" label="Name" />
          <div className="dsy-modal-action">
            <button
              type="button"
              className="dsy-btn dsy-btn-outline"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button type="submit" className="dsy-btn dsy-btn-neutral">
              Save <SaveIcon />
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
