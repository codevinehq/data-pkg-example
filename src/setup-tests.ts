import "@testing-library/jest-dom/vitest";
import { resetMockNotes } from "./mocks/handlers";
import { server } from "./mocks/node";

beforeAll(() => {
	server.listen({
		onUnhandledRequest: "error",
	});
});

afterEach(() => {
	server.resetHandlers();
	/**
	 * Restore the original notes mock array
	 * to avoid leaking between tests
	 */
	resetMockNotes();
});

afterAll(() => {
	server.close();
});
