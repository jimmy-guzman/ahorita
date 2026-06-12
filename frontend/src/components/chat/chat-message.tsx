import type { OrchestratorUIMessage } from "@ahorita/backend";
import { FolderIcon, ListTodoIcon, Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { ChatMarkdown } from "./chat-markdown";
import { ToolApproval } from "./tool-approval";

type MessagePart = OrchestratorUIMessage["parts"][number];

interface ChatMessageProps {
  message: OrchestratorUIMessage;
  onApprovalResponse: (id: string, approved: boolean) => void;
}

function SpecialistStatus({
  icon,
  label,
  done,
}: {
  icon: ReactNode;
  label: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 text-base-content/60 text-sm">
      {done ? (
        icon
      ) : (
        <Loader2Icon aria-hidden="true" className="h-4 w-4 animate-spin" />
      )}
      <span>{label}</span>
    </div>
  );
}

function Part({
  part,
  onApprovalResponse,
}: {
  part: MessagePart;
  onApprovalResponse: ChatMessageProps["onApprovalResponse"];
}) {
  switch (part.type) {
    case "text": {
      return (
        <div className="dsy-chat dsy-chat-start">
          <div className="dsy-chat-bubble">
            <ChatMarkdown>{part.text}</ChatMarkdown>
          </div>
        </div>
      );
    }
    case "tool-projects_specialist": {
      return (
        <SpecialistStatus
          icon={<FolderIcon aria-hidden="true" className="h-4 w-4" />}
          label={
            part.state === "output-available"
              ? "Looked at your projects"
              : "Working on your projects…"
          }
          done={part.state === "output-available"}
        />
      );
    }
    case "tool-tasks_specialist": {
      return (
        <SpecialistStatus
          icon={<ListTodoIcon aria-hidden="true" className="h-4 w-4" />}
          label={
            part.state === "output-available"
              ? "Looked at your tasks"
              : "Working on your tasks…"
          }
          done={part.state === "output-available"}
        />
      );
    }
    case "tool-delete_project":
    case "tool-delete_task": {
      const subject = part.type === "tool-delete_project" ? "project" : "task";

      if (
        part.state === "approval-requested" ||
        part.state === "approval-responded"
      ) {
        const name =
          part.type === "tool-delete_project"
            ? part.input.projectName
            : part.input.taskName;

        return (
          <ToolApproval
            description={`Delete ${subject} “${name}”?`}
            responded={part.state === "approval-responded"}
            approved={
              part.state === "approval-responded"
                ? part.approval.approved
                : undefined
            }
            onRespond={(approved) => {
              if (part.state === "approval-requested") {
                onApprovalResponse(part.approval.id, approved);
              }
            }}
          />
        );
      }

      if (part.state === "output-error") {
        return (
          <div
            className="dsy-alert dsy-alert-error dsy-alert-soft text-sm"
            role="alert"
          >
            <span>Failed to delete {subject}.</span>
          </div>
        );
      }

      return (
        <SpecialistStatus
          icon={
            subject === "project" ? (
              <FolderIcon aria-hidden="true" className="h-4 w-4" />
            ) : (
              <ListTodoIcon aria-hidden="true" className="h-4 w-4" />
            )
          }
          label={
            part.state === "output-available"
              ? `Deleted ${subject}`
              : `Deleting ${subject}…`
          }
          done={part.state === "output-available"}
        />
      );
    }
    default: {
      return null;
    }
  }
}

export function ChatMessage({ message, onApprovalResponse }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div className="dsy-chat dsy-chat-end">
        <div className="dsy-chat-bubble dsy-chat-bubble-primary whitespace-pre-wrap">
          {message.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join("")}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2")}>
      {message.parts.map((part, index) => (
        <Part
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are append-only within a message
          key={`${message.id}-${index}`}
          part={part}
          onApprovalResponse={onApprovalResponse}
        />
      ))}
    </div>
  );
}
