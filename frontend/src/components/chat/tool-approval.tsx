import { TriangleAlertIcon } from "lucide-react";

interface ToolApprovalProps {
  description: string;
  onRespond: (approved: boolean) => void;
  responded?: boolean;
  approved?: boolean;
}

export function ToolApproval({
  description,
  onRespond,
  responded,
  approved,
}: ToolApprovalProps) {
  if (responded) {
    return (
      <div className="dsy-alert dsy-alert-soft text-sm" role="alert">
        <TriangleAlertIcon aria-hidden="true" className="h-4 w-4" />
        <span>
          {description} — {approved ? "approved" : "denied"}
        </span>
      </div>
    );
  }

  return (
    <div className="dsy-alert dsy-alert-warning dsy-alert-soft" role="alert">
      <TriangleAlertIcon aria-hidden="true" className="h-4 w-4" />
      <span>{description}</span>
      <div className="flex gap-2">
        <button
          type="button"
          className="dsy-btn dsy-btn-ghost dsy-btn-sm"
          onClick={() => onRespond(false)}
        >
          Deny
        </button>
        <button
          type="button"
          className="dsy-btn dsy-btn-error dsy-btn-sm"
          onClick={() => onRespond(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
