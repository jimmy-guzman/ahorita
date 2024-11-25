import "@testing-library/jest-dom/vitest";
import type { ResponsiveContainerProps } from "recharts";

import { server } from "./mocks/server";

vi.mock("zustand");

vi.mock("recharts", async () => {
  const OriginalModule =
    await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: ResponsiveContainerProps) => {
      return (
        <OriginalModule.ResponsiveContainer width={800} height={800}>
          {children}
        </OriginalModule.ResponsiveContainer>
      );
    },
  };
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
