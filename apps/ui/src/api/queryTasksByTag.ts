import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tasksByTagQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: ["tags", id, "tasks"] as const,
		queryFn: async () => {
			const res = await api.tags[id as ":id"].tasks.get();

			if (res.error) throw new Error(res.error.value);

			return res.data;
		},
	});
};
