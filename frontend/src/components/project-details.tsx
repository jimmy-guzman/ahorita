import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import { projectQueryOptions } from "@/api/query-project";
import { AddTaskToProject } from "./add-task-to-project";
import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";

const routeApi = getRouteApi("/(authenticated)/projects/$projectId");

export const ProjectDetails = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <h1 className="truncate font-semibold text-base-content text-xl">
          {project.name}
        </h1>
        {project.description ? (
          <p className="text-base-content/60 text-sm">{project.description}</p>
        ) : (
          <p className="text-base-content/30 text-sm italic">No description.</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <AddTaskToProject projectId={projectId} />
        <EditProject projectId={projectId} />
        <DeleteProject projectId={projectId} />
      </div>
    </div>
  );
};
