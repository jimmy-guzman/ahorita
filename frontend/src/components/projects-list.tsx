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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          className="dsy-input dsy-input-bordered w-full max-w-xs"
          placeholder="Filter projects..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {filteredProjects.length === 0 ? (
        <div className="dsy-alert dsy-alert-info">
          <span>No projects found. Try a different filter or create one.</span>
        </div>
      ) : (
        <ul className="dsy-list rounded-box bg-base-200">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="dsy-list-row flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    className="dsy-link dsy-link-primary font-semibold"
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                  >
                    {project.name}
                  </Link>

                  {project.isFavorite && (
                    <StarIcon className="h-4 w-4 shrink-0" />
                  )}
                  {project.isDone && <CheckIcon className="h-4 w-4 shrink-0" />}
                </div>

                {project.description ? (
                  <p className="text-base-content/70 text-sm">
                    {project.description}
                  </p>
                ) : (
                  <p className="text-base-content/40 text-sm italic">
                    No description yet.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Link
                  className="dsy-btn dsy-btn-sm dsy-btn-ghost"
                  to="/tasks"
                  search={{ projectId: project.id }}
                >
                  <ListTodoIcon />
                </Link>

                <EditProject
                  className="dsy-btn dsy-btn-sm dsy-btn-ghost"
                  projectId={project.id}
                  hideText
                />

                <DeleteProject
                  className="dsy-btn dsy-btn-sm dsy-btn-ghost"
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
