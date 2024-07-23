import { render, screen } from "../../test-utils";
import { CreateNote } from "./CreateNote";
import { server } from "../../mocks/node";
import { createNote } from "../../mocks/calls";
import { createNoteMock } from "../../api/note/mocks";
import { routes } from "../../lib/routes";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Page - Note", () => {
  it("should create a new note", async () => {
    const mockNote = createNoteMock();

    server.use(createNote(mockNote));

    const { user } = render(<CreateNote />);

    await user.type(screen.getByLabelText("Title"), mockNote.title);
    await user.type(screen.getByLabelText("Content"), mockNote.content);
    await user.click(screen.getByRole("button", { name: "Create note" }));

    expect(mockNavigate).toHaveBeenCalledWith(routes.note(mockNote.id));
  });
});