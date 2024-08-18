import { createFileRoute } from "@tanstack/react-router";

import { CreateTask } from "@/components/create-task";

export const Route = createFileRoute("/_auth/projects/$projectId/tasks/new")({
  component: CreateTask,
});
