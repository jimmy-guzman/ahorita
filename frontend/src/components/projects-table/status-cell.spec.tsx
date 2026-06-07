import { render, screen } from "@/testing/utils";

import { ProjectStatusCell } from "./status-cell";

describe("<ProjectStatusCell />", () => {
  it("should render done", async () => {
    await render(<ProjectStatusCell status="Done" />);

    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("should render in progress", async () => {
    await render(<ProjectStatusCell status="In Progress" />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });
});
