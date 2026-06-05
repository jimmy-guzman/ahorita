import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FolderCheckIcon, StarIcon } from "lucide-react";

import { editProjectOptions } from "@/api/edit-project";
import { projectQueryOptions } from "@/api/query-project";

const routeApi = getRouteApi("/(authenticated)/projects/$projectId");

export const ProjectActions = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
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
        <input
          type="checkbox"
          className="dsy-toggle dsy-toggle-sm dsy-toggle-success"
          checked={project.isDone}
          onChange={(e) =>
            editProject({
              params: { projectId },
              body: { isDone: e.target.checked },
            })
          }
        />
        <FolderCheckIcon className="h-3.5 w-3.5" />
        <span className="sr-only">Done</span>
      </label>
    </div>
  );
};
