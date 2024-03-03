import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addGroupMutationOptions } from "@/api/add-group";
import { TextInput } from "@/components/text-input";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
});

const AddGroupForm = () => {
  const { mutate, isPending } = useMutation(addGroupMutationOptions);
  const { handleSubmit, control, reset } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h1>Add Your New Group</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((body) => {
          mutate(body, {
            onSuccess: () => {
              reset();
              toast.success("Group has been added");
            },
          });
        })}
      >
        <TextInput control={control} name="name" label="Your group's name?" />
        <TextInput
          control={control}
          name="description"
          label="Your group's description?"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="dsy-btn dsy-btn-primary"
            disabled={isPending}
          >
            Add Group <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/groups/add")({
  component: AddGroupForm,
});