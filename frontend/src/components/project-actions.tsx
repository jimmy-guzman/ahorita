import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import {
  FolderCheckIcon,
  FolderIcon,
  StarIcon,
  StarOffIcon,
} from "lucide-react";

import { editProjectOptions } from "@/api/edit-project";
import { projectQueryOptions } from "@/api/query-project";

const routeApi = getRouteApi("/(authenticated)/projects/$projectId");

export const ProjectActions = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
  const { mutate: editProject } = useMutation(editProjectOptions);

  return (
    <div className="flex gap-2">
      {project.isFavorite ? (
        <div className="dsy-tooltip" data-tip="Mark Not Favorite">
          <button
            type="button"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            onClick={() =>
              editProject({
                params: { projectId },
                body: { isFavorite: false },
              })
            }
          >
            <StarIcon />
          </button>
        </div>
      ) : (
        <div className="dsy-tooltip" data-tip="Mark Favorite">
          <button
            type="button"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            onClick={() =>
              editProject({
                params: { projectId },
                body: { isFavorite: true },
              })
            }
          >
            <StarOffIcon />
          </button>
        </div>
      )}
      {project.isDone ? (
        <div className="dsy-tooltip" data-tip="Mark Not Done">
          <button
            type="button"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            onClick={() =>
              editProject({
                params: { projectId },
                body: { isDone: false },
              })
            }
          >
            <FolderCheckIcon />
          </button>
        </div>
      ) : (
        <div className="dsy-tooltip" data-tip="Mark Done">
          <button
            type="button"
            className="dsy-btn dsy-btn-neutral dsy-btn-circle"
            onClick={() =>
              editProject({
                params: { projectId },
                body: { isDone: true },
              })
            }
          >
            <FolderIcon />
          </button>
        </div>
      )}
    </div>
  );
};
