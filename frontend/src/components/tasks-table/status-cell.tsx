import {
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react";

import { ICON_CLASS } from "@/utils/cell-classes";

const cellsByStatus = {
  "In Progress": <TimerIcon className={`${ICON_CLASS} text-warning`} />,
  Todo: <CircleIcon className={`${ICON_CLASS} text-base-content/50`} />,
  Done: <CheckCircle2Icon className={`${ICON_CLASS} text-success`} />,
  Canceled: <XCircleIcon className={`${ICON_CLASS} text-base-content/25`} />,
  Backlog: <HelpCircleIcon className={`${ICON_CLASS} text-base-content/30`} />,
};

export const TasksTableStatusCell = ({
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
