import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

import type { Priority } from "@/constants/tasks";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

const cellsByPriority = {
  Low: <ArrowDownIcon className={ICON_CLASS} />,
  Medium: <ArrowRightIcon className={ICON_CLASS} />,
  High: <ArrowUpIcon className={ICON_CLASS} />,
} satisfies Record<Priority, JSX.Element>;

export const TasksTablePriorityCell = ({
  priority,
}: { priority: Priority }) => {
  return (
    <>
      {cellsByPriority[priority]}
      <span className="hidden sm:inline"> {priority}</span>
    </>
  );
};
