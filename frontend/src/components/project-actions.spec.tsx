import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { ProjectActions } from "./project-actions";

describe("<ProjectActions />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/projects/1", () => {
        return HttpResponse.json({
          id: "1",
          name: "Revamp Testing Suite",
          description: "",
          isFavorite: false,
          status: "In Progress",
          createdAt: "2024-08-25T16:54:05.991Z",
          updatedAt: "2024-08-25T16:54:05.991Z",
          userId: "1",
        });
      }),
      http.get("/metadata", () => {
        return HttpResponse.json({
          labels: [],
          priorities: [],
          statuses: [],
          projectStatuses: ["In Progress", "Done"],
        });
      }),
    ];

    server.use(...handlers);

    await render(<ProjectActions />, {
      path: "/(authenticated)/projects/$projectId",
      initialEntries: ["/(authenticated)/projects/1"],
    });

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
