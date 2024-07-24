/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryOptions } from "@tanstack/react-query";
import { createUrlWithParams } from "./createUrlWithParams";

// biome-ignore lint/suspicious/noExplicitAny:
type ArgsFn = (args: any) => any;

export type SimpleServiceArgs = Record<string, string>;

export type ComplexServiceArgs = {
	urlParams?: Record<string, string>;
	searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
	// biome-ignore lint/suspicious/noExplicitAny:
	body?: any;
};

export type ServiceArgs<T extends SimpleServiceArgs | ComplexServiceArgs> =
	T extends SimpleServiceArgs ? { url: string; urlParams: T } : { url: string } & T;

export type InferServiceArgs<TArgs extends ComplexServiceArgs, TResult> = (
	args: TArgs,
) => Promise<TResult> | TResult;

type Service<TUrl extends string, TTags, TFn extends ArgsFn> = {
	url: TUrl;
	tags?: TTags;
	call: TFn;
};

export const createService = <const TUrl extends string, const TTags, TFn extends ArgsFn>({
	url,
	tags,
	call,
}: Service<TUrl, TTags, TFn>) => ({
	url,
	tags: tags as TTags extends readonly string[] ? Required<TTags> : never,
	call: (args: Omit<Parameters<TFn>[0], "url">): ReturnType<TFn> => call({ url, ...args }),
});

export const createQueryService = <const TUrl extends string, const TTags, TFn extends ArgsFn>({
	url,
	tags,
	call,
	queryDefaults,
}: Service<TUrl, TTags, TFn> & {
	queryDefaults?: { staleTime?: number; cacheTime?: number; enabled?: boolean };
}) => ({
	...createService({ url, tags, call }),
	query: (args: Omit<Parameters<TFn>[0], "url">) =>
		queryOptions({
			queryKey: [
				createUrlWithParams(url, args.urlParams ?? {}),
				...(Array.isArray(tags) ? tags : []),
				args.urlParams,
				args.searchParams,
			] as const,
			queryFn: (): Awaited<ReturnType<TFn>> => call({ ...args, url }),
			...queryDefaults,
		}),
});
