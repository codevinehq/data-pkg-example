import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesQueries } from "../../api/note/hooks";
import { Heading, Link } from "../../components/Typography";
import { ButtonLink } from "../../components/Button";
import { DefaultLayout } from "../../layouts/Default";
import { CreateNoteForm } from "../CreateNote/CreateNote";
import { notesApi } from "../../api/note/api";
import { invalidateByTags } from "../../api";

export const Notes = () => {
  const queryClient = useQueryClient();
  const { mutate, submittedAt } = useMutation({
    mutationFn: notesApi.createNote.call,
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: invalidateByTags(notesApi.getNotes.tags),
      });
    },
  });
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery(notesQueries.getNotes({}));

  if (isLoading) return null;
  if (isError) return <>Error loading notes...</>;

  return (
    <DefaultLayout>
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <Heading level={1}>Notes</Heading>
          <ButtonLink to="/create">Create note</ButtonLink>
        </div>
        <ul>
          {notes?.map((note) => (
            <li>
              <Link to={`/${note.id}`}>
                <h2>{note.title}</h2>
              </Link>
            </li>
          ))}
          {notes?.length === 0 && <li>No notes</li>}
        </ul>

        <CreateNoteForm key={submittedAt} onSubmit={mutate} />
      </section>
    </DefaultLayout>
  );
};
