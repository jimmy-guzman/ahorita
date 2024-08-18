import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

import type { APITypes } from "@/api/client";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

const cellsByPriority = {
  Low: <ArrowDownIcon className={ICON_CLASS} />,
  Medium: <ArrowRightIcon className={ICON_CLASS} />,
  High: <ArrowUpIcon className={ICON_CLASS} />,
};

export const PriorityCell = ({
  priority,
}: { priority: APITypes["Task"]["priority"] }) => {
  return (
    <>
      {cellsByPriority[priority]}
      <span className="hidden sm:inline"> {priority}</span>
    </>
  );
};
