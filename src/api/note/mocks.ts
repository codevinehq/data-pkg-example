import { randSentence, randUuid, randWord } from "@ngneat/falso";
import type { PartialDeep } from "type-fest";
import type { Note } from "./schema";

export const createNoteMock = (opts?: PartialDeep<Note>): Note => ({
	id: randUuid(),
	title: randWord({ length: 5 }).join(" "),
	content: randSentence(),
	...opts,
});
