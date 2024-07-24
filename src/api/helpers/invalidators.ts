import type { Query } from "@tanstack/react-query";
import { dequal } from "dequal";
import { createUrlWithParams } from "./createUrlWithParams";

export const invalidateByTags = (tags: readonly string[]) => (query: Query) =>
	tags.every((tag) => query.queryKey.includes(tag));

type Service<
	TArgs extends {
		urlParams?: Record<string, string>;
	},
	TResult,
> = {
	url: string;
	call: (args: TArgs) => Promise<TResult>;
};

export const invalidateByUrlParams =
	<TArgs extends { urlParams: Record<string, string> }, TResult>(
		_: Service<TArgs, TResult>,
		urlParams: TArgs["urlParams"],
	) =>
	(query: Query) =>
		query.queryKey.some((qk) => dequal(qk, urlParams));

export const invalidateByUrl =
	<TArgs extends { urlParams: Record<string, string> }, TResult>(
		{ url }: Service<TArgs, TResult>,
		urlParams: TArgs["urlParams"],
	) =>
	(query: Query) =>
		query.queryKey[0] === createUrlWithParams(url, urlParams || {});
