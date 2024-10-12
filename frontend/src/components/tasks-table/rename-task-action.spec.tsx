import { render, screen } from "@/testing/utils";
import { RenameTaskAction } from "./rename-task-action";

describe("<RenameTaskAction />", () => {
  it("should render", async () => {
    await render(<RenameTaskAction name="Setup msw" taskId="1" />);

    const button = screen.getByRole("button", {
      name: "Rename Setup msw",
    });

    expect(button).toBeInTheDocument();
  });
});
