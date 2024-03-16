import { render, screen } from "@/testing/utils";

import { TasksTablePriorityCell } from "./tasks-table-priority-cell";

describe("<TasksTablePriorityCell />", () => {
  it.each([
    { priority: "LOW", text: "Low" },
    { priority: "MEDIUM", text: "Medium" },
    { priority: "HIGH", text: "High" },
  ] as const)(
    "should render $priority when status is $text",
    ({ priority, text }) => {
      render(<TasksTablePriorityCell priority={priority} />);

      expect(screen.getByText(text)).toBeInTheDocument();
    },
  );
});
