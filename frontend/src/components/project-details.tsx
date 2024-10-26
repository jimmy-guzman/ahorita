import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { ListTodoIcon } from "lucide-react";

import { projectQueryOptions } from "@/api/query-project";

import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";
import { ProjectActions } from "./project-actions";

const routeApi = getRouteApi("/_auth/projects/$projectId");

export const ProjectDetails = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            <Link
              className="dsy-link dsy-link-hover"
              to="/projects/$projectId"
              params={{ projectId }}
            >
              {project.name}
            </Link>
            <ProjectActions />
          </h1>
          <p>{project.description}</p>
          <div className="dsy-card-actions justify-end">
            <DeleteProject projectId={projectId} />
            <EditProject projectId={projectId} />
            <Link
              className="dsy-btn dsy-btn-primary dsy-btn-sm"
              to="/tasks"
              search={{ projectId }}
            >
              <span className="hidden sm:inline">Tasks</span>
              <ListTodoIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
