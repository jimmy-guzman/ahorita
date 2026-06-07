import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";

import { ProjectActions } from "./project-actions";

const project = {
  id: "1",
  name: "Revamp Testing Suite",
  description: "",
  isFavorite: false,
  status: "In Progress" as const,
  createdAt: "2024-08-25T16:54:05.991Z",
  updatedAt: "2024-08-25T16:54:05.991Z",
  userId: "1",
};

describe("<ProjectActions />", () => {
  it("should render", async () => {
    server.use(
      http.get("/projects/:projectId", () => {
        return HttpResponse.json(project);
      }),
      http.get("/metadata", () => {
        return HttpResponse.json({
          labels: [],
          priorities: [],
          statuses: [],
          projectStatuses: ["In Progress", "Done"],
        });
      }),
    );

    await render(
      <ProjectActions
        project={{ ...project, taskSummary: { total: 4, completed: 2 } }}
      />,
      {
        path: "/(authenticated)/projects/",
        initialEntries: ["/(authenticated)/projects/"],
      },
    );

    expect(
      screen.getByRole("button", {
        name: "Open Revamp Testing Suite menu",
      }),
    ).toBeInTheDocument();
  });
});
