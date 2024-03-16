import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";
import { toast } from "sonner";
import { tasksByProjectQueryOptions } from "./query-tasks-by-project";

export const deleteTaskMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.tasks[id as ":id"].delete();

    if (res.error) {
      throw new Error(res.error.value);
    }

    return res.data;
  },
  onSuccess: async ({ projectId }) => {
    await queryClient.invalidateQueries(tasksByProjectQueryOptions(projectId));

    toast.success("Task has been deleted");
  },
});
