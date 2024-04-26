import { createColumnHelper } from "@tanstack/react-table";

import type { APITypes } from "@/api/client";

import { TasksTablePriorityCell } from "./tasks-table-priority-cell";
import { TasksTableRowActions } from "./tasks-table-row-actions";
import { TasksTableStatusCell } from "./tasks-table-status-cell";

const columnHelper = createColumnHelper<APITypes["task"]>();

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
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => <TasksTableRowActions task={info.row.original} />,
    enableGlobalFilter: false,
  }),
];
