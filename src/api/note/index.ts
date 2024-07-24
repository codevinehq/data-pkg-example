import ms from "ms";
import { type ServiceArgs, createQueryService, createService } from "../helpers/createService";
import { jsonFetch } from "../helpers/jsonFetch";
import type { CreateNote, Note, NoteParams, NoteSearchParams, Notes } from "./schema";

export const notesService = {
	getAll: createQueryService({
		url: "/notes",
		tags: ["notes"] as const,
		call: (args: ServiceArgs<{ searchParams?: NoteSearchParams }>) => jsonFetch<Notes>(args),
		queryDefaults: { staleTime: ms("5m") },
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
		call: (args: ServiceArgs<{ urlParams: NoteParams; body: Partial<CreateNote> }>) =>
			jsonFetch<Note>({
				...args,
				method: "PUT",
				body: JSON.stringify(args.body),
			}),
	}),
};
