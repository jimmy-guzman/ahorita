import { createAgentUIStreamResponse } from "ai";
import { Elysia, t } from "elysia";

import { orchestrator } from "../ai/agents/orchestrator";
import { authPlugin } from "../middleware/auth";

const tags = ["Chat"];

export const chatRoutes = new Elysia({ prefix: "/chat" }).use(authPlugin).post(
  "",
  ({ user, body }) => {
    return createAgentUIStreamResponse({
      agent: orchestrator,
      uiMessages: body.messages,
      options: { userId: user.id },
    });
  },
  {
    auth: true,
    body: t.Object(
      { messages: t.Array(t.Unknown()) },
      { additionalProperties: true },
    ),
    detail: { tags, summary: "Chat with the assistant" },
  },
);
