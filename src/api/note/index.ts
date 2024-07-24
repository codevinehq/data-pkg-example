import ms from "ms";
import { type ServiceArgs, createQueryService, createService } from "../helpers/createService";
import { jsonFetch } from "../helpers/jsonFetch";
import type {
	CreateNote,
	FavouriteNote,
	Note,
	NoteParams,
	NoteSearchParams,
	Notes,
} from "./schema";

export const notesService = {
	getAll: createQueryService({
		url: "/notes",
		tags: ["notes"] as const,
		call: (url, args: ServiceArgs<{ searchParams?: NoteSearchParams }>) =>
			jsonFetch<Notes>({ url, ...args }),
	}),
	get: createQueryService({
		url: "/notes/:noteId",
		tags: ["notes"] as const,
		call: (url, args: ServiceArgs<NoteParams>) => jsonFetch<Note>({ url, ...args }),
		queryDefaults: { staleTime: ms("5m") },
	}),
	create: createService({
		url: "/notes",
		call: (url, args: ServiceArgs<{ body: CreateNote }>) =>
			jsonFetch<Note>({
				...args,
				url,
				method: "POST",
				body: JSON.stringify(args.body),
			}),
	}),
	edit: createService({
		url: "/notes/:noteId",
		call: (url, args: ServiceArgs<{ urlParams: NoteParams; body: Partial<CreateNote> }>) =>
			jsonFetch<Note>({
				...args,
				url,
				method: "PUT",
				body: JSON.stringify(args.body),
			}),
	}),
	favourite: createService({
		url: "/notes/:noteId/favourite",
		call: (url, args: ServiceArgs<{ urlParams: NoteParams; body: FavouriteNote }>) =>
			jsonFetch<Note>({ ...args, url, method: "POST", body: JSON.stringify(args.body) }),
	}),
};
