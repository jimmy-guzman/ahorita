import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FoldersIcon, LayoutDashboardIcon } from "lucide-react";

import { meQueryOptions } from "@/api/query-me";

export const GetStartedButton = () => {
  const { data } = useSuspenseQuery(meQueryOptions);

  if (data.user) {
    return (
      <Link to="/projects" className="dsy-btn dsy-btn-primary">
        Dashboard <LayoutDashboardIcon />
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      search={{ redirect: "/projects" }}
      className="dsy-btn dsy-btn-accent"
    >
      Get Started <FoldersIcon />
    </Link>
  );
};
