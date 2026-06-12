import { render, screen } from "@/testing/utils";

import { ToolApproval } from "./tool-approval";

describe("<ToolApproval />", () => {
  it("should invoke the callback with true when approved", async () => {
    const onRespond = vi.fn();
    const { user } = await render(
      <ToolApproval
        description="Delete project “Foo”?"
        onRespond={onRespond}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onRespond).toHaveBeenCalledWith(true);
  });

  it("should invoke the callback with false when denied", async () => {
    const onRespond = vi.fn();
    const { user } = await render(
      <ToolApproval description="Delete task “Bar”?" onRespond={onRespond} />,
    );

    await user.click(screen.getByRole("button", { name: "Deny" }));

    expect(onRespond).toHaveBeenCalledWith(false);
  });

  it("should show the outcome once responded", async () => {
    await render(
      <ToolApproval
        description="Delete task “Bar”?"
        onRespond={vi.fn()}
        responded
        approved={false}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("denied");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
