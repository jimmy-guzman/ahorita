import { render, screen } from "@/testing/utils";

import { ProjectUpdatedCell } from "./updated-cell";

describe("<ProjectUpdatedCell />", () => {
  it("should render a short formatted date", async () => {
    await render(<ProjectUpdatedCell updatedAt="2026-06-05T12:00:00.000Z" />);

    expect(screen.getByText(/Jun/)).toBeInTheDocument();
  });
});
