import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { ListPlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createGroupOptions } from "@/api/create-project";
import { EmojiPicker } from "@/components/emoji-picker";
import { TextInput } from "@/components/text-input";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
  icon: Type.Union([Type.String(), Type.Null()]),
});

export const CreateGroupForm = () => {
  const { mutate, isPending } = useMutation(createGroupOptions);
  const { handleSubmit, control, reset } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      icon: null,
    },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h1>Create New Project</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((body) => {
          mutate(body, {
            onSuccess: () => {
              reset();
              toast.success("Project has been created");
            },
          });
        })}
      >
        <div className="flex w-full items-end gap-2">
          <Controller
            control={control}
            name="icon"
            render={({ field: { onChange, value } }) => (
              <EmojiPicker value={value} onChange={onChange} />
            )}
          />
          <TextInput
            control={control}
            name="name"
            label="Name"
            className="w-full"
          />
        </div>
        <TextInput control={control} name="description" label="Description" />
        <div className="flex justify-end">
          <button
            type="submit"
            className="dsy-btn dsy-btn-accent"
            disabled={isPending}
          >
            Create New Project <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
