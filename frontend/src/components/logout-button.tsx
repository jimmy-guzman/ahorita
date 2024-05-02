import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { api } from "@/api/client";
import { meQueryOptions } from "@/api/query-me";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await api.auth.logout.post();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
    onMutate: () => {
      queryClient.removeQueries(meQueryOptions);
    },
    onSuccess: async () => {
      await navigate({ to: "/login" });
    },
  });

  return (
    <button
      type="button"
      className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm"
      onClick={() => mutate()}
    >
      <LogOutIcon />
    </button>
  );
};
