import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import type { APIRoutes } from "@/api/client";

import { PriorityCell } from "./priority-cell";
import { TasksTableStatusCell } from "./status-cell";
import { TaskActions } from "./task-actions";

const columnHelper =
  createColumnHelper<APIRoutes["tasks"]["get"]["response"]["200"][number]>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <Link
        className="font-medium text-sm hover:underline"
        to="/tasks/$taskId"
        params={{
          taskId: info.row.original.id,
        }}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("label", {
    header: "Label",
    cell: (info) => (
      <span className="text-base-content/50 text-xs">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <TasksTableStatusCell status={info.getValue()} />,
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => <PriorityCell priority={info.getValue()} />,
  }),
  columnHelper.accessor("project.name", {
    header: "Project",
    cell: (info) => (
      <Link
        className="text-base-content/60 text-sm hover:underline"
        to="/projects/$projectId"
        params={{
          projectId: info.row.original.project.id,
        }}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <TaskActions task={info.row.original} />,
    enableGlobalFilter: false,
  }),
];
