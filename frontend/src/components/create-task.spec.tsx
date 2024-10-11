import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { CreateTask } from "./create-task";

describe("<CreateTask />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/metadata", () => {
        return HttpResponse.json({ labels: [], priorities: [] });
      }),
    ];

    server.use(...handlers);

    await render(<CreateTask />, {
      path: "/_auth/projects/$projectId/tasks/new",
    });

    const heading = screen.getByRole("heading", {
      name: "Create New Task",
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
