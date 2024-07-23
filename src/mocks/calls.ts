import { http, HttpResponse } from "msw";
import { createNoteMock } from "../api/note/mocks";
import { CreateNoteSchema } from "../api/note/schema";
import { api } from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockOpts<T extends (args: any) => any> = Parameters<T>[0];
type CreateNoteMockInput = MockOpts<typeof createNoteMock>;

export const getNote = (input: CreateNoteMockInput) =>
  http.get(api.notes.get.url, () => {
    return HttpResponse.json(createNoteMock(input));
  });

export const getAllNotes = (input: CreateNoteMockInput[]) =>
  http.get(api.notes.get.url, () => {
    return HttpResponse.json(input.map(createNoteMock));
  });

export const createNote = (input: CreateNoteMockInput) =>
  http.post(api.notes.create.url, async ({ request }) => {
    const body = await request.json();
    const data = CreateNoteSchema.safeParse(body);

    if (data.error) {
      return HttpResponse.json(data.error.flatten(), { status: 400 });
    }

    return HttpResponse.json(createNoteMock(input));
  });
