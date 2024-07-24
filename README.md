# @benefex/data Proposal

The @benefex/data package builds on the concepts behind both `useApi` and our Redux sagas.

Its primary focus is centralising service creation and types. It will also provide convenience methods for React Query, though this could be expanded to more libs in the future if we migrate away from React Query ([see SWR example](src/pages/Note/Note.tsx#L26)).

## How Will It Work?

### Service Definitions

A service definition is a logical group of endpoints. This might be an entire API (e.g., Alerts) or a subset (e.g., WalletUser). It contains key information to facilitate the creation of data-fetching helpers.

- **url**: The endpoint for the API. `:userId` and `:companyId` are automatically populated from the user's token unless specified in `urlParams` (similar to useApi and Redux).
- **tags**: These form part of the `queryKey` and are used for invalidation ([see invalidators](src/api/helpers/invalidators.ts)).
- **call**: This defines the logic for the service. Its only requirement is a URL; however, other common properties are also typed using the `ServiceArgs` helper.

Example:

```ts
const notesService = {
  get: createQueryService({
    url: "/notes/:noteId",
    tags: ["notes"] as const,
    // urlParams only
    call: (args: ServiceArgs<NoteParams>) => mockFetcher<Note>(args),
    // urlParams and searchParams
    // call: (args: ServiceArgs<{ urlParams: NoteParams, searchParams: NoteQuery }>) => mockFetcher<Note>(args),
  }),
  create: createService({
    url: "/notes",
    call: ({ url, body }: ServiceArgs<{ body: CreateNote }>) =>
      mockFetcher<Note>({ url, options: { method: "POST", body } }),
  }),
};
```

## Example query migration

Everything is typed based on the service definitions, useQuery (including select) and useMutation (including onSuccess etc.) inherit the types automatically. No more generics :tada:

<table>
<tr>
<td>Before</td>
<td>After</td>
</tr>
<tr>
<td>

```ts
import { useApi } from "@benefex/components";
import createRouter from "@benefex/react/utils/api/router/createRouter";
import routes from "store/api/routes";
import type { DiscoverTopic } from "components/FollowTopic/FollowTopic.types";
import { personalisationKeys } from "store/api/queryKeys";

const router = createRouter(routes);

const {
  data: topics = [],
  isLoading
} = useApi<{ content: DiscoverTopic[] }, DiscoverTopic[]>({
  method: "GET",
  options: {
    enabled: false,
    queryKey: personalisationKeys.topics,
    select: ({ content }) => content,
  },
  queryParams: {
    size: "5",
  },
  url: router(["content", "discoverTopics"]),
});
```

</td>
<td>

```ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@benefex/data";

const { data: topics = [], isLoading } = useQuery({
  ...api.content.discoverTopics.query({ queryParams: { size: "5" } }),
  select: ({ content }) => content,
});
```

</td>
</tr>
</table>

## Example mutation migration

It's worth noting that currently mutations are completely untyped and in the migrated version they are fully typed.

![alt text](public/mut-type.png)

<table>
<tr>
<td>Before</td>
<td>After</td>
</tr>
<tr>
<td>

```ts
import { useEffect } from "react";
import { useApi, RQC } from "@benefex/components";
import createRouter from "@benefex/react/utils/api/router/createRouter";
import routes from "store/api/routes";
import { personalisationKeys } from "store/api/queryKeys";
import type { DiscoverTopic } from "./FollowTopic.types";

const router = createRouter(routes);

const followTopic = useApi({
  method: "PUT",
  url: router(["follows", "topic"]),
  urlParams: {
    userId: userId as string,
  },
});

const [isFollowing, setIsFollowing] = useState(topic.isUserFollowing);

useEffect(() => {
  if (followTopic.isSuccess) {
    setIsFollowing(true);
    setToastText("home.feed.topics.successToast");

    setShowToast(true);

    RQC.setQueriesData(personalisationKeys.topics(), (previous: any) => ({
      ...previous,
      content: previous?.content?.map((prevTopic: DiscoverTopic) =>
        prevTopic.id === topic.id
          ? {
              ...topic,
              isUserFollowing: true,
            }
          : prevTopic,
      ),
    }));
  }
}, [followTopic.isSuccess]);

useEffect(() => {
  if (followTopic.isError) {
    setToastText("home.feed.topics.errorToast");
    setShowToast(true);
  }
}, [followTopic.isError]);

const handleClickSubscribe = () => {
  followTopic.callEndpoint({
    id: topic.id,
    name: topic.name,
  });
};

{isFollowing ? <Button>Unfollow</Button> : ...}
```

</td>
<td>

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, invalidateByTags } from "@benefex/data";

const queryClient = useQueryClient();
const followTopic = useMutation({
  mutationFn: () => api.topics.follow.call({
    urlParams: { userId }
  }),
  onSuccess() {
    setIsFollowing(true);
    setToastText("home.feed.topics.successToast");
    setShowToast(true);

    // Return invalidation so isPending stays true until the topic is refetched
    return queryClient.invalidateQueries({
      predicate: invalidateByTags(api.topics.all.tags)
    });
  },
  onError() {
    setToastText("home.feed.topics.errorToast");
    setShowToast(true);
  },
});
const isFollowing = followTopic.isPending || topic.isFollowing;

const handleClickSubscribe = () => {
  followTopic.mutate({ id: topic.id, name: topic.name });
};

{isFollowing ? <Button>Unfollow</Button> : ...}
```

</td>
</tr>
</table>

## Files with examples

### [Notes](src/pages/Notes/Notes.tsx)

- useQuery
- useMutation with [invalidate by tags](src/pages/Notes/Notes.tsx#L29) (similar to queryKeyFactory) `invalidateByTags(notesService.getAll.tags)`
- Form with invalidation
- [Tests using MSW](src/pages/Note/Note.spec.tsx)

### [Note](src/pages/Note/Note.tsx)

- useSuspenseQuery - [Example](src/pages/Note/Note.tsx#L12), [Error handling](src/layouts/Default.tsx#L34), [Global Loader](src/layouts/Default.tsx#L35)
- useMutation with single endpoint invalidation
- - Example 1: [Refetch](src/pages/Note/Note.tsx#L37)
- - Example 2: [Invalidate by params](src/pages/Note/Note.tsx#L40) `invalidateByUrlParams(notesService.get, { noteId: id! })`
- - Example 3: [Invalidate by url](src/pages/Note/Note.tsx#L46) `invalidateByUrl(notesService.get, { noteId: id! })`
- - Example 4: [Invalidate by queryKey](src/pages/Note/Note.tsx#L51) `notesService.get.query({ noteId: id! }).queryKey`

### [Create Note](src/pages/CreateNote/CreateNote.tsx)

- useMutation with [typesafe onSuccess redirect](src/pages/CreateNote/CreateNote.tsx#L12)
- Form with toast
- [Tests using MSW with a mutation](src/pages/CreateNote/CreateNote.spec.tsx#21)

![typesafe onSuccess redirect](public/image2.png)

### [Layout](src/layouts/Default.tsx)

- useQuery with [typed select](src/layouts/Default.tsx#L13)

![typed select](public/image.png)

### [API](src/api/note/index.ts)

Service definitions are not tied to a specific data fetching library. This means they can be used by Redux, RTK, React Query, useSWR or any other lib.

### [Mock Helpers](src/api/note/mocks.ts)

Each service should expose mock factories to help with testing

### [Calls](src/mocks/calls.ts)

Contains MSW helpers built using the api service