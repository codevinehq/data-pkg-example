import useSWR from "swr";
import { CreateQueryInput } from "../helpers/createQuery";

export const useSWRService =
  <TUrlParams extends Record<string, string>, TArgs extends any[], TResult>({
    url,
    call,
  }: CreateQueryInput<TUrlParams, TArgs, TResult>) =>
  (...key: Parameters<typeof call>) =>
    useSWR([url, key], ([_, rest]) => call(...rest));
