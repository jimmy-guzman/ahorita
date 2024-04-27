import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import {
  FolderCheckIcon,
  FolderIcon,
  ListTodoIcon,
  StarIcon,
  StarOffIcon,
} from "lucide-react";

import { editProjectOptions } from "@/api/edit-project";
import { projectQueryOptions } from "@/api/query-project";

import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";

const routeApi = getRouteApi("/projects/$projectId");

export const ProjectDetails = () => {
  const { projectId } = routeApi.useParams();
  const { data: project } = useSuspenseQuery(projectQueryOptions(projectId));
  const { mutate: editProject } = useMutation(editProjectOptions);

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            <div>
              {project.icon && <span>{project.icon}</span>} {project.name}
            </div>
            <div>
              {project.isFavorite ? (
                <button
                  type="button"
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                  onClick={() =>
                    editProject({
                      params: { projectId },
                      body: { isFavorite: false },
                    })
                  }
                >
                  <StarIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                  onClick={() =>
                    editProject({
                      params: { projectId },
                      body: { isFavorite: true },
                    })
                  }
                >
                  <StarOffIcon />
                </button>
              )}
              {project.isDone ? (
                <button
                  type="button"
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                  onClick={() =>
                    editProject({
                      params: { projectId },
                      body: { isDone: false },
                    })
                  }
                >
                  <FolderCheckIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                  onClick={() =>
                    editProject({
                      params: { projectId },
                      body: { isDone: true },
                    })
                  }
                >
                  <FolderIcon />
                </button>
              )}
            </div>
          </h1>
          <p>{project.description}</p>
          <div className="dsy-card-actions justify-end">
            <DeleteProject />
            <EditProject />
            <Link
              className="dsy-btn dsy-btn-primary dsy-btn-sm"
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
