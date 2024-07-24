import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "../../api";
import { invalidateByTags } from "../../api/helpers/invalidators";
import { ButtonLink } from "../../components/Button";
import { Input } from "../../components/Form";
import { Spinner } from "../../components/Icons";
import { Heading, Link } from "../../components/Typography";
import { boolAsString } from "../../lib/helpers";
import { CreateNoteForm } from "../CreateNote/CreateNoteForm";

export const Notes = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [favouritesOnly, setFavouritesOnly] = useState<boolean>(false);
	const {
		data: notes,
		isLoading,
		isFetching,
		isError,
	} = useQuery({
		...api.notes.getAll.query({
			searchParams: { search, favouritesOnly: boolAsString(favouritesOnly) },
		}),
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
				<div className="flex items-center gap-4">
					<Heading level={1}>Notes</Heading>
					{isFetching && <Spinner />}
				</div>
				<ButtonLink to="/create">Create note</ButtonLink>
			</div>

			<div className="flex items-center gap-8">
				<div className="flex items-center gap-2">
					<label htmlFor="search" className="sr-only">
						Filter notes
					</label>
					<Input
						placeholder="Filter notes..."
						type="text"
						name="search"
						id="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="flex items-center gap-2">
					<label htmlFor="favs">Only favs</label>
					<Input
						className="w-fit"
						type="checkbox"
						name="favs"
						id="favs"
						checked={favouritesOnly}
						onChange={(e) => setFavouritesOnly(e.target.checked)}
					/>
				</div>
			</div>

			<ul>
				{notes?.map((note) => (
					<li key={note.id}>
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
