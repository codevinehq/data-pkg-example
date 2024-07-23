/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryOptions } from "@tanstack/react-query";
import { createUrlWithParams } from "./createUrlWithParams";

export type SimpleServiceArgs = Record<string, string>;

export type ComplexServiceArgs = {
  urlParams?: Record<string, string>;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  body?: any;
};

export type ServiceArgs<T extends SimpleServiceArgs | ComplexServiceArgs> =
  T extends SimpleServiceArgs
    ? { url: string; urlParams: T }
    : { url: string } & T;

export type InferServiceArgs<TArgs extends ComplexServiceArgs, TResult> = (
  args: TArgs
) => Promise<TResult> | TResult;

type Service<TU extends string, TT, TC extends (args: any) => any> = {
  url: TU;
  tags?: TT;
  call: TC;
};

export const createService = <
  const TU extends string,
  const TT,
  TC extends (args: any) => any
>({
  url,
  tags,
  call,
}: Service<TU, TT, TC>) => ({
  url,
  tags: tags as TT extends readonly string[] ? Required<TT> : never,
  call: (args: Omit<Parameters<TC>[0], "url">): ReturnType<TC> =>
    call({ url, ...args }),
});

export const createQueryService = <
  const TU extends string,
  const TT,
  TC extends (args: any) => any
>({
  url,
  tags,
  call,
}: Service<TU, TT, TC>) => {
  const baseService = createService({ url, tags, call });

  return {
    ...baseService,
    query: (args: Omit<Parameters<TC>[0], "url">) =>
      queryOptions({
        queryKey: [
          createUrlWithParams(url, args.urlParams ?? {}),
          ...(Array.isArray(tags) ? tags : []),
          args.urlParams,
          args.searchParams,
        ] as const,
        queryFn: (): Awaited<ReturnType<TC>> => call({ ...args, url }),
      }),
  };
};
