import { NotesSchema } from "../note/schema";

export type SERVICE_BODY = Array<Record<string, any>> | Record<string, any>;
export type SERVICE_ARGS = {
  url: string;
  urlParams?: Record<string, string>;
  queryParams?: ConstructorParameters<typeof URLSearchParams>[0];
  options?: Omit<RequestInit, "body"> & {
    body?: SERVICE_BODY;
    customFetch?: typeof fetch;
  };
};

export const mockFetcher = async <TData>({
  url,
  urlParams,
  options,
}: SERVICE_ARGS): Promise<TData> => {
  const notes = NotesSchema.safeParse(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  if (!notes.success) {
    console.error(
      "Notes are corrupt, please clear localStorage",
      notes.error.flatten()
    );
    throw new Error("Notes are corrupt, please clear localStorage");
  }

  const method = options?.method?.toLowerCase() ?? "get";
  console.log(url, urlParams, options);
  if (url === "/notes" && method === "get") return notes.data as any;
  if (url.startsWith("/notes/") && method === "get")
    return notes.data.find((note) => note.id === urlParams?.noteId) as any;
  if (url.startsWith("/notes/") && method === "post") {
    const note = notes.data.find((note) => note.id === urlParams?.noteId);

    if (!note) throw new Error("Not found");

    Object.assign(note, options?.body);

    localStorage.setItem("notes", JSON.stringify(notes.data));

    return note as any;
  }
  if (url === "/notes" && method === "post") {
    const newNote = {
      id: crypto.randomUUID(),
      ...options?.body,
    };
    localStorage.setItem("notes", JSON.stringify([...notes.data, newNote]));
    return newNote as any;
  }

  throw new Error("Not found");
};
