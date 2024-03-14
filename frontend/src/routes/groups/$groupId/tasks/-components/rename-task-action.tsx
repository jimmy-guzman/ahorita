import { typeboxResolver } from "@hookform/resolvers/typebox";
import * as Dialog from "@radix-ui/react-dialog";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { editTaskMutationOptions } from "@/api/edit-task";
import { TextInput } from "@/components/text-input";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

interface RenameTaskActionProps {
  name: string;
  id: string;
}

export const RenameTaskAction = ({ name, id }: RenameTaskActionProps) => {
  const { mutate } = useMutation(editTaskMutationOptions);
  const [open, setOpen] = useState(false);
  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    values: { name },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" onClick={() => setOpen(true)}>
          Rename
          <span className="dsy-badge dsy-badge-ghost">
            <PencilIcon className="h-4 w-4" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              </Dialog.Close>
              <Dialog.Title className="font-bold text-lg">
                Rename The Task
              </Dialog.Title>
              <form
                onSubmit={form.handleSubmit((values) => {
                  mutate(
                    { params: { id }, body: values },
                    { onSuccess: () => setOpen(false) },
                  );
                })}
              >
                <TextInput control={form.control} name="name" label="Name" />
                <div className="dsy-modal-action">
                  <button type="submit" className="dsy-btn dsy-btn-neutral">
                    Save <SaveIcon />
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
