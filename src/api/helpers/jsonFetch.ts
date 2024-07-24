import { createUrlWithParams } from "./createUrlWithParams";

export const jsonFetch = <TResult>({
	url,
	urlParams,
	searchParams,
	...options
}: RequestInit & {
	url: string;
	searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
	urlParams?: Record<string, string>;
}) => {
	const formattedUrl = createUrlWithParams(url, urlParams || {});
	const formattedSearchParams = new URLSearchParams(searchParams);

	return fetch(`${formattedUrl}?${formattedSearchParams}`, options).then((res) => {
		if (!res.ok) {
			throw new Error(JSON.stringify(res.json()));
		}

		return res.json() as TResult;
	});
};
