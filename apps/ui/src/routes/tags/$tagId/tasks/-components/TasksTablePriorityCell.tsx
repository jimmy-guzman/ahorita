import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

const ICON_CLASS = "inline-block h-4 w-4 stroke-current align-text-bottom";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const cellsByPriority = {
	LOW: (
		<span className="text-info">
			<ArrowDownIcon className={ICON_CLASS} /> Low
		</span>
	),
	MEDIUM: (
		<span className="text-accent">
			<ArrowRightIcon className={ICON_CLASS} /> Medium
		</span>
	),
	HIGH: (
		<span className="text-error">
			<ArrowUpIcon className={ICON_CLASS} /> High
		</span>
	),
} satisfies Record<Priority, JSX.Element>;

export const TasksTablePriorityCell = ({
	priority,
}: { priority: Priority }) => {
	return cellsByPriority[priority];
};
