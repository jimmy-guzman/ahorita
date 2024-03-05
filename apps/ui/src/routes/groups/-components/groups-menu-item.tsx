import { Link } from "@tanstack/react-router";
import { ListChecksIcon } from "lucide-react";

export const GroupsMenuItem = ({
  groupId,
  icon,
  name,
}: { groupId: string; icon: string | null; name: string }) => {
  return (
    <Link
      to="/groups/$groupId"
      params={{ groupId }}
      activeProps={{ className: "dsy-active" }}
    >
      {icon ? <span>{icon}</span> : <ListChecksIcon className="h-4 w-4" />}{" "}
      {name}
    </Link>
  );
};
