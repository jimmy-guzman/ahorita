import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId/tasks")({
  component: Outlet,
});
