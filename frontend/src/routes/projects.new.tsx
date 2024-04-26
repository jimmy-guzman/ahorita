import { createFileRoute } from "@tanstack/react-router";

import { CreateProjectForm } from "@/components/create-project-form";

export const Route = createFileRoute("/projects/new")({
  component: CreateProjectForm,
});
