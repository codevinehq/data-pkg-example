/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryOptions } from "@tanstack/react-query";
import { createUrlWithParams } from "./createUrlWithParams";

export type SimpleServiceArgs = Record<string, string>;

export type ComplexServiceArgs = {
	urlParams?: Record<string, string>;
	searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
	// biome-ignore lint/suspicious/noExplicitAny:
	body?: Array<Record<string, any>> | Record<string, any>;
};

export type ServiceArgs<T extends SimpleServiceArgs | ComplexServiceArgs> =
	T extends SimpleServiceArgs ? { urlParams: T } : T;

export type InferServiceArgs<TUrl extends string, TArgs extends ComplexServiceArgs, TResult> = (
	url: TUrl,
	args: TArgs,
) => Promise<TResult>;

type Service<TUrl extends string, TTags, TArgs extends ComplexServiceArgs, TResult> = {
	url: TUrl;
	tags?: TTags;
	call: InferServiceArgs<TUrl, TArgs, TResult>;
};

export const createService = <
	const TUrl extends string,
	const TTags,
	TArgs extends ComplexServiceArgs,
	TResult,
>({
	url,
	tags,
	call,
}: Service<TUrl, TTags, TArgs, TResult>) => ({
	url,
	tags: tags as TTags extends readonly string[] ? Required<TTags> : never,
	call: (args: TArgs) => call(url, args),
});

export const createQueryService = <
	const TUrl extends string,
	const TTags,
	TArgs extends ComplexServiceArgs,
	TResult,
>({
	url,
	tags,
	call,
	queryDefaults,
}: Service<TUrl, TTags, TArgs, TResult> & {
	queryDefaults?: { staleTime?: number; cacheTime?: number; enabled?: boolean };
}) => ({
	...createService({ url, tags, call }),
	query: (args: TArgs) =>
		queryOptions({
			queryKey: [
				createUrlWithParams(url, args.urlParams ?? {}),
				...(Array.isArray(tags) ? tags : []),
				args.urlParams,
				args.searchParams,
			] as const,
			queryFn: () => call(url, args),
			...queryDefaults,
		}),
});
