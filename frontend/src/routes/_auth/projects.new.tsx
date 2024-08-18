import { createFileRoute } from "@tanstack/react-router";

import { CreateProject } from "@/components/create-project";

export const Route = createFileRoute("/_auth/projects/new")({
  component: CreateProject,
});
