import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { CreateTask } from "./create-task";

describe("<CreateTask />", () => {
  it("should  open modal", async () => {
    const handlers = [
      http.get("/metadata", () => {
        return HttpResponse.json({ labels: [], priorities: [], statuses: [] });
      }),
      http.get("/projects", () => {
        return HttpResponse.json([]);
      }),
    ];

    server.use(...handlers);

    const { user } = await render(<CreateTask />, { path: "/_auth/tasks/" });

    const button = screen.getByRole("button", {
      name: "Create Task",
    });

    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "Create Task",
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
