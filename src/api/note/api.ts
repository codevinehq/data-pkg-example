import { createService } from "../helpers/createServiceHelper";
import { mockFetcher } from "../helpers/mockFetcher";
import { CreateNote, Note, NoteParams, Notes } from "./schema";

export const notesApi = {
  getNotes: createService({
    url: "/notes",
    call: (url: string) => mockFetcher<Notes>({ url }),
    tags: ["notes"] as const,
  }),
  getNote: createService({
    url: "/notes/:noteId",
    call: (url: string, urlParams: NoteParams) =>
      mockFetcher<Note>({ url, urlParams }),
    tags: ["notes"] as const,
  }),
  createNote: createService({
    url: "/notes",
    call: (url: string, body: CreateNote) =>
      mockFetcher<Note>({ url, options: { method: "POST", body } }),
  }),
};
