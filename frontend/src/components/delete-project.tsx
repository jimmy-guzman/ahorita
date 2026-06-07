import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FolderMinusIcon } from "lucide-react";
import { AlertDialog } from "radix-ui";
import { useState } from "react";

import { deleteProjectOptions } from "@/api/delete-project";
import { cn } from "@/utils/cn";

interface DeleteProjectProps {
  className?: string;
  hideText?: boolean;
  projectId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  withTrigger?: boolean;
}

export const DeleteProject = ({
  className = "dsy-btn dsy-btn-error dsy-btn-sm",
  projectId,
  hideText = false,
  open: controlledOpen,
  onOpenChange,
  withTrigger = true,
}: DeleteProjectProps) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(deleteProjectOptions);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      {withTrigger && (
        <AlertDialog.Trigger asChild>
          <button
            type="button"
            className={cn(className)}
            onClick={() => setOpen(true)}
          >
            <span className={cn(hideText ? "sr-only" : "hidden sm:inline")}>
              Delete{" "}
            </span>
            <FolderMinusIcon className="h-4 w-4" />
          </button>
        </AlertDialog.Trigger>
      )}
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

                      await navigate({ to: "/projects" });
                    },
                  });
                }}
              >
                <AlertDialog.Title className="font-bold text-lg">
                  Are You Sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="py-4 text-base-content/60 text-sm">
                  This action cannot be undone. This will permanently delete
                  your project.
                </AlertDialog.Description>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="dsy-btn dsy-btn-ghost dsy-btn-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="dsy-btn dsy-btn-error dsy-btn-sm"
                  >
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
