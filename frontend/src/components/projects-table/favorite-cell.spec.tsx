import { render, screen } from "@/testing/utils";

import { ProjectFavoriteCell } from "./favorite-cell";

describe("<ProjectFavoriteCell />", () => {
  it("should render favorite", async () => {
    await render(<ProjectFavoriteCell isFavorite />);

    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  it("should render not favorite", async () => {
    await render(<ProjectFavoriteCell isFavorite={false} />);

    expect(screen.getByText("Not favorite")).toBeInTheDocument();
  });
});
