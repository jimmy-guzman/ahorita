import { render, screen } from "@/testing/utils";

import { ErrorStatus } from "./error-status";

describe("<ErrorStatus />", () => {
  it('should render "Something went Wrong!" message', async () => {
    await render(
      <ErrorStatus
        reset={vi.fn()}
        error={new Error("Something went Wrong!")}
      />,
    );

    expect(screen.getByText("Something went Wrong!")).toBeInTheDocument();
  });
});
