import { createLazyFileRoute } from "@tanstack/react-router";

import { ProjectDetails } from "@/components/project-details";

export const Route = createLazyFileRoute("/projects/$projectId")({
  component: ProjectDetails,
});
