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

    await render(<EditProject />, {
      path: "/_auth/projects/$projectId",
      initialEntries: ["/_auth/projects/1"],
    });

    const button = screen.getByRole("button", {
      name: "Edit",
    });

    expect(button).toBeInTheDocument();
  });
});
