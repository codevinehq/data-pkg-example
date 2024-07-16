import { z } from "zod";

export type NoteParams = {
  noteId: string;
};

export const NoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
});
export type Note = z.infer<typeof NoteSchema>;

export const NotesSchema = z.array(NoteSchema);
export type Notes = z.infer<typeof NotesSchema>;

export const CreateNoteSchema = NoteSchema.pick({ title: true, content: true });
export type CreateNote = z.infer<typeof CreateNoteSchema>;
