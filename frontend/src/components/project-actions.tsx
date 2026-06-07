import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";

import { editProjectOptions } from "@/api/edit-project";
import { queryMetadataOptions } from "@/api/query-metadata";
import { projectQueryOptions } from "@/api/query-project";

const routeApi = getRouteApi("/(authenticated)/projects/$projectId");

export const ProjectActions = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
  const { data: metadata } = useSuspenseQuery(queryMetadataOptions());
  const { mutate: editProject } = useMutation(editProjectOptions);

  return (
    <div className="flex items-center gap-3">
      <label className="flex cursor-pointer items-center gap-1.5 text-sm">
        <input
          type="checkbox"
          className="dsy-toggle dsy-toggle-sm dsy-toggle-warning"
          checked={project.isFavorite}
          onChange={(e) =>
            editProject({
              params: { projectId },
              body: { isFavorite: e.target.checked },
            })
          }
        />
        <StarIcon className="h-3.5 w-3.5" />
        <span className="sr-only">Favorite</span>
      </label>

      <label className="flex cursor-pointer items-center gap-1.5 text-sm">
        <span className="sr-only">Status</span>
        <select
          className="dsy-select dsy-select-sm"
          value={project.status}
          onChange={(e) =>
            editProject({
              params: { projectId },
              body: { status: e.target.value as typeof project.status },
            })
          }
        >
          {metadata.projectStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
