import type { OrchestratorUIMessage } from "@ahorita/backend";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from "ai";
import { BotIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import queryClient from "@/query-client";

import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

export function Chat() {
  const { messages, sendMessage, addToolApprovalResponse, status, error } =
    useChat<OrchestratorUIMessage>({
      transport: new DefaultChatTransport({
        api: `${import.meta.env.VITE_SERVER_DOMAIN}/chat`,
        credentials: "include",
      }),
      sendAutomaticallyWhen:
        lastAssistantMessageIsCompleteWithApprovalResponses,
      onFinish: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["projects"] }),
          queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        ]);
      },
    });

  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-base-content text-xl">Chat</h1>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto rounded-box border border-base-300 p-4">
        {messages.length === 0 ? (
          <div className="dsy-alert dsy-alert-soft" role="alert">
            <BotIcon aria-hidden="true" className="h-4 w-4" />
            <span>
              Ask me to list, create, update, or delete your projects and tasks.
              For example: “create a high priority bug task called fix login in
              my Website project”.
            </span>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onApprovalResponse={(id, approved) => {
                void addToolApprovalResponse({ id, approved });
              }}
            />
          ))
        )}
        {error ? (
          <div
            className="dsy-alert dsy-alert-error dsy-alert-soft"
            role="alert"
          >
            <span>{error.message || "Something went wrong."}</span>
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        disabled={isBusy}
        onSend={(text) => {
          void sendMessage({ text });
        }}
      />
    </div>
  );
}
