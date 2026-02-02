import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { TaskActions } from "./task-actions";

describe("<RowActions />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/metadata", () => {
        return HttpResponse.json({ labels: [], priorities: [], statuses: [] });
      }),
    ];
    server.use(...handlers);

    await render(
      <TaskActions
        task={{
          id: "1",
          name: "add task details",
          status: "Todo",
          priority: "Medium",
          label: "Feature",
          createdAt: "2024-08-18T16:30:34.131Z",
          updatedAt: "2024-08-18T16:30:34.131Z",
          project: {
            id: "1",
            name: "Revamp Testing Suite",
            description: "",
            isFavorite: false,
            isDone: false,
            createdAt: "2024-08-25T16:54:05.991Z",
            updatedAt: "2024-08-25T16:54:05.991Z",
          },
        }}
      />,
      {
        path: "/(authenticated)/projects/$projectId",
        initialEntries: ["/(authenticated)/projects/1"],
      },
    );

    const list = screen.getByRole("button", {
      name: "Open add task details menu",
    });

    expect(list).toBeInTheDocument();
  });
});
