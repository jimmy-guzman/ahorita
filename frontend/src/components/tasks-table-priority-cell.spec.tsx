import { render, screen } from "@/testing/utils";

import { TasksTablePriorityCell } from "./tasks-table-priority-cell";

describe("<TasksTablePriorityCell />", () => {
  it.each(["Low", "Medium", "High"] as const)(
    "should render %s priority",
    (priority) => {
      render(<TasksTablePriorityCell priority={priority} />);

      expect(screen.getByText(priority)).toBeInTheDocument();
    },
  );
});
