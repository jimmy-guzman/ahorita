import { ErrorMessage } from "@hookform/error-message";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { addMonths, formatISO9075 } from "date-fns";
import { ListPlusIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addTaskByGroupIdMutationOptions } from "@/api/add-task";
import { Select } from "@/components/select";
import { TextInput } from "@/components/text-input";
import { priorities } from "@/constants/tasks";

const routeApi = getRouteApi("/groups/$groupId");

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  priority: Type.Union([
    Type.Literal("LOW"),
    Type.Literal("MEDIUM"),
    Type.Literal("HIGH"),
  ]),
  dueAt: Type.String(),
});

export const AddTask = () => {
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
      dueAt: addMonths(new Date(), 1).toISOString(),
    },
  });
  const { mutate, isPending } = useMutation(addTaskByGroupIdMutationOptions);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="dsy-btn dsy-btn-secondary dsy-btn-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        Add Task <ListPlusIcon />
      </button>
      <dialog className="dsy-modal" ref={dialogRef}>
        <div className="dsy-modal-box">
          <div className="flex w-full flex-col gap-8">
            <div className="prose dsy-prose">
              <h2>Add Your New Task</h2>
            </div>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit((body) => {
                mutate(
                  {
                    body,
                    params: { id: groupId },
                  },
                  {
                    onSuccess() {
                      reset();
                      dialogRef.current?.close();
                      toast.success("Task has been added");
                    },
                  },
                );
              })}
            >
              <TextInput
                control={control}
                name="name"
                label="Your task's name?"
              />
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
                <label className="dsy-label" htmlFor={"dueAt"}>
                  <span className="dsy-label-text">When is your task due?</span>
                </label>
                <input
                  type="date"
                  placeholder="When is your task due?"
                  className="dsy-input dsy-input-bordered w-full"
                  id="name"
                  min={formatISO9075(new Date(), { representation: "date" })}
                  {...register("dueAt", {
                    setValueAs: (value) => new Date(value).toISOString(),
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="dueAt"
                  render={({ message }) => (
                    <p className="text-error text-sm">{message}</p>
                  )}
                />
              </div>
              <div className="dsy-modal-action gap-2">
                <button
                  type="button"
                  className="dsy-btn"
                  onClick={() => dialogRef.current?.close()}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="dsy-btn dsy-btn-primary"
                  disabled={isPending}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
