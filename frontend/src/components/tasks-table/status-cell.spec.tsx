import { render, screen } from "@/testing/utils";

import { TasksTableStatusCell } from "./status-cell";

describe("<TasksTableStatusCell />", () => {
  it.each(["In Progress", "Todo", "Done", "Canceled", "Backlog"] as const)(
    "should render %s status",
    (status) => {
      render(<TasksTableStatusCell status={status} />);

      expect(screen.getByText(status)).toBeInTheDocument();
    },
  );
});
