import { render, screen } from "@/testing/utils";
import { CreateProject } from "./create-project";

describe("<CreateProject />", () => {
  it("should open modal", async () => {
    const { user } = await render(<CreateProject />);

    const button = screen.getByRole("button", {
      name: "Create Project",
    });

    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Create Project",
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
