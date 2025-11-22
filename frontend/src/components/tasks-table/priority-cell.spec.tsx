import { render, screen } from "@/testing/utils";

import { PriorityCell } from "./priority-cell";

describe("<TasksTablePriorityCell />", () => {
  it.each([
    "Low",
    "Medium",
    "High",
  ] as const)("should render %s priority", async (priority) => {
    await render(<PriorityCell priority={priority} />);

    expect(screen.getByText(priority)).toBeInTheDocument();
  });
});
