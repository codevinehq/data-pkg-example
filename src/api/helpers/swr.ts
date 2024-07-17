/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR from "swr";
import { ComplexServiceArgs, InferServiceArgs } from "./createService";

export const useSWRService = <TArgs extends ComplexServiceArgs, TResult>(
  {
    url,
    call,
  }: {
    url: string;
    call: InferServiceArgs<TArgs, TResult>;
  },
  args: TArgs
) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSWR([url, args.urlParams, args.queryParams], () => call(args));
