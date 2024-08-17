import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type InferOutput,
  literal,
  minLength,
  object,
  pipe,
  string,
  union,
} from "valibot";

import { createTask } from "@/api/create-task";
import { Select } from "@/components/select";
import { TextInput } from "@/components/text-input";
import { labels, priorities } from "@/constants/tasks";

const routeApi = getRouteApi("/_auth/projects/$projectId/tasks/new");

const schema = object({
  name: pipe(string(), minLength(1, "Your name is too short.")),
  priority: union([literal("Low"), literal("Medium"), literal("High")]),
  label: union([literal("Feature"), literal("Documentation"), literal("Bug")]),
});

export const CreateTaskForm = () => {
  const { projectId } = routeApi.useParams();
  const { handleSubmit, control, reset } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      priority: "Medium",
      label: "Feature",
    },
  });
  const { mutate, isPending } = useMutation(createTask);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="prose dsy-prose">
        <h2>Create New Task</h2>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((body) => {
          mutate(
            { ...body, projectId },
            {
              onSuccess({ name }) {
                reset();
                toast.success(`Task ${name} has been created`, {
                  action: (
                    <Link
                      to="/projects/$projectId/tasks"
                      params={{ projectId }}
                      className="dsy-link"
                    >
                      View Tasks
                    </Link>
                  ),
                });
              },
            },
          );
        })}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select control={control} name="label" label="Label">
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
            <Select control={control} name="priority" label="Priority">
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </Select>
            <TextInput
              control={control}
              name="name"
              label="Name"
              className="grow"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link to=".." className="dsy-btn dsy-btn-neutral">
            Cancel
          </Link>
          <button
            type="submit"
            className="dsy-btn dsy-btn-accent"
            disabled={isPending}
          >
            New Task <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
