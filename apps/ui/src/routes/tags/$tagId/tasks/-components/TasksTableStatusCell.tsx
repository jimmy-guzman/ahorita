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
		<span className="text-info">
			<TimerIcon className={ICON_CLASS} /> In Progress
		</span>
	),
	TODO: (
		<span className="text-accent">
			<CircleIcon className={ICON_CLASS} /> Todo
		</span>
	),
	DONE: (
		<span className="text-success">
			<CheckCircle2Icon className={ICON_CLASS} /> Done
		</span>
	),
	CANCELED: (
		<span className="text-error">
			<XCircleIcon className={ICON_CLASS} /> Canceled
		</span>
	),
	BACKLOG: (
		<span className="text-base-content">
			<HelpCircleIcon className={ICON_CLASS} /> Backlog
		</span>
	),
} satisfies Record<Status, JSX.Element>;

export const TasksTableStatusCell = ({ status }: { status: Status }) => {
	return cellsByStatus[status];
};
