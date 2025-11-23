import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { TasksHistory } from "./tasks-history";

describe("<TasksHistory />", () => {
  it("should render", async () => {
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

    await render(<TasksHistory />, {
      path: "/(authenticated)/projects/$projectId",
      initialEntries: ["/(authenticated)/projects/1/"],
    });

    const heading = screen.getByRole("heading", {
      name: "History",
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
