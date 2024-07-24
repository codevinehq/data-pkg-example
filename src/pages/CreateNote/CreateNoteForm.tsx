import { useIsMutating } from "@tanstack/react-query";
import type { FormEvent } from "react";
import type { CreateNote as CreateNoteInput } from "../../api/note/schema";
import { CreateNoteSchema } from "../../api/note/schema";
import { Button } from "../../components/Button";
import { Input, Label, Textarea } from "../../components/Form";

export const CreateNoteForm = ({
	onSubmit,
	isSubmitting,
}: {
	onSubmit: (body: CreateNoteInput) => void;
	isSubmitting?: boolean;
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
				<Button disabled={!!isMutating || isSubmitting} type="submit">
					Create note
				</Button>
			</div>
		</form>
	);
};
