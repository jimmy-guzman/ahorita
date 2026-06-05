import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { TasksStats } from "./tasks-stats";

describe("<TasksStats />", () => {
  it("should render task titles", async () => {
    const handlers = [
      http.get("/tasks", ({ request }) => {
        const url = new URL(request.url);

        const projectId = url.searchParams.get("id");

        return HttpResponse.json([
          {
            id: "1",
            name: "add task details",
            status: "Todo",
            priority: "Medium",
            label: "Feature",
            createdAt: "2024-08-18T16:30:34.131Z",
            updatedAt: "2024-08-18T16:30:34.131Z",
            projectId,
            userId: "1",
          },
        ]);
      }),
    ];

    server.use(...handlers);

    await render(<TasksStats />);

    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(screen.getByText("In Progress")).toBeInTheDocument();

    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("should render links", async () => {
    const handlers = [
      http.get("/tasks", ({ request }) => {
        const url = new URL(request.url);

        const projectId = url.searchParams.get("id");

        return HttpResponse.json([
          {
            id: "1",
            name: "add task details",
            status: "Todo",
            priority: "Medium",
            label: "Feature",
            createdAt: "2024-08-18T16:30:34.131Z",
            updatedAt: "2024-08-18T16:30:34.131Z",
            projectId,
            userId: "1",
          },
        ]);
      }),
    ];

    server.use(...handlers);

    await render(<TasksStats />);

    expect(
      screen.getByRole("link", { name: /Completed/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /In Progress/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Total/i })).toBeInTheDocument();
  });
});
