/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryOptions } from "@tanstack/react-query";
import { ComplexServiceArgs, InferServiceArgs } from "./createService";
import { createUrlWithParams } from "./createUrlWithParams";

export const createQuery =
  <
    const TU extends string,
    const TT extends readonly string[],
    TArgs extends ComplexServiceArgs,
    TResult
  >(
    {
      url,
      tags,
      call,
    }: {
      url: TU;
      tags?: TT;
      call: InferServiceArgs<TArgs, TResult>;
    },
    options?: { staleTime?: number; cacheTime?: number; enabled?: boolean }
  ) =>
  (args: TArgs) =>
    queryOptions({
      /**
       * Create a queryKey based on the defined service url+tags
       * as well as the usage params urlParams+searchParams
       *
       * This allows us to do both broad and granular invalidations
       */
      queryKey: [
        createUrlWithParams(url, args.urlParams ?? {}),
        ...(tags || []),
        args.urlParams,
        args.searchParams,
      ] as const,
      queryFn: () => call({ url, ...args }),
      ...options,
    });
