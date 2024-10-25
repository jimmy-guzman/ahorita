import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { ListTodoIcon } from "lucide-react";

import type { APIRoutes } from "@/api/client";

const columnHelper =
  createColumnHelper<APIRoutes["projects"]["get"]["response"]["200"][number]>();

export const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Link
        className="dsy-link dsy-link-primary"
        to="/projects/$projectId"
        params={{
          projectId: info.row.original.id,
        }}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("description", {}),
  columnHelper.accessor("isDone", {
    header: "Done?",
  }),
  columnHelper.accessor("isFavorite", {
    header: "Favorite?",
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: (info) => {
      return (
        <div className="dsy-join">
          <Link
            className="dsy-btn dsy-btn-sm join-item"
            to="/tasks"
            search={{
              projectId: info.row.original.id,
            }}
          >
            <ListTodoIcon />
          </Link>
        </div>
      );
    },
    enableGlobalFilter: false,
  }),
];
