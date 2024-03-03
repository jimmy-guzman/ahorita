import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/groups/$groupId/tasks")({
  component: Outlet,
});
