import { Query } from "@tanstack/react-query";
import { dequal } from "dequal";
import { createUrlWithParams } from "./helpers/createUrlWithParams";

import { CreateQueryInput } from "./helpers/createQuery";

export const invalidateByTags = (tags: readonly string[]) => (query: Query) =>
  tags.every((tag) => query.queryKey.includes(tag));

export const invalidateByUrlParams =
  <TUrlParams extends Record<string, string>, TArgs extends any[], TResult>(
    _: CreateQueryInput<TUrlParams, TArgs, TResult>,
    urlParams: TUrlParams
  ) =>
  (query: Query) =>
    query.queryKey.some((qk) => dequal(qk, urlParams));

export const invalidateByUrl =
  <TUrlParams extends Record<string, string>, TArgs extends any[], TResult>(
    { url }: CreateQueryInput<TUrlParams, TArgs, TResult>,
    urlParams: TUrlParams
  ) =>
  (query: Query) =>
    query.queryKey[0] === createUrlWithParams(url, urlParams || {});
