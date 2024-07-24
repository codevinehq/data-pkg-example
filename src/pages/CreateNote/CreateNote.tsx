import { useIsMutating, useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import type { CreateNote as CreateNoteInput } from "../../api/note/schema";
import { CreateNoteSchema } from "../../api/note/schema";
import { Button } from "../../components/Button";
import { Input, Label, Textarea } from "../../components/Form";
import { Heading } from "../../components/Typography";

export const CreateNoteForm = ({
	onSubmit,
}: {
	onSubmit: (body: CreateNoteInput) => void;
}) => {
	const isMutating = useIsMutating();
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
				<Textarea required minLength={5} name="content" id="content" />
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
		mutationFn: api.notes.create.call,
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
