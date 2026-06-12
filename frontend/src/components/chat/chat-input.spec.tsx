import { render, screen } from "@/testing/utils";

import { ChatInput } from "./chat-input";

describe("<ChatInput />", () => {
  it("should submit trimmed text and clear the input", async () => {
    const onSend = vi.fn();
    const { user } = await render(<ChatInput onSend={onSend} />);

    const input = screen.getByPlaceholderText(
      "Ask anything about your projects and tasks…",
    );

    await user.type(input, "  list my projects  {Enter}");

    expect(onSend).toHaveBeenCalledWith("list my projects");
    expect(input).toHaveValue("");
  });

  it("should not submit while disabled", async () => {
    const onSend = vi.fn();
    const { user } = await render(<ChatInput onSend={onSend} disabled />);

    const input = screen.getByPlaceholderText(
      "Ask anything about your projects and tasks…",
    );

    await user.type(input, "hello{Enter}");

    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("should disable the send button when empty", async () => {
    await render(<ChatInput onSend={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });
});
