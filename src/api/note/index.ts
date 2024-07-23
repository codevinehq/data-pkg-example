import {
  ServiceArgs,
  createQueryService,
  createService,
} from "../helpers/createService";
import { jsonFetch } from "../helpers/jsonFetch";
import { CreateNote, Note, NoteParams, Notes } from "./schema";

export const notesService = {
  getAll: createQueryService({
    url: "/notes",
    tags: ["notes"] as const,
    call: (args: ServiceArgs<{ searchParams?: { search: string } }>) =>
      jsonFetch<Notes>(args),
  }),
  get: createQueryService({
    url: "/notes/:noteId",
    tags: ["notes"] as const,
    call: (args: ServiceArgs<NoteParams>) => jsonFetch<Note>(args),
  }),
  create: createService({
    url: "/notes",
    call: (args: ServiceArgs<{ body: CreateNote }>) =>
      jsonFetch<Note>({
        ...args,
        method: "POST",
        body: JSON.stringify(args.body),
      }),
  }),
  edit: createService({
    url: "/notes/:noteId",
    call: (
      args: ServiceArgs<{ urlParams: NoteParams; body: Partial<CreateNote> }>
    ) =>
      jsonFetch<Note>({
        ...args,
        method: "PUT",
        body: JSON.stringify(args.body),
      }),
  }),
};
