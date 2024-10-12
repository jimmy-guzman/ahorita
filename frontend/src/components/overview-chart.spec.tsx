import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";

import { OverviewChart } from "./overview-chart";

describe("<OverviewChart />", () => {
  it("should render", async () => {
    const handlers = [
      http.get("/projects/totals", () => {
        return HttpResponse.json([
          {
            id: "1",
            name: "Add Overview Bar Chart",
            Backlog: 0,
            Todo: 1,
            "In Progress": 0,
            Done: 0,
            Canceled: 0,
          },
        ]);
      }),
    ];

    server.use(...handlers);

    await render(<OverviewChart />);

    const button = screen.getByTitle("Overview Bar Chart");

    expect(button).toBeInTheDocument();
  });
});
