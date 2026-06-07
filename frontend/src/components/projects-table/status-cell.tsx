import { CheckCircle2Icon, CircleIcon } from "lucide-react";

import { ICON_CLASS } from "@/utils/cell-classes";

export const ProjectStatusCell = ({ isDone }: { isDone: boolean }) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      {isDone ? (
        <CheckCircle2Icon className={`${ICON_CLASS} text-success`} />
      ) : (
        <CircleIcon className={`${ICON_CLASS} text-base-content/50`} />
      )}
      <span className="hidden text-sm sm:inline">
        {isDone ? "Done" : "Active"}
      </span>
    </span>
  );
};
