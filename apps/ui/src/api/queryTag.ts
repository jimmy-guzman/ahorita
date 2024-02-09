import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tagQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: ["tags", id] as const,
		queryFn: async () => {
			const res = await api.tags[id as ":id"].get();

			if (res.error) throw new Error(res.error.value);

			return res.data;
		},
	});
};
