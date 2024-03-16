import {
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

type Status = "BACKLOG" | "CANCELED" | "DONE" | "IN_PROGRESS" | "TODO";

const cellsByStatus = {
  IN_PROGRESS: (
    <>
      <TimerIcon className={ICON_CLASS} />
      <span className="hidden sm:inline"> In Progress</span>
    </>
  ),
  TODO: (
    <>
      <CircleIcon className={ICON_CLASS} />
      <span className="hidden sm:inline"> Todo</span>
    </>
  ),
  DONE: (
    <>
      <CheckCircle2Icon className={ICON_CLASS} />
      <span className="hidden sm:inline"> Done</span>
    </>
  ),
  CANCELED: (
    <>
      <XCircleIcon className={ICON_CLASS} />
      <span className="hidden sm:inline"> Canceled</span>
    </>
  ),
  BACKLOG: (
    <>
      <HelpCircleIcon className={ICON_CLASS} />
      <span className="hidden sm:inline"> Backlog</span>
    </>
  ),
} satisfies Record<Status, JSX.Element>;

export const TasksTableStatusCell = ({ status }: { status: Status }) => {
  return cellsByStatus[status];
};
