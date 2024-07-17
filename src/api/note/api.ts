import { ServiceArgs, createService } from "../helpers/createService";
import { mockFetcher } from "../helpers/mockFetcher";
import { CreateNote, Note, NoteParams, Notes } from "./schema";

/**
 * mockFetcher is just a dummy API we would use fetch normally
 * see https://github.com/BenefexLtd/web-onehub-wallet/blob/main/src/api/wallet/user/api.ts#L31-L36
 */

export const notesApi = {
  getAll: createService({
    url: "/notes",
    tags: ["notes"] as const,
    call: (args: ServiceArgs<{ queryParams?: { search: string } }>) =>
      mockFetcher<Notes>(args),
  }),
  get: createService({
    url: "/notes/:noteId",
    tags: ["notes"] as const,
    call: (args: ServiceArgs<NoteParams>) => mockFetcher<Note>(args),
  }),
  create: createService({
    url: "/notes",
    call: ({ url, body }: ServiceArgs<{ body: CreateNote }>) =>
      mockFetcher<Note>({ url, options: { method: "POST", body } }),
  }),
  edit: createService({
    url: "/notes/:noteId",
    call: ({
      url,
      urlParams,
      body,
    }: ServiceArgs<{ urlParams: NoteParams; body: Partial<CreateNote> }>) =>
      mockFetcher<Note>({ url, urlParams, options: { method: "POST", body } }),
  }),
};
