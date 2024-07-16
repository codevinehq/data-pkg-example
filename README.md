# Data Example

## Files

### [Notes](src/pages/Notes/Notes.tsx)

- useQuery
- useMutation with [invalidate by tags](src/pages/Notes/Notes.tsx#L16) (similar to queryKeyFactory) `invalidateByTags(notesApi.getAll.tags)`
- Form with invalidation

### [Note](src/pages/Note/Note.tsx)

- useQuery with urlParams
- useMutation with single endpoint invalidation
- - Example 1: [Refetch](src/pages/Note/Note.tsx#L34)
- - Example 2: [Invalidate by params](src/pages/Note/Note.tsx#L38) `invalidateByUrlParams(notesApi.get, { noteId: id! })`
- - Example 3: [Invalidate by url](src/pages/Note/Note.tsx#L43) `invalidateByUrl(notesApi.get, { noteId: id! })`

### [Create Note](src/pages/CreateNote/CreateNote.tsx)

- useMutation with [typesafe onSuccess redirect](src/pages/CreateNote/CreateNote.tsx#L50)
- Form with toast

