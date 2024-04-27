import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { FolderPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type Output, minLength, object, string } from "valibot";

import { createProjectOptions } from "@/api/create-project";
import { TextInput } from "@/components/text-input";
import { Link } from "@tanstack/react-router";

const schema = object({
  name: string([minLength(1, "Your name is too short.")]),
  description: string([minLength(1, "Your description is too short.")]),
});

export const CreateProjectForm = () => {
  const { mutate, isPending } = useMutation(createProjectOptions);
  const { handleSubmit, control, reset } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      description: "",
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
            onSuccess: ({ name, id }) => {
              reset();
              toast.success(`Project ${name} has been created`, {
                action: (
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: id }}
                    className="dsy-link"
                  >
                    View Project
                  </Link>
                ),
              });
            },
          });
        })}
      >
        <div className="flex w-full items-end gap-2">
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
