import { render, screen } from "@/testing/utils";

import { ThemeToggle } from "./theme-toggle";

describe("<ThemeToggle />", () => {
  it("should be able to toggle", async () => {
    const { user } = await render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox", { name: "Toggle theme" });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
