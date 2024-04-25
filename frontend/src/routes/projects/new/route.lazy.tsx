import { createLazyFileRoute } from "@tanstack/react-router";

import { CreateProjectForm } from "@/components/create-project-form";

export const Route = createLazyFileRoute("/projects/new")({
  component: CreateProjectForm,
});
