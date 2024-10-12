import { render, screen } from "@/testing/utils";
import { DeleteTaskAction } from "./delete-task-action";

describe("<DeleteTaskAction />", () => {
  it("should render", async () => {
    await render(
      <DeleteTaskAction name="Setup msw" taskId="1" closeActions={vi.fn()} />,
    );

    const button = screen.getByRole("button", {
      name: "Delete Setup msw",
    });

    expect(button).toBeInTheDocument();
  });
});
