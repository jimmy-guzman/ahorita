import { SendIcon } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const text = input.trim();

    if (!text || disabled) {
      return;
    }

    onSend(text);
    setInput("");
  };

  return (
    <form
      className="flex items-end gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        className="dsy-textarea min-h-10 flex-1 resize-none"
        placeholder="Ask anything about your projects and tasks…"
        rows={1}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        type="submit"
        className="dsy-btn dsy-btn-primary dsy-btn-square dsy-btn-sm"
        disabled={disabled || !input.trim()}
      >
        <SendIcon aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </button>
    </form>
  );
}
