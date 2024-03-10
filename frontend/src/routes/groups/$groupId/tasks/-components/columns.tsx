import { createColumnHelper } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";

import { TasksTablePriorityCell } from "./tasks-table-priority-cell";
import { TasksTableRowActions } from "./tasks-table-row-actions";
import { TasksTableStatusCell } from "./tasks-table-status-cell";

const columnHelper = createColumnHelper<{
  id: string;
  groupId: string;
  name: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  label: "Feature" | "Bug" | "Documentation";
  createdAt: string;
  updatedAt: string;
  dueAt: string;
  userId: string;
}>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("label", {
    header: "Label",
    cell: (info) => (
      <span className="dsy-badge dsy-badge-neutral">{info.getValue()}</span>
    ),
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
    enableGlobalFilter: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => <TasksTableRowActions task={info.row.original} />,
    enableGlobalFilter: false,
  }),
];
