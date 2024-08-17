import { createFileRoute } from "@tanstack/react-router";

import { CreateProjectForm } from "@/components/create-project-form";

export const Route = createFileRoute("/_auth/projects/new")({
  component: CreateProjectForm,
});
