import type { Api } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutationOptions";
import { tagsQueryOptions } from "@/api/queryTags";
import { queryClient } from "@/queryClient";

export const addTagMutationOptions = mutationOptions({
	mutationFn: async (body: Api["/tags"]["post"]["body"]) => {
		const res = await api.tags.post(body);

		if (res.error) throw new Error(res.error.value);

		return res.data;
	},
	onMutate: async () => {
		await queryClient.cancelQueries(tagsQueryOptions);
	},
	onSuccess: async () => {
		await queryClient.invalidateQueries(tagsQueryOptions);
	},
});
