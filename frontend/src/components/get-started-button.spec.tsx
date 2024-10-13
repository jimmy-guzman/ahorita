import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";
import { GetStartedButton } from "./get-started-button";

describe("<GetStartedButton />", () => {
  it("should render Get Started when user is not logged in", async () => {
    const handlers = [
      http.get("/users/me", () => {
        return HttpResponse.json({});
      }),
    ];

    server.use(...handlers);

    await render(<GetStartedButton />);

    const button = screen.getByRole("link", {
      name: "Get Started",
    });

    expect(button).toBeInTheDocument();
  });

  it("should render Dashboard when user is logged in", async () => {
    const handlers = [
      http.get("/users/me", () => {
        return HttpResponse.json({ user: { username: "jimmy", id: "1" } });
      }),
    ];

    server.use(...handlers);

    await render(<GetStartedButton />);

    const button = screen.getByRole("link", {
      name: "Dashboard",
    });

    expect(button).toBeInTheDocument();
  });
});
