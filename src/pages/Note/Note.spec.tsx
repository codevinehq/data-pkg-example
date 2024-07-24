import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { Notes } from "../../api/note/schema";
import { getMockNotes, handlers } from "../../mocks/handlers";
import { server } from "../../mocks/node";
import { render, screen } from "../../test-utils";
import { Note } from "./Note";

const setup = (mockNotes: Notes) => {
	server.use(...handlers);

	return render(
		<MemoryRouter initialEntries={[`/${mockNotes[0]?.id}`]}>
			<Routes>
				<Route path="/:id" element={<Note />} />
			</Routes>
		</MemoryRouter>,
	);
};

describe("Page - Note", () => {
	it("should render a note", async () => {
		const mockNotes = getMockNotes();

		setup(mockNotes);

		expect(await screen.findByRole("button", { name: "Edit" })).toBeVisible();
		expect(screen.getByRole("heading", { name: mockNotes[0]?.title })).toBeVisible();
		expect(screen.getByText(mockNotes[0]?.content || "")).toBeVisible();
	});

	it("should allow the user to edit a note", async () => {
		const mockNotes = getMockNotes();

		const { user } = setup(mockNotes);

		await user.click(await screen.findByRole("button", { name: "Edit" }));
		expect(await screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();

		// Fill form
		await user.type(await screen.findByLabelText("Title"), "!!!");
		await user.type(await screen.findByLabelText("Content"), "!!!");
		await user.click(screen.getByRole("button", { name: "Update" }));

		// New content
		expect(await screen.findByRole("button", { name: "Edit" })).toBeVisible();
		expect(screen.getByRole("heading", { name: /!!!$/ })).toBeVisible();
		expect(screen.getByRole("paragraph").textContent).toEqual(expect.stringContaining("!!!"));
	});
});
