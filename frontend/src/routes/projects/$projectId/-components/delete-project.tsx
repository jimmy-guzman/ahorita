import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

import { deleteProjectOptions } from "@/api/delete-project";

const routeApi = getRouteApi("/projects/$projectId");

export const DeleteProject = () => {
  const { projectId } = routeApi.useParams();
  const { mutate } = useMutation(deleteProjectOptions);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className="dsy-btn dsy-btn-neutral dsy-btn-sm"
          onClick={() => setOpen(true)}
        >
          Delete Project <Trash2Icon />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  mutate(projectId, {
                    onSuccess: async () => {
                      setOpen(false);

                      await navigate({ to: "/projects/new" });
                    },
                  });
                }}
              >
                <AlertDialog.Title>Are You Sure?</AlertDialog.Title>
                <div className="dsy-modal-action">
                  <button
                    type="button"
                    className="dsy-btn dsy-btn-neutral"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="dsy-btn dsy-btn-error">
                    Yes, delete project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};