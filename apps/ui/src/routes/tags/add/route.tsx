import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { addTagMutationOptions } from "@/api/addTag";
import { TextInput } from "@/components/TextInput";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
});

const AddTagForm = () => {
  const { mutate, isPending } = useMutation(addTagMutationOptions);
  const { handleSubmit, control } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h1>Add Your New Tag</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((body) => {
          mutate(body, {
            onSuccess(tag) {
              return navigate({
                to: "/tags/$tagId",
                params: { tagId: tag.id },
              });
            },
          });
        })}
      >
        <TextInput control={control} name="name" label="Your tag's name?" />
        <TextInput
          control={control}
          name="description"
          label="Your tag's description?"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="dsy-btn dsy-btn-primary"
            disabled={isPending}
          >
            Add Tag <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/tags/add")({ component: AddTagForm });
