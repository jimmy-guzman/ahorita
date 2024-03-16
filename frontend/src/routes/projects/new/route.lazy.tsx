import { createLazyFileRoute } from "@tanstack/react-router";

import { CreateGroupForm } from "./-components/create-project-form";

export const Route = createLazyFileRoute("/projects/new")({
  component: CreateGroupForm,
});
