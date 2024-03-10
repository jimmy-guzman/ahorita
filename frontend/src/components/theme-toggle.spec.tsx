import { render, screen } from "@/testing/utils";

import { ThemeToggle } from "./theme-toggle";

describe("<ThemeToggle />", () => {
  it("should be able to toggle", async () => {
    const { user } = render(<ThemeToggle lightTheme="light" />);

    expect(
      screen.getByRole("checkbox", { name: /toggle theme/i }),
    ).not.toBeChecked();

    await user.click(screen.getByRole("checkbox", { name: /toggle theme/i }));

    expect(
      screen.getByRole("checkbox", { name: /toggle theme/i }),
    ).toBeChecked();
  });
});
