import { ErrorMessage } from "@hookform/error-message";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { addMonths, formatISO9075 } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createTaskByGroupIdOptions } from "@/api/create-task";
import { Select } from "@/components/select";
import { TextInput } from "@/components/text-input";
import { priorities } from "@/constants/tasks";
import { ListPlusIcon } from "lucide-react";

const routeApi = getRouteApi("/groups/$groupId/tasks");

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  priority: Type.Union([
    Type.Literal("LOW"),
    Type.Literal("MEDIUM"),
    Type.Literal("HIGH"),
  ]),
  dueAt: Type.String(),
});

export const CreateTaskForm = () => {
  const { groupId } = routeApi.useParams();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: "",
      priority: "MEDIUM",
      dueAt: formatISO9075(addMonths(new Date(), 1), {
        representation: "date",
      }),
    },
  });
  const { mutate, isPending } = useMutation(createTaskByGroupIdOptions);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="prose dsy-prose">
        <h2>Create New Task</h2>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((body) => {
          mutate(
            {
              body,
              params: { id: groupId },
            },
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
          <TextInput control={control} name="name" label="Your task's name?" />
          <Select
            control={control}
            name="priority"
            label="Your task's priority?"
          >
            {priorities.map(({ label, priority }) => (
              <option key={priority} value={priority}>
                {label}
              </option>
            ))}
          </Select>
          <div className="dsy-form-control">
            <label className="dsy-label" htmlFor="dueAt">
              <span className="dsy-label-text">When is your task due?</span>
            </label>
            <input
              type="date"
              placeholder="When is your task due?"
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
          <Link
            from="/groups/$groupId/tasks/new"
            to="../"
            className="dsy-btn dsy-btn-neutral"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="dsy-btn dsy-btn-accent"
            disabled={isPending}
          >
            Create New Task <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
