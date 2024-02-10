import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const cellsByPriority = {
	LOW: (
		<>
			<ArrowDownIcon className={ICON_CLASS} /> Low
		</>
	),
	MEDIUM: (
		<>
			<ArrowRightIcon className={ICON_CLASS} /> Medium
		</>
	),
	HIGH: (
		<>
			<ArrowUpIcon className={ICON_CLASS} /> High
		</>
	),
} satisfies Record<Priority, JSX.Element>;

export const TasksTablePriorityCell = ({
	priority,
}: { priority: Priority }) => {
	return cellsByPriority[priority];
};
