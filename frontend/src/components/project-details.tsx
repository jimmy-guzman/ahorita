import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { ListTodoIcon } from "lucide-react";

import { projectQueryOptions } from "@/api/query-project";

import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";
import { ProjectActions } from "./project-actions";

const routeApi = getRouteApi("/projects/$projectId");

export const ProjectDetails = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            <span>{project.name}</span>
            <ProjectActions />
          </h1>
          <p>{project.description}</p>
          <div className="dsy-card-actions justify-end">
            <DeleteProject />
            <EditProject />
            <Link
              className="dsy-btn dsy-btn-primary"
              to="/projects/$projectId/tasks"
              params={{ projectId }}
              activeOptions={{ exact: true }}
              activeProps={{ className: "dsy-btn-active" }}
            >
              <span className="hidden sm:inline">Tasks</span>
              <ListTodoIcon />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};
