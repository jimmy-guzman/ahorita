import { CheckCircle2Icon, TimerIcon } from "lucide-react";

import { ICON_CLASS } from "@/utils/cell-classes";

const cellsByStatus = {
  "In Progress": <TimerIcon className={`${ICON_CLASS} text-warning`} />,
  Done: <CheckCircle2Icon className={`${ICON_CLASS} text-success`} />,
};

export const ProjectStatusCell = ({
  status,
}: {
  status: keyof typeof cellsByStatus;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      {cellsByStatus[status]}
      <span className="hidden text-sm sm:inline">{status}</span>
    </span>
  );
};
