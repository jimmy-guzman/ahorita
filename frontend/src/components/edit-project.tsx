import { valibotResolver } from "@hookform/resolvers/valibot";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FolderPenIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Output, boolean, minLength, object, string } from "valibot";

import { editProjectOptions } from "@/api/edit-project";
import { projectQueryOptions } from "@/api/query-project";
import { TextInput } from "@/components/text-input";

const routeApi = getRouteApi("/projects/$projectId");

const schema = object({
  name: string([minLength(1, "Your username is too short.")]),
  description: string([minLength(1, "Your description is too short.")]),
  isFavorite: boolean(),
  isDone: boolean(),
});

export const EditProject = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
  const { mutate } = useMutation(editProjectOptions);
  const [open, setOpen] = useState(false);

  const form = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
    values: {
      description: project.description,
      name: project.name,
      isFavorite: project.isFavorite,
      isDone: project.isDone,
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="dsy-btn dsy-btn-secondary">
          <span className="hidden sm:inline">Edit </span>
          <FolderPenIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box overflow-visible">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              </Dialog.Close>
              <Dialog.Title className="font-bold text-lg">
                Edit Project
              </Dialog.Title>
              <form
                onSubmit={form.handleSubmit((values) => {
                  mutate(
                    { params: { projectId }, body: values },
                    { onSuccess: () => setOpen(false) },
                  );
                })}
              >
                <div className="flex w-full items-end gap-2">
                  <TextInput
                    control={form.control}
                    name="name"
                    label="Name"
                    className="w-full"
                  />
                </div>
                <TextInput
                  control={form.control}
                  name="description"
                  label="Description"
                />
                <div className="dsy-form-control">
                  <label className="dsy-label cursor-pointer">
                    <span className="dsy-label-text">Favorite?</span>
                    <input
                      type="checkbox"
                      className="dsy-toggle"
                      {...form.register("isFavorite")}
                    />
                  </label>
                </div>
                <div className="dsy-form-control">
                  <label className="dsy-label cursor-pointer">
                    <span className="dsy-label-text">Done?</span>
                    <input
                      type="checkbox"
                      className="dsy-toggle"
                      {...form.register("isDone")}
                    />
                  </label>
                </div>
                <div className="dsy-modal-action">
                  <button type="submit" className="dsy-btn dsy-btn-neutral">
                    Save <SaveIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
