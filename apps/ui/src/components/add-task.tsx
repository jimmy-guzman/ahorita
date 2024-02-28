import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { addTaskByTagIdMutationOptions } from "@/api/add-task";
import { TextInput } from "@/components/text-input";
import { useRef } from "react";

const routeApi = getRouteApi("/tags/$tagId");

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export const AddTask = () => {
  const { tagId } = routeApi.useParams();
  const { handleSubmit, control, reset } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: { name: "" },
  });
  const { mutate, isPending } = useMutation(addTaskByTagIdMutationOptions);
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
                  { body, params: { id: tagId } },
                  {
                    onSuccess() {
                      reset();
                      dialogRef.current?.close();
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
