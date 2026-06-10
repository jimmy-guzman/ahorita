import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";

export const RouteErrorComponent = ({ error }: ErrorComponentProps) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div role="alert" className="dsy-alert dsy-alert-error dsy-alert-soft">
      <TriangleAlertIcon aria-hidden="true" className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};
