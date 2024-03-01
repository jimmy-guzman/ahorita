import { useMutation } from "@tanstack/react-query";
import type { CellContext } from "@tanstack/react-table";
import { BanIcon, PencilIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

import { editTaskMutationOptions } from "@/api/edit-task";

import { useTasksFormContext } from "../-hooks/use-tasks-form";

export const TasksTableNameCell = ({
  info,
}: {
  info: CellContext<
    {
      id: string;
      tagId: string;
      name: string;
      status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
      priority: "LOW" | "MEDIUM" | "HIGH";
      createdAt: string;
      updatedAt: string;
      dueAt: string;
      userId: string;
    },
    string
  >;
}) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const { getValues, register } = useTasksFormContext();
  const editMutation = useMutation(editTaskMutationOptions);

  return isEditEnabled ? (
    <div className="dsy-join">
      <input
        type="text"
        placeholder="Type here"
        className="dsy-join-item dsy-input dsy-input-bordered dsy-input-sm w-full max-w-xs"
        {...register(`tasks.${info.row.index}.name`)}
      />
      <button
        type="button"
        className="dsy-join-item dsy-btn dsy-btn-sm dsy-btn-neutral"
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <BanIcon />
      </button>
      <button
        type="button"
        className="dsy-join-item dsy-btn dsy-btn-sm dsy-btn-secondary"
        onClick={() => {
          editMutation.mutate({
            params: {
              id: info.row.original.id,
            },
            body: { name: getValues(`tasks.${info.row.index}.name`) },
          });
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <SaveIcon />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      {info.getValue()}
      <button
        type="button"
        className="dsy-btn dsy-btn-neutral dsy-btn-xs"
        aria-label={`edit ${info.getValue()}`}
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <PencilIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
