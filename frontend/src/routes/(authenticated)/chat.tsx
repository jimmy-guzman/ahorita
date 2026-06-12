import { createFileRoute } from "@tanstack/react-router";

import { Chat } from "@/components/chat/chat";
import { RouteErrorComponent } from "@/components/shared/route-error";

export const Route = createFileRoute("/(authenticated)/chat")({
  component: Chat,
  errorComponent: RouteErrorComponent,
});
