import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/node";
import { resetMockNotes } from "./mocks/handlers";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  server.resetHandlers();
  resetMockNotes();
});

afterAll(() => {
  server.close();
});
