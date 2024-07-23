import { PartialDeep } from "type-fest";
import { Note } from "./schema";
import { randSentence, randUuid, randWord } from "@ngneat/falso";

export const createNoteMock = (opts?: PartialDeep<Note>): Note => ({
  id: randUuid(),
  title: randWord({ length: 5 }).join(" "),
  content: randSentence(),
  ...opts,
});
