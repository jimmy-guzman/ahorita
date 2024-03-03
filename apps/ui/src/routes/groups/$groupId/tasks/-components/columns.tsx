import { createColumnHelper } from "@tanstack/react-table";

import { formatDistanceToNowStrict } from "date-fns";
import { TasksTableNameCell } from "./tasks-table-name-cell";
import { TasksTablePriorityCell } from "./tasks-table-priority-cell";
import { TasksTableRowActions } from "./tasks-table-row-actions";
import { TasksTableStatusCell } from "./tasks-table-status-cell";

const columnHelper = createColumnHelper<{
  id: string;
  groupId: string;
  name: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  dueAt: string;
  userId: string;
}>();

export const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Title",
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
  columnHelper.accessor("dueAt", {
    header: "Due",
    cell: (info) => `in ${formatDistanceToNowStrict(info.getValue())}`,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => <TasksTableRowActions task={info.row.original} />,
  }),
];
