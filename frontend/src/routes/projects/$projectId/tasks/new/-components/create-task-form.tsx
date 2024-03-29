import { ErrorMessage } from "@hookform/error-message";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { addMonths, formatISO9075 } from "date-fns";
import { ListPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type Output,
  literal,
  minLength,
  object,
  string,
  union,
} from "valibot";

import { createTask } from "@/api/create-task";
import { Select } from "@/components/select";
import { TextInput } from "@/components/text-input";
import { labels, priorities } from "@/constants/tasks";

const routeApi = getRouteApi("/projects/$projectId/tasks/new");

const schema = object({
  name: string([minLength(1, "Your name is too short.")]),
  priority: union([literal("Low"), literal("Medium"), literal("High")]),
  label: union([literal("Feature"), literal("Documentation"), literal("Bug")]),
  dueAt: string(),
});

export const CreateTaskForm = () => {
  const { projectId } = routeApi.useParams();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      priority: "Medium",
      label: "Feature",
      dueAt: formatISO9075(addMonths(new Date(), 1), {
        representation: "date",
      }),
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
              onSuccess() {
                reset();
                toast.success("Task has been created");
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
          <div className="dsy-form-control">
            <label className="dsy-label" htmlFor="dueAt">
              <span className="dsy-label-text">Due Date</span>
            </label>
            <input
              type="date"
              className="dsy-input dsy-input-bordered w-full"
              id="name"
              min={formatISO9075(new Date(), { representation: "date" })}
              {...register("dueAt")}
            />
            <ErrorMessage
              errors={errors}
              name="dueAt"
              render={({ message }) => (
                <p className="text-error text-sm">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link from={routeApi.id} to="../" className="dsy-btn dsy-btn-neutral">
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
