import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { LogOutIcon } from "lucide-react";

import { api } from "@/api/client";

export const Logout = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await api.auth.logout.post();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onSuccess: async () => {
      await navigate({ to: "/login" });
    },
  });

  return (
    <button
      type="button"
      className="dsy-btn dsy-btn-ghost dsy-btn-xs lg:dsy-btn-md"
      onClick={() => mutate()}
    >
      Logout <LogOutIcon className="h-4 w-4" />
    </button>
  );
};
