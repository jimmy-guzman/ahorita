import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

import { ICON_CLASS } from "@/utils/cell-classes";

const cellsByPriority = {
  Low: <ArrowDownIcon className={`${ICON_CLASS} text-base-content/40`} />,
  Medium: <ArrowRightIcon className={`${ICON_CLASS} text-warning`} />,
  High: <ArrowUpIcon className={`${ICON_CLASS} text-error`} />,
};

export const PriorityCell = ({
  priority,
}: {
  priority: keyof typeof cellsByPriority;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      {cellsByPriority[priority]}
      <span className="hidden text-sm sm:inline">{priority}</span>
    </span>
  );
};
