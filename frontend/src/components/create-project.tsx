import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FolderPlusIcon } from "lucide-react";
import { toast } from "sonner";

import { createProjectOptions } from "@/api/create-project";
import { TextInput } from "@/components/shared/text-input";
import { useCreateProjectForm } from "@/hooks/forms/create-project";

export const CreateProject = () => {
  const { mutate, isPending } = useMutation(createProjectOptions);
  const { handleSubmit, control, reset } = useCreateProjectForm();

  const addToProjects = handleSubmit((body) => {
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
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h1>Create New Project</h1>
      </div>
      <form className="flex flex-col gap-2" onSubmit={addToProjects}>
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
