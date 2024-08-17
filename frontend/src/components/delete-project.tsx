import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FolderMinusIcon } from "lucide-react";
import { useState } from "react";

import { deleteProjectOptions } from "@/api/delete-project";

const routeApi = getRouteApi("/_auth/projects/$projectId");

export const DeleteProject = () => {
  const { projectId } = routeApi.useParams();
  const navigate = routeApi.useNavigate();
  const { mutate } = useMutation(deleteProjectOptions);
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className="dsy-btn dsy-btn-neutral"
          onClick={() => setOpen(true)}
        >
          <span className="hidden sm:inline">Delete </span>
          <FolderMinusIcon />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content asChild>
          <div className="dsy-modal dsy-modal-open">
            <div className="dsy-modal-box">
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  mutate(projectId, {
                    onSuccess: async () => {
                      setOpen(false);

                      await navigate({ to: "/projects/new" });
                    },
                  });
                }}
              >
                <AlertDialog.Title className="font-bold text-lg">
                  Are You Sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="py-4">
                  This action cannot be undone. This will permanently delete
                  your project.
                </AlertDialog.Description>
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
