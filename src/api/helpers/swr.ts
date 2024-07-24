/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR from "swr";
import type { ComplexServiceArgs, InferServiceArgs } from "./createService";

export const useSWRService = <TArgs extends ComplexServiceArgs, TResult>(
	{
		url,
		call,
	}: {
		url: string;
		call: InferServiceArgs<TArgs, TResult>;
	},
	args: TArgs,
) => useSWR([url, args.urlParams, args.searchParams], () => call(args));
