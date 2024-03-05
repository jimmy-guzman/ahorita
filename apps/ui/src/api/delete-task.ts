import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";
import { tasksByGroupQueryOptions } from "./query-tasks-by-group";

export const deleteTaskMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.tasks[id as ":id"].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onSuccess: async ({ groupId }) => {
    await queryClient.invalidateQueries(tasksByGroupQueryOptions(groupId));
  },
});
