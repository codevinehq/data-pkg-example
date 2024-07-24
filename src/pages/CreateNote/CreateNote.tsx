import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { Heading } from "../../components/Typography";
import { CreateNoteForm } from "./CreateNoteForm";

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
