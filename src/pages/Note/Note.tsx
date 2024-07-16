import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesQueries } from "../../api/note/hooks";
import { useParams } from "react-router-dom";
import { Heading } from "../../components/Typography";
import { DefaultLayout } from "../../layouts/Default";
import { FormEvent, useState } from "react";
import { Input, Textarea } from "../../components/Form";
import { Button } from "../../components/Button";
import { notesApi } from "../../api/note/api";
import {
  CreateNote,
  CreateNoteSchema,
  NoteParams,
} from "../../api/note/schema";
import toast from "react-hot-toast";
import { invalidateByUrl, invalidateByUrlParams } from "../../api";

export const Note = () => {
  const [editMode, setEditMode] = useState(false);
  // const queryClient = useQueryClient();
  const { id } = useParams();
  const {
    data: note,
    isLoading,
    refetch,
  } = useQuery(notesQueries.get({ noteId: id! }));
  const { mutate } = useMutation({
    mutationFn: (body: Partial<CreateNote>) =>
      notesApi.edit.call({ noteId: id! }, body),
    onSuccess() {
      toast.success("Note updated");
      setEditMode(false);
      // Option 1: Refetch
      refetch();

      // Option 2: invalidate by params
      // queryClient.invalidateQueries({
      //   predicate: invalidateByUrlParams(notesApi.get, { noteId: id! }),
      // });

      // Option 3: invalidate by url
      // queryClient.invalidateQueries({
      //   predicate: invalidateByUrl(notesApi.get, { noteId: id! }),
      // });
    },
  });

  if (isLoading) return null;
  if (!note) return <>Note not found</>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = CreateNoteSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    mutate(data);
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <section className="space-y-4">
          <Heading level={1}>
            {editMode ? (
              <Input name="title" defaultValue={note.title} />
            ) : (
              note.title
            )}
          </Heading>
          {editMode ? (
            <Textarea name="content" defaultValue={note.content} />
          ) : (
            <p>{note.content}</p>
          )}
          <div>
            {editMode ? (
              <Button type="submit">Update</Button>
            ) : (
              <Button
                key="edit"
                type="button"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </section>
      </form>
    </DefaultLayout>
  );
};
