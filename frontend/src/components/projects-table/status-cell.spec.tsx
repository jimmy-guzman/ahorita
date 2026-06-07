import { render, screen } from "@/testing/utils";

import { ProjectStatusCell } from "./status-cell";

describe("<ProjectStatusCell />", () => {
  it("should render done", async () => {
    await render(<ProjectStatusCell isDone />);

    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("should render active", async () => {
    await render(<ProjectStatusCell isDone={false} />);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
