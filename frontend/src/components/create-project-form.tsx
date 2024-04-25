import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { FolderPlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type Output, minLength, nullable, object, string } from "valibot";

import { createProjectOptions } from "@/api/create-project";
import { EmojiPicker } from "@/components/emoji-picker";
import { TextInput } from "@/components/text-input";

const schema = object({
  name: string([minLength(1, "Your name is too short.")]),
  description: string([minLength(1, "Your description is too short.")]),
  icon: nullable(string()),
});

export const CreateProjectForm = () => {
  const { mutate, isPending } = useMutation(createProjectOptions);
  const { handleSubmit, control, reset } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
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
            New Project <FolderPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
