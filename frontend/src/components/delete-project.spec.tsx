import { render, screen } from "@/testing/utils";

import { DeleteProject } from "./delete-project";

describe("<DeleteProject />", () => {
  it("should render", async () => {
    await render(<DeleteProject projectId="1" />);

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button).toBeInTheDocument();
  });

  it("should override className", async () => {
    await render(
      <DeleteProject projectId="1" className="dsy-btn dsy-btn-primary" />,
    );

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button).not.toHaveClass("dsy-btn dsy-btn-neutral dsy-btn-sm");
    expect(button).toHaveClass("dsy-btn dsy-btn-primary");
  });

  it("should hide text", async () => {
    await render(<DeleteProject projectId="1" hideText />);

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button.innerHTML).toMatchInlineSnapshot(
      `"<span class="sr-only">Delete </span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-minus" aria-hidden="true"><path d="M9 13h6"></path><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>"`,
    );
  });
});
