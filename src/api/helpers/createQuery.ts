/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryOptions } from "@tanstack/react-query";
import { ComplexServiceArgs } from "./createService";

export const createQuery =
  <
    const TU,
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
      call: (args: TArgs) => Promise<TResult> | TResult;
    },
    options?: { staleTime?: number; cacheTime?: number; enabled?: boolean }
  ) =>
  (args: TArgs) =>
    queryOptions({
      queryKey: [
        url,
        ...(tags || []),
        args.urlParams,
        args.queryParams,
      ] as const,
      queryFn: () => call({ url, ...args }),
      ...options,
    });
