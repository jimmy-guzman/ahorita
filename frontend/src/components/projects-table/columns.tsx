import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import type { APIRoutes } from "@/api/client";
import { ProjectFavoriteCell } from "./favorite-cell";
import { ProjectProgressCell } from "./progress-cell";
import { ProjectActions } from "./project-actions";
import { ProjectStatusCell } from "./status-cell";
import { ProjectUpdatedCell } from "./updated-cell";

type ProjectRow = APIRoutes["projects"]["get"]["response"]["200"][number];

const columnHelper = createColumnHelper<ProjectRow>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <Link
        className="font-medium text-sm hover:underline"
        to="/projects/$projectId"
        params={{
          projectId: info.row.original.id,
        }}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => {
      const description = info.getValue();

      return description ? (
        <span className="block max-w-xs truncate text-base-content/60 text-xs">
          {description}
        </span>
      ) : (
        <span className="text-base-content/30 text-xs italic">
          No description yet.
        </span>
      );
    },
  }),
  columnHelper.accessor("isDone", {
    header: "Status",
    cell: (info) => <ProjectStatusCell isDone={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) =>
      row.taskSummary.total === 0
        ? 0
        : row.taskSummary.completed / row.taskSummary.total,
    {
      id: "progress",
      header: "Progress",
      cell: (info) => (
        <ProjectProgressCell
          total={info.row.original.taskSummary.total}
          completed={info.row.original.taskSummary.completed}
        />
      ),
    },
  ),
  columnHelper.accessor("isFavorite", {
    header: "Favorite",
    cell: (info) => <ProjectFavoriteCell isFavorite={info.getValue()} />,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: (info) => <ProjectUpdatedCell updatedAt={info.getValue()} />,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <ProjectActions project={info.row.original} />,
  }),
];
