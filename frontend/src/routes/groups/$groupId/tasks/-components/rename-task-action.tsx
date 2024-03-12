import { typeboxResolver } from "@hookform/resolvers/typebox";
import * as Dialog from "@radix-ui/react-dialog";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { editTaskMutationOptions } from "@/api/edit-task";
import { TextInput } from "@/components/text-input";
import { useState } from "react";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

interface RenameTaskDialogProps {
  name: string;
  id: string;
}

export const RenameTaskAction = ({ name, id }: RenameTaskDialogProps) => {
  const editMutation = useMutation(editTaskMutationOptions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    values: { name },
  });

  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger asChild>
        <button type="button" onClick={() => setIsDialogOpen(true)}>
          Rename
          <span className="dsy-badge dsy-badge-ghost">
            <PencilIcon className="h-4 w-4" />
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild onEscapeKeyDown={() => setIsDialogOpen(false)}>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
                  aria-label="Close"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <XIcon />
                </button>
              </Dialog.Close>
              <h3 className="font-bold text-lg">Rename The Task</h3>
              <form
                onSubmit={form.handleSubmit((values) => {
                  editMutation.mutate(
                    { params: { id }, body: values },
                    { onSuccess: () => setIsDialogOpen(false) },
                  );
                })}
              >
                <TextInput control={form.control} name="name" label="Name" />
                <div className="dsy-modal-action">
                  <div>
                    <button type="submit" className="dsy-btn dsy-btn-neutral">
                      Save <SaveIcon />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
