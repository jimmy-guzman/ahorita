import "@testing-library/jest-dom";

import { server } from "./mocks/server";

vi.mock("zustand");

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
