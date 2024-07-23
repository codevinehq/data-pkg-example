import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Heading, Link } from "../../components/Typography";
import { ButtonLink } from "../../components/Button";
import { CreateNoteForm } from "../CreateNote/CreateNote";
import { useState } from "react";
import { Input } from "../../components/Form";
import { invalidateByTags } from "../../api/helpers/invalidators";
import { Spinner } from "../../components/Icons";
import { api } from "../../api";

export const Notes = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const {
    data: notes,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    ...api.notes.getAll.query({ searchParams: { search } }),
    placeholderData: keepPreviousData,
  });
  const { mutate, submittedAt } = useMutation({
    mutationFn: api.notes.create.call,
    onSuccess() {
      // Update the notes list
      queryClient.invalidateQueries({
        predicate: invalidateByTags(api.notes.getAll.tags),
      });
    },
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
