import { http, HttpResponse } from "msw";
import { createNoteMock } from "../api/note/mocks";
import { CreateNoteSchema } from "../api/note/schema";
import { seed } from "@ngneat/falso";
import { api } from "../api";

seed("42");

const defaults = [
  createNoteMock({}),
  createNoteMock({}),
  createNoteMock({}),
  createNoteMock({}),
];

let mockNotes = structuredClone(defaults);

export const resetMockNotes = () => {
  mockNotes = structuredClone(defaults);
};

export const getMockNotes = () => {
  return mockNotes;
};

export const handlers = [
  http.get(api.notes.get.url, ({ params }) => {
    const { noteId } = params;
    return HttpResponse.json(mockNotes.find((n) => n.id === noteId));
  }),
  http.get(api.notes.getAll.url, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    if (search) {
      return HttpResponse.json(
        mockNotes.filter((n) =>
          n.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return HttpResponse.json(mockNotes);
  }),
  http.post(api.notes.create.url, async ({ request }) => {
    const newNote = CreateNoteSchema.safeParse(await request.json());

    if (!newNote.success) {
      return HttpResponse.json(newNote.error.flatten(), { status: 400 });
    }

    mockNotes.push({ ...newNote.data, id: crypto.randomUUID() });

    return HttpResponse.json(newNote, { status: 201 });
  }),
  http.put(api.notes.edit.url, async ({ request, params }) => {
    const { noteId } = params;
    const newNote = CreateNoteSchema.safeParse(await request.json());
    const existingNote = mockNotes.find((n) => n.id == noteId);

    if (!existingNote) {
      return HttpResponse.json({}, { status: 404 });
    }

    if (!newNote.success) {
      return HttpResponse.json(newNote.error.flatten(), { status: 400 });
    }

    Object.assign(existingNote, newNote.data);

    return HttpResponse.json(existingNote, { status: 200 });
  }),
];
