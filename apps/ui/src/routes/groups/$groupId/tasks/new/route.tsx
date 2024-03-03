import { createFileRoute } from "@tanstack/react-router";
import { CreateTaskForm } from "./-components/create-task-form";

export const Route = createFileRoute("/groups/$groupId/tasks/new")({
  component: CreateTaskForm,
});
