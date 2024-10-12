import { Link } from "@tanstack/react-router";
import { FolderCheckIcon, FolderIcon } from "lucide-react";

interface ProjectsMenuItemProps {
  projectId: string;
  name: string;
  isDone: boolean;
}

export const ProjectsMenuItem = ({
  projectId,
  name,
  isDone,
}: ProjectsMenuItemProps) => {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId }}
      activeProps={{ className: "dsy-active" }}
    >
      {isDone ? (
        <FolderCheckIcon className="h-4 w-4" aria-label="Project Done:" />
      ) : (
        <FolderIcon className="h-4 w-4" aria-label="Project Not Done:" />
      )}
      {name}
    </Link>
  );
};
