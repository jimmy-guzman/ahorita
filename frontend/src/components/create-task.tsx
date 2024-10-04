import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";
import { toast } from "sonner";

import { createTask } from "@/api/create-task";
import { queryMetadataOptions } from "@/api/query-metadata";
import { useCreateTaskForm } from "@/hooks/forms/create-task";

import { Select } from "./shared/select";
import { TextInput } from "./shared/text-input";

const routeApi = getRouteApi("/_auth/projects/$projectId/tasks/new");

export const CreateTask = () => {
  const { projectId } = routeApi.useParams();
  const { data } = useSuspenseQuery(queryMetadataOptions());
  const { handleSubmit, control, reset } = useCreateTaskForm();
  const { mutate, isPending } = useMutation(createTask);

  const addToTasks = handleSubmit((body) => {
    mutate(
      { ...body, projectId },
      {
        onSuccess({ name, id }) {
          reset();

          toast.success(`Task ${name} has been created`, {
            action: (
              <Link
                to="/projects/$projectId/tasks/$taskId"
                params={{ projectId, taskId: id }}
                className="dsy-link"
              >
                View
              </Link>
            ),
          });
        },
      },
    );
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="prose dsy-prose">
        <h2>Create New Task</h2>
      </div>
      <form className="flex flex-col gap-4" onSubmit={addToTasks}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select control={control} name="label" label="Label">
              {data.labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
            <Select control={control} name="priority" label="Priority">
              {data.priorities.map((priority) => (
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
