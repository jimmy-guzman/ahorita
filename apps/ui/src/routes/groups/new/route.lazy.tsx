import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateGroupForm } from "./-components/create-group-form";

export const Route = createLazyFileRoute("/groups/new")({
  component: CreateGroupForm,
});
