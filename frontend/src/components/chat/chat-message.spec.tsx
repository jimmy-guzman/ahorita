import type { OrchestratorUIMessage } from "@ahorita/backend";

import { render, screen } from "@/testing/utils";

import { ChatMessage } from "./chat-message";

describe("<ChatMessage />", () => {
  it("should render a user message", async () => {
    const message = {
      id: "1",
      role: "user",
      parts: [{ type: "text", text: "list my projects" }],
    } as OrchestratorUIMessage;

    await render(
      <ChatMessage message={message} onApprovalResponse={vi.fn()} />,
    );

    expect(screen.getByText("list my projects")).toBeInTheDocument();
  });

  it("should render assistant text parts", async () => {
    const message = {
      id: "2",
      role: "assistant",
      parts: [{ type: "text", text: "You have 2 projects." }],
    } as OrchestratorUIMessage;

    await render(
      <ChatMessage message={message} onApprovalResponse={vi.fn()} />,
    );

    expect(screen.getByText("You have 2 projects.")).toBeInTheDocument();
  });

  it("should render a specialist status line while working", async () => {
    const message = {
      id: "3",
      role: "assistant",
      parts: [
        {
          type: "tool-projects_specialist",
          toolCallId: "call-1",
          state: "input-available",
          input: { request: "list projects" },
        },
      ],
    } as OrchestratorUIMessage;

    await render(
      <ChatMessage message={message} onApprovalResponse={vi.fn()} />,
    );

    expect(screen.getByText("Working on your projects…")).toBeInTheDocument();
  });

  it("should render markdown links to projects and tasks", async () => {
    const message = {
      id: "5",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Created [cleanup](/tasks/t1) in your [ai](/projects/p1) project.",
        },
      ],
    } as OrchestratorUIMessage;

    await render(
      <ChatMessage message={message} onApprovalResponse={vi.fn()} />,
    );

    expect(screen.getByRole("link", { name: "cleanup" })).toHaveAttribute(
      "href",
      "/tasks/t1",
    );
    expect(screen.getByRole("link", { name: "ai" })).toHaveAttribute(
      "href",
      "/projects/p1",
    );
  });

  it("should render an approval card and pass the approval id", async () => {
    const onApprovalResponse = vi.fn();
    const message = {
      id: "4",
      role: "assistant",
      parts: [
        {
          type: "tool-delete_project",
          toolCallId: "call-2",
          state: "approval-requested",
          input: { projectId: "p1", projectName: "Website" },
          approval: { id: "approval-1" },
        },
      ],
    } as OrchestratorUIMessage;

    const { user } = await render(
      <ChatMessage message={message} onApprovalResponse={onApprovalResponse} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Delete project “Website”?",
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onApprovalResponse).toHaveBeenCalledWith("approval-1", true);
  });
});
