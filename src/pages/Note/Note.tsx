import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { Heading } from "../../components/Typography";
import { FormEvent, useState } from "react";
import { Input, Textarea } from "../../components/Form";
import { Button } from "../../components/Button";
import { notesApi } from "../../api/note/api";
import { CreateNote, CreateNoteSchema } from "../../api/note/schema";
import toast from "react-hot-toast";
import { notesQueries } from "../../api/note/hooks";
// import { invalidateByUrl, invalidateByUrlParams } from "../../api";
// import { useSWRService } from "../../api/helpers/swr";

export const Note = () => {
  const [editMode, setEditMode] = useState(false);
  // const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: note, refetch } = useSuspenseQuery(
    notesQueries.get({ urlParams: { noteId: id! } })
  );
  // useSWR example
  // const { data: note, isLoading } = useSWRService(notesApi.get, {
  //   urlParams: { noteId: id! },
  // });

  const { mutate } = useMutation({
    mutationFn: (body: Partial<CreateNote>) =>
      notesApi.edit.call({ urlParams: { noteId: id! }, body }),
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

      // Option 4: invalidate by query key
      // queryClient.invalidateQueries({
      // queryKey: notesApi.get.query({ urlParams: { noteId: id! } }).queryKey,
      // });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    /**
     * Parse the form input and ensure it matches our defined schema/type
     */
    const data = CreateNoteSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="space-y-4">
        <Heading level={1}>
          {editMode ? (
            <>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <Input id="title" name="title" defaultValue={note.title} />
            </>
          ) : (
            note.title
          )}
        </Heading>
        {editMode ? (
          <>
            <label htmlFor="content" className="sr-only">
              Content
            </label>
            <Textarea id="content" name="content" defaultValue={note.content} />
          </>
        ) : (
          <p>{note.content}</p>
        )}
        <div>
          {editMode ? (
            <Button key="submit" type="submit">
              Update
            </Button>
          ) : (
            <Button key="edit" type="button" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>
      </section>
    </form>
  );
};
