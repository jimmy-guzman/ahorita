import {
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react";

import type { APITypes } from "@/api/client";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

const cellsByStatus = {
  "In Progress": <TimerIcon className={ICON_CLASS} />,
  Todo: <CircleIcon className={ICON_CLASS} />,
  Done: <CheckCircle2Icon className={ICON_CLASS} />,
  Canceled: <XCircleIcon className={ICON_CLASS} />,
  Backlog: <HelpCircleIcon className={ICON_CLASS} />,
};

export const TasksTableStatusCell = ({
  status,
}: { status: APITypes["Task"]["status"] }) => {
  return (
    <>
      {cellsByStatus[status]}
      <span className="hidden sm:inline"> {status}</span>
    </>
  );
};
