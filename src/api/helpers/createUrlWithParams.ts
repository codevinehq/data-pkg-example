export const createUrlWithParams = (url: string, params: Record<string, string>) => {
	const allParams: Record<string, string> = { ...params };

	return url.replace(/:([^/]+)/g, (str, match) => {
		if (match in allParams) {
			return allParams[match] ?? "";
		}

		return str;
	});
};
