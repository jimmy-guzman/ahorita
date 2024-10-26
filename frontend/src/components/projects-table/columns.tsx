import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { ListTodoIcon } from "lucide-react";

import type { APIRoutes } from "@/api/client";

import { DeleteProject } from "../delete-project";
import { EditProject } from "../edit-project";

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
    header: "Actions",
    cell: (info) => {
      const projectId = info.row.original.id;

      return (
        <div className="dsy-join">
          <Link
            className="dsy-btn dsy-btn-sm dsy-join-item"
            to="/tasks"
            search={{ projectId }}
          >
            <ListTodoIcon />
          </Link>
          <EditProject
            className="dsy-btn dsy-btn-sm dsy-join-item"
            projectId={projectId}
            hideText
          />
          <DeleteProject
            className="dsy-btn dsy-btn-sm dsy-join-item"
            projectId={projectId}
            hideText
          />
        </div>
      );
    },
    enableGlobalFilter: false,
  }),
];
