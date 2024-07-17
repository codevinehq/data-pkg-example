/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR from "swr";

export const useSWRService =
  <TFn extends (args: { urlParams: any; queryParams: any; body: any }) => any>({
    url,
    call,
  }: {
    url: string;
    call: TFn;
  }) =>
  (args: Parameters<TFn>[0]) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSWR(
      [url, args.urlParams, args.queryParams],
      (): ReturnType<TFn> => call(args)
    );
