import { HttpResponse, http } from "msw";

import { Table } from "@/components/shared/table";
import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";

import { columns } from "./columns";

const baseProject = {
  id: "1",
  name: "Revamp Testing Suite",
  description: "",
  isFavorite: false,
  isDone: false,
  createdAt: "2024-08-25T16:54:05.991Z",
  updatedAt: "2024-08-25T16:54:05.991Z",
  userId: "1",
};

describe("columns", () => {
  it("should have columns", () => {
    expect(columns).toHaveLength(7);
  });

  it("should render every cell", async () => {
    server.use(
      http.get("/projects/:projectId", () => {
        return HttpResponse.json(baseProject);
      }),
    );

    await render(
      <Table
        data={[
          {
            ...baseProject,
            description: "has description",
            isFavorite: true,
            isDone: true,
            taskSummary: { total: 4, completed: 4 },
          },
          {
            ...baseProject,
            id: "2",
            name: "Another Project",
            taskSummary: { total: 0, completed: 0 },
          },
        ]}
        columns={columns}
      />,
      {
        path: "/(authenticated)/projects/",
        initialEntries: ["/(authenticated)/projects/"],
      },
    );

    expect(screen.getByText("Revamp Testing Suite")).toBeInTheDocument();
    expect(screen.getByText("has description")).toBeInTheDocument();
    expect(screen.getByText("No description yet.")).toBeInTheDocument();
  });
});
