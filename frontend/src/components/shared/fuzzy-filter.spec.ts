import type { Row } from "@tanstack/react-table";

import { fuzzyFilter } from "./fuzzy-filter";

describe("fuzzyFilter", () => {
  it("should return passed", () => {
    const isPassed = fuzzyFilter(
      { getValue: vi.fn() } as unknown as Row<unknown>,
      "apple",
      "fruit",
      vi.fn(),
    );

    expect(isPassed).toBe(false);
  });
});
