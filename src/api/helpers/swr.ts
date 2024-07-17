/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR from "swr";
import { ComplexServiceArgs } from "./createService";

export const useSWRService = <
  const TU,
  const TT extends readonly string[],
  TArgs extends ComplexServiceArgs,
  TResult
>(
  {
    url,
    call,
  }: {
    url: TU;
    tags?: TT;
    call: (args: TArgs) => Promise<TResult> | TResult;
  },
  args: TArgs
) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSWR([url, args.urlParams, args.queryParams], () => call(args));
