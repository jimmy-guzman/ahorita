import { render, screen } from "@/testing/utils";
import { ProjectsMenuItem } from "./projects-menu-item";

describe("<ProjectsMenuItem />", () => {
  it("should render", async () => {
    await render(
      <ProjectsMenuItem projectId="1" name="Revamp Testing Suite" isDone />,
    );

    const link = screen.getByRole("link", {
      name: "Project Done: Revamp Testing Suite",
    });

    expect(link).toBeInTheDocument();
  });

  it("should render folder icon when NOT done", async () => {
    await render(
      <ProjectsMenuItem
        projectId="1"
        name="Revamp Testing Suite"
        isDone={false}
      />,
    );

    const link = screen.getByRole("link", {
      name: "Project Not Done: Revamp Testing Suite",
    });

    expect(link).toBeInTheDocument();
  });
});
