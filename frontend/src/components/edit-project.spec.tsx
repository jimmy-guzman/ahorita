import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { EditProject } from "./edit-project";

describe("<EditProject />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/projects/1", () => {
        return HttpResponse.json({});
      }),
    ];

    server.use(...handlers);

    await render(<EditProject projectId="1" />);

    const button = screen.getByRole("button", {
      name: "Edit",
    });

    expect(button).toBeInTheDocument();
  });

  it("should override className", async () => {
    const handlers = [
      http.get("/projects/1", () => {
        return HttpResponse.json({});
      }),
    ];

    server.use(...handlers);

    await render(
      <EditProject projectId="1" className="dsy-btn dsy-btn-primary" />,
    );

    const button = screen.getByRole("button", {
      name: "Edit",
    });

    expect(button).not.toHaveClass("dsy-btn dsy-btn-neutral dsy-btn-sm");
    expect(button).toHaveClass("dsy-btn dsy-btn-primary");
  });

  it("should hide text", async () => {
    const handlers = [
      http.get("/projects/1", () => {
        return HttpResponse.json({});
      }),
    ];

    server.use(...handlers);

    await render(<EditProject projectId="1" hideText />);

    const button = screen.getByRole("button", {
      name: "Edit",
    });

    expect(button.innerHTML).toMatchInlineSnapshot(
      `"<span class="sr-only">Edit </span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-pen"><path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"></path><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></svg>"`,
    );
  });
});
