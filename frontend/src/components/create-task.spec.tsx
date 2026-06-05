import { HttpResponse, http } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { CreateTask } from "./create-task";

const metadata = { labels: ["Feature"], priorities: ["Medium"], statuses: [] };
const projects = [{ id: "p1", name: "My Project" }];

describe("<CreateTask />", () => {
  it("shows empty state when there are no projects", async () => {
    server.use(
      http.get("/metadata", () => HttpResponse.json(metadata)),
      http.get("/projects", () => HttpResponse.json([])),
    );

    const { user } = await render(<CreateTask />, {
      path: "/(authenticated)/tasks/",
    });

    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(
      screen.getByRole("heading", { name: "Create Task", level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "You need a project before creating a task.",
    );

    expect(
      screen.getByRole("link", { name: "Create a project" }),
    ).toBeInTheDocument();

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("shows the form when projects exist", async () => {
    server.use(
      http.get("/metadata", () => HttpResponse.json(metadata)),
      http.get("/projects", () => HttpResponse.json(projects)),
    );

    const { user } = await render(<CreateTask />, {
      path: "/(authenticated)/tasks/",
    });

    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(
      screen.getByRole("heading", { name: "Create Task", level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Project")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
