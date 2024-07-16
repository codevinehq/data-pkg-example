import { queryOptions } from "@tanstack/react-query";

import { createUrlWithParams } from "./createUrlWithParams";

export type CreateQueryInput<
  TUrlParams extends Record<string, string>,
  TArgs extends any[],
  TResult
> = {
  url: string;
  tags?: readonly string[];
  call: (urlParams: TUrlParams, ...args: TArgs) => Promise<TResult> | TResult;
};

export function createQuery<
  TUrlParams extends Record<string, string>,
  TArgs extends any[],
  TResult
>(
  { url, call, tags = [] }: CreateQueryInput<TUrlParams, TArgs, TResult>,
  options: { staleTime?: number } = {}
) {
  return (urlParams: TUrlParams, ...args: TArgs) =>
    queryOptions({
      queryKey: [
        createUrlWithParams(url, urlParams),
        ...tags,
        urlParams,
        ...args,
      ],
      queryFn: () => call(urlParams, ...args),
      ...options,
    });
}
