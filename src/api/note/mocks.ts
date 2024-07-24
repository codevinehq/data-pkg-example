import { randSentence, randUuid, randWord } from "@ngneat/falso";
import type { PartialDeep } from "type-fest";
import type { Note } from "./schema";

/**
 * Mock factory for usage in tests or MSW etc.
 */
export const createNoteMock = (opts?: PartialDeep<Note>): Note => ({
	id: randUuid(),
	title: randWord({ length: 5 }).join(" "),
	content: randSentence(),
	isFavourite: false,
	...opts,
});
