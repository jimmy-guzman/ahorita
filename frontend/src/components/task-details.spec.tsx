import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";

import { TaskDetails } from "./task-details";

const mockProject = {
  id: "1",
  name: "Revamp Testing Suite",
  description: "",
  isFavorite: false,
  isDone: false,
  createdAt: "2024-08-25T16:54:05.991Z",
  updatedAt: "2024-08-25T16:54:05.991Z",
};

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
          project: mockProject,
        });
      }),
    ];

    server.use(...handlers);

    await render(<TaskDetails />, {
      path: "/_auth/tasks/$taskId",
      initialEntries: ["/_auth/tasks/1"],
    });

    const heading = screen.getByRole("heading", {
      name: "add task details",
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});
