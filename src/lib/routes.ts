const notes = () => "/" as const;
// eslint-disable-next-line @typescript-eslint/ban-types
const note = (id: ":id" | (string & {})) => `/${id}` as const;
const create = () => "/create" as const;

export const routes = {
	notes,
	note,
	create,
} as const;
