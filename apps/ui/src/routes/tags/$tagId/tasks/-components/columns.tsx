import { createColumnHelper } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";

import { TasksTableActions } from "./TasksTableActions";
import { TasksTableNameCell } from "./TasksTableNameCell";
import { TasksTablePriorityCell } from "./TasksTablePriorityCell";
import { TasksTableStatusCell } from "./TasksTableStatusCell";

const columnHelper = createColumnHelper<{
	id: string;
	tagId: string;
	name: string;
	status: "BACKLOG" | "CANCELED" | "DONE" | "IN_PROGRESS" | "TODO";
	priority: "LOW" | "MEDIUM" | "HIGH";
	createdAt: string;
	updatedAt: string;
}>();

export const columns = [
	columnHelper.accessor("name", {
		header: "Task",
		cell: (info) => <TasksTableNameCell info={info} />,
	}),
	columnHelper.accessor("status", {
		header: "Status",
		cell: (info) => <TasksTableStatusCell status={info.getValue()} />,
	}),
	columnHelper.accessor("priority", {
		header: "Priority",
		cell: (info) => <TasksTablePriorityCell priority={info.getValue()} />,
	}),
	columnHelper.accessor("createdAt", {
		header: "Created At",
		cell: (info) => `${formatDistanceToNowStrict(info.getValue())} ago`,
	}),
	columnHelper.accessor("updatedAt", {
		header: "Updated At",
		cell: (info) => `${formatDistanceToNowStrict(info.getValue())} ago`,
	}),
	columnHelper.display({
		header: "Actions",
		cell: (info) => <TasksTableActions info={info} />,
	}),
];
