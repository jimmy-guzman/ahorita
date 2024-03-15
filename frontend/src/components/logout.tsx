import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { api } from "@/api/client";
import { meQueryOptions } from "@/api/query-me";

export const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await api.auth.logout.post();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onMutate: async () => {
      queryClient.removeQueries(meQueryOptions);
    },
    onSuccess: async () => {
      await navigate({ to: "/login" });
    },
  });

  return (
    <button type="button" className="justify-between" onClick={() => mutate()}>
      Logout <Icon icon="lucide:log-out" className="text-base" />
    </button>
  );
};
