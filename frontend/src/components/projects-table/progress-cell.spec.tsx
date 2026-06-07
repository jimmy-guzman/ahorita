import { render, screen } from "@/testing/utils";

import { ProjectProgressCell } from "./progress-cell";

describe("<ProjectProgressCell />", () => {
  it.each([
    [0, 0, "0/0"],
    [5, 2, "2/5"],
    [5, 5, "5/5"],
  ] as const)("should render %i total / %i completed as %s", async (total, completed, label) => {
    await render(<ProjectProgressCell total={total} completed={completed} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
