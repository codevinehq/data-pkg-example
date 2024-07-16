import { createQuery } from "../helpers/createQuery";

import { notesApi } from "./api";

export const notesQueries = {
  getNote: createQuery(notesApi.getNote),
  getNotes: createQuery(notesApi.getNotes),
} satisfies Record<keyof typeof notesApi & `get${string}`, unknown>;
