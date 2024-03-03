import { createFileRoute } from "@tanstack/react-router";
import { AddTask } from "./-components/add-task";

export const Route = createFileRoute("/groups/$groupId/tasks/new")({
  component: AddTask,
});
