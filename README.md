# Data Example

Everything is typed based on the service definitions, useQuery (including select) and useMutation (including onSuccess etc.) inherit the types automatically. No more generics :tada:

## Files

### [Notes](src/pages/Notes/Notes.tsx)

- useQuery
- useMutation with [invalidate by tags](src/pages/Notes/Notes.tsx#L24) (similar to queryKeyFactory) `invalidateByTags(notesApi.getAll.tags)`
- Form with invalidation

### [Note](src/pages/Note/Note.tsx)

- useSuspenseQuery - [Example](src/pages/Note/Note.tsx#L22), [Error handling](src/layouts/Default.tsx#L34), [Global Loader](src/layouts/Default.tsx#L38)
- useMutation with single endpoint invalidation
- - Example 1: [Refetch](src/pages/Note/Note.tsx#L34)
- - Example 2: [Invalidate by params](src/pages/Note/Note.tsx#L37) `invalidateByUrlParams(notesApi.get, { noteId: id! })`
- - Example 3: [Invalidate by url](src/pages/Note/Note.tsx#L42) `invalidateByUrl(notesApi.get, { noteId: id! })`
- - Example 4: [Invalidate by queryKey](src/pages/Note/Note.tsx#L47) `notesQueries.get({ noteId: id! }).queryKey`

### [Create Note](src/pages/CreateNote/CreateNote.tsx)

- useMutation with [typesafe onSuccess redirect](src/pages/CreateNote/CreateNote.tsx#L49)
- Form with toast

![typesafe onSuccess redirect](public/image2.png)

### [Layout](src/layouts/Default.tsx)

- useQuery with [typed select](src/layouts/Default.tsx#L9)

![typed select](public/image.png)

### [API](src/api/note/api.ts)

Service definitions are not tied to a specific data fetching library. This means they can be used by Redux, RTK, React Query, useSWR or any other lib.

- Service definitions
- [Example using useSWR](src/pages/Note/Note.tsx#L24) and the [hook factory](src/api/helpers/swr.ts)

### [Hooks](src/api/note/hooks.ts)

These are query helpers for react query see https://tkdodo.eu/blog/the-query-options-api for an explantion of why we want these instead of explicit hooks such as `useNotes`.

- React query hooks
