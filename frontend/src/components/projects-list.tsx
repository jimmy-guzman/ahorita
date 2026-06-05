import { Link } from "@tanstack/react-router";
import { CheckIcon, ListTodoIcon, StarIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";

interface ProjectsListProps {
  projects: Array<{
    id: string;
    name: string;
    description?: string;
    isFavorite: boolean;
    isDone: boolean;
  }>;
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return projects;
    }

    return projects.filter((project) => {
      const name = project.name.toLowerCase();
      const description = project.description?.toLowerCase() ?? "";

      return name.includes(q) || description.includes(q);
    });
  }, [projects, query]);

  return (
    <div className="flex flex-col gap-3">
      <input
        className="dsy-input dsy-input-sm w-full max-w-xs"
        placeholder="Filter projects..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filteredProjects.length === 0 ? (
        <div role="alert" className="dsy-alert dsy-alert-soft">
          <span>No projects found. Try a different filter or create one.</span>
        </div>
      ) : (
        <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-base-200"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <Link
                    className="truncate font-medium text-sm hover:underline"
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                  >
                    {project.name}
                  </Link>
                  {project.isFavorite && (
                    <StarIcon className="h-3.5 w-3.5 shrink-0 text-warning" />
                  )}
                  {project.isDone && (
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-success" />
                  )}
                </div>
                {project.description ? (
                  <p className="truncate text-base-content/60 text-xs">
                    {project.description}
                  </p>
                ) : (
                  <p className="text-base-content/30 text-xs italic">
                    No description yet.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  className="dsy-btn dsy-btn-xs dsy-btn-ghost dsy-btn-square"
                  to="/tasks"
                  search={{ projectId: project.id }}
                  title="View tasks"
                >
                  <ListTodoIcon className="h-3.5 w-3.5" />
                </Link>

                <EditProject
                  className="dsy-btn dsy-btn-xs dsy-btn-ghost dsy-btn-square"
                  projectId={project.id}
                  hideText
                />

                <DeleteProject
                  className="dsy-btn dsy-btn-error dsy-btn-xs dsy-btn-square"
                  projectId={project.id}
                  hideText
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
