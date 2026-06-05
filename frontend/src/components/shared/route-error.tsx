import type { ErrorComponentProps } from "@tanstack/react-router";

export const RouteErrorComponent = ({ error }: ErrorComponentProps) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div role="alert" className="dsy-alert dsy-alert-error dsy-alert-soft">
      <span>{message}</span>
    </div>
  );
};
