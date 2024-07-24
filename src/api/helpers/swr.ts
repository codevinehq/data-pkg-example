/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR from "swr";
import type { ComplexServiceArgs, InferServiceArgs } from "./createService";

export const useSWRService = <TUrl extends string, TArgs extends ComplexServiceArgs, TResult>(
	{
		url,
		call,
	}: {
		url: TUrl;
		call: InferServiceArgs<TUrl, TArgs, TResult>;
	},
	args: TArgs,
) => useSWR([url, args.urlParams, args.searchParams], () => call(url, args));
