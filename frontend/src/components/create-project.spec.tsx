import { render, screen } from "@/testing/utils";
import { CreateProject } from "./create-project";

describe("<CreateProject />", () => {
  it("should render", async () => {
    await render(<CreateProject />);

    const heading = screen.getByRole("heading", {
      name: "Create New Project",
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});
