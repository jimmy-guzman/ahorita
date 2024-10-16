import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { TaskDetails } from "./task-details";

describe("<TaskDetails />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/tasks/1", () => {
        return HttpResponse.json({
          id: "1",
          name: "add task details",
          status: "Todo",
          priority: "Medium",
          label: "Feature",
          createdAt: "2024-08-18T16:30:34.131Z",
          updatedAt: "2024-08-18T16:30:34.131Z",
          projectId: "1",
          userId: "1",
        });
      }),
    ];

    server.use(...handlers);

    await render(<TaskDetails />, {
      path: "/_auth/projects/$projectId/tasks/$taskId",
      initialEntries: ["/_auth/projects/1/tasks/1"],
    });

    const button = screen.getByRole("link", {
      name: "Back to Tasks",
    });

    expect(button).toBeInTheDocument();
  });
});
