import { useRouter } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { type Components, Streamdown } from "streamdown";

function MarkdownLink({ href = "", children }: ComponentProps<"a">) {
  const router = useRouter();

  if (href.startsWith("/")) {
    return (
      <a
        href={href}
        className="dsy-link dsy-link-primary"
        onClick={(event) => {
          event.preventDefault();
          router.history.push(href);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="dsy-link dsy-link-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

// Components has a string index signature our typed link doesn't satisfy
const components = { a: MarkdownLink } as Components;

export function ChatMarkdown({ children }: { children: string }) {
  return <Streamdown components={components}>{children}</Streamdown>;
}
