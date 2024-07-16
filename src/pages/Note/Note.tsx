import { useQuery } from "@tanstack/react-query";
import { notesQueries } from "../../api/note/hooks";
import { useParams } from "react-router-dom";
import { Heading } from "../../components/Typography";
import { DefaultLayout } from "../../layouts/Default";

export const Note = () => {
  const { id } = useParams();
  const { data: note, isLoading } = useQuery(
    notesQueries.getNote({ noteId: id! })
  );

  if (isLoading) return null;
  if (!note) return <>Note not found</>;

  return (
    <DefaultLayout>
      <section className="space-y-4">
        <Heading level={1}>{note.title}</Heading>
        <p>{note.content}</p>
      </section>
    </DefaultLayout>
  );
};
