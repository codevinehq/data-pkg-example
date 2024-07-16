# Data Example

## Files

### [Notes](src/pages/Notes/Notes.tsx)

- useQuery
- useMutation with invalidate by tags (similar to queryKeyFactory) `invalidateByTags(notesApi.getAll.tags)`
- Form with invalidation

### [Note](src/pages/Note/Note.tsx)

- useQuery with urlParams
- useMutation with single endpoint invalidation
- - Example 1: Refetch
- - Example 2: Invalidate by params `invalidateByUrlParams(notesApi.get, { noteId: id! })`
- - Example 3: Invalidate by url `invalidateByUrl(notesApi.get, { noteId: id! })`

### [Create Note](src/pages/CreateNote/CreateNote.tsx)

- useMutation with typesafe onSuccess redirect
- Form with toast

