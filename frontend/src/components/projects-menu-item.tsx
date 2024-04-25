import { Link } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";

export const ProjectsMenuItem = ({
  projectId,
  icon,
  name,
}: { projectId: string; icon: string | null; name: string }) => {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId }}
      activeProps={{ className: "dsy-active" }}
    >
      {icon ? <span>{icon}</span> : <FolderIcon className="h-4 w-4" />} {name}
    </Link>
  );
};
