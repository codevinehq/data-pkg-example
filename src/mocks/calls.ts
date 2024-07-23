import { http, HttpResponse } from "msw";
import { notesApi } from "../api/note/api";
import { createNoteMock } from "../api/note/mocks";
import { CreateNoteSchema } from "../api/note/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockOpts<T extends (args: any) => any> = Parameters<T>[0];
type CreateNoteMockInput = MockOpts<typeof createNoteMock>;

export const getNote = (input: CreateNoteMockInput) =>
  http.get(notesApi.get.url, () => {
    return HttpResponse.json(createNoteMock(input));
  });

export const getAllNotes = (input: CreateNoteMockInput[]) =>
  http.get(notesApi.get.url, () => {
    return HttpResponse.json(input.map(createNoteMock));
  });

export const createNote = (input: CreateNoteMockInput) =>
  http.post(notesApi.create.url, async ({ request }) => {
    const body = await request.json();
    const data = CreateNoteSchema.safeParse(body);

    if (data.error) {
      return HttpResponse.json(data.error.flatten(), { status: 400 });
    }

    return HttpResponse.json(createNoteMock(input));
  });
