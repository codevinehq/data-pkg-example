import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notesQueries } from "../../api/note/hooks";
import { Heading, Link } from "../../components/Typography";
import { ButtonLink } from "../../components/Button";
import { CreateNoteForm } from "../CreateNote/CreateNote";
import { notesApi } from "../../api/note/api";
import { useState } from "react";
import { Input } from "../../components/Form";
import { invalidateByTags } from "../../api";
import { Spinner } from "../../components/Icons";

export const Notes = () => {
  const queryClient = useQueryClient();
  const { mutate, submittedAt } = useMutation({
    mutationFn: notesApi.create.call,
    onSuccess() {
      // Update the notes list
      queryClient.invalidateQueries({
        predicate: invalidateByTags(notesApi.getAll.tags),
      });
    },
  });
  const [search, setSearch] = useState("");
  const {
    data: notes,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    ...notesQueries.getAll({
      queryParams: { search },
    }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return null;
  if (isError) return <>Error loading notes...</>;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading level={1}>Notes</Heading>
        <ButtonLink to="/create">Create note</ButtonLink>
      </div>

      <label htmlFor="search" className="sr-only">
        Filter notes
      </label>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter notes..."
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isFetching && <Spinner />}
      </div>

      <ul>
        {notes?.map((note) => (
          <li>
            <Link to={`/${note.id}`}>
              <h2>{note.title}</h2>
            </Link>
          </li>
        ))}
        {notes?.length === 0 && <li>No notes found</li>}
      </ul>

      <CreateNoteForm key={submittedAt} onSubmit={(body) => mutate({ body })} />
    </section>
  );
};
