import { Query } from "@tanstack/react-query";

export const invalidateByTags = (tags: readonly string[]) => (query: Query) =>
  tags.every((tag) => query.queryKey.includes(tag));
