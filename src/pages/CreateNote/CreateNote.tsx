import { useIsMutating, useMutation } from "@tanstack/react-query";
import type { CreateNote as CreateNoteInput } from "../../api/note/schema";
import { CreateNoteSchema } from "../../api/note/schema";
import { Button } from "../../components/Button";
import { Label, Input, Textarea } from "../../components/Form";
import { Heading } from "../../components/Typography";
import { notesApi } from "../../api/note/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

export const CreateNoteForm = ({
  onSubmit,
}: {
  onSubmit: (body: CreateNoteInput) => void;
}) => {
  const isMutating = useIsMutating();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = CreateNoteSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    onSubmit(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input required minLength={5} type="text" name="title" id="title" />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea required minLength={5} name="content" id="content"></Textarea>
      </div>
      <div>
        <Button disabled={!!isMutating} type="submit">
          Create note
        </Button>
      </div>
    </form>
  );
};

export const CreateNote = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: notesApi.create.call,
    onSuccess({ id }) {
      toast.success("Note created");
      navigate(`/${id}`);
    },
  });

  return (
    <section className="space-y-6">
      <Heading level={1}>Create Note</Heading>
      <CreateNoteForm onSubmit={(body) => mutate({ body })} />
    </section>
  );
};
