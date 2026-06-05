import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

import { meQueryOptions } from "@/api/query-me";
import { authClient } from "@/lib/auth-client";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.removeQueries(meQueryOptions);
    await authClient.signOut();
    await navigate({ to: "/login" });
  };

  return (
    <button
      type="button"
      className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm"
      onClick={handleLogout}
    >
      <span className="sr-only">Log Out</span>
      <LogOutIcon />
    </button>
  );
};
