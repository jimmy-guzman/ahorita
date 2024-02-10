import { createColumnHelper } from "@tanstack/react-table";

import { TasksTableNameCell } from "./TasksTableNameCell";
import { TasksTablePriorityCell } from "./TasksTablePriorityCell";
import { TasksTableRowActions } from "./TasksTableRowActions";
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
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => <TasksTableRowActions task={info.row.original} />,
  }),
];
