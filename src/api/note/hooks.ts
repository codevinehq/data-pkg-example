import { createQuery } from "../helpers/createQuery";

import { notesApi } from "./api";

export const notesQueries = {
  get: createQuery(notesApi.get),
  getAll: createQuery(notesApi.getAll),
} satisfies Record<keyof typeof notesApi & `get${string}`, unknown>;
