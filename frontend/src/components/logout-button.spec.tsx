import { render, screen } from "@/testing/utils";
import { LogoutButton } from "./logout-button";

describe("<LogoutButton />", () => {
  it("should render", async () => {
    await render(<LogoutButton />);

    const button = screen.getByRole("button", {
      name: "Log Out",
    });

    expect(button).toBeInTheDocument();
  });
});
