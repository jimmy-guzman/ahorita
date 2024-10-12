import { render, screen } from "@/testing/utils";
import { DeleteProject } from "./delete-project";

describe("<DeleteProject />", () => {
  it("should render", async () => {
    await render(<DeleteProject />, {
      path: "/_auth/projects/$projectId",
    });

    const button = screen.getByRole("button", {
      name: "Delete",
    });

    expect(button).toBeInTheDocument();
  });
});
