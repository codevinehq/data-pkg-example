/* eslint-disable @typescript-eslint/no-explicit-any */

export type SimpleServiceArgs = Record<string, string>;

export type ComplexServiceArgs = {
  urlParams?: Record<string, string>;
  queryParams?: ConstructorParameters<typeof URLSearchParams>[0];
  body?: any;
};

export type ServiceArgs<T extends SimpleServiceArgs | ComplexServiceArgs> =
  T extends SimpleServiceArgs
    ? { url: string; urlParams: T }
    : { url: string } & T;

export type InferServiceArgs<TArgs extends ComplexServiceArgs, TResult> = (
  args: TArgs
) => Promise<TResult> | TResult;

export const createService = <
  const TU,
  const TT,
  TC extends (args: any) => any
>({
  url,
  tags,
  call,
}: {
  url: TU;
  tags?: TT;
  call: TC;
}) => ({
  url,
  tags: tags as TT extends readonly string[] ? Required<TT> : never,
  call: (args: Omit<Parameters<TC>[0], "url">): ReturnType<TC> =>
    call({ url, ...args }),
});
