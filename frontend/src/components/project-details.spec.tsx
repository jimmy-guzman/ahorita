import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { ProjectDetails } from "./project-details";

describe("<ProjectDetails />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/projects/1", () => {
        return HttpResponse.json({
          id: "1",
          name: "Revamp Testing Suite",
          description: "",
          isFavorite: false,
          isDone: false,
          createdAt: "2024-08-25T16:54:05.991Z",
          updatedAt: "2024-08-25T16:54:05.991Z",
          userId: "1",
        });
      }),
    ];

    server.use(...handlers);

    await render(<ProjectDetails />, {
      path: "/_auth/projects/$projectId",
      initialEntries: ["/_auth/projects/1"],
    });

    const heading = screen.getByRole("heading", {
      name: "Revamp Testing Suite",
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});
