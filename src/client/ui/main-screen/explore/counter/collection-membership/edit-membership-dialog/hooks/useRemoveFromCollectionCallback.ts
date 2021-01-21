import { Reference } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useState } from "react";

import {
  RemoveCounterFromCollectionResult,
  useRemoveCounterFromCollectionMutation,
} from "@jyosuushi/graphql/types.generated";

type RemoveFromCollectionFn = (collectionId: string) => Promise<void>;

export type RedirectLocation = "profile" | "explore-landing-page";

interface HookResults {
  /**
   * The callback that can be invoked to remove the specified counter from the
   * given collection.
   */
  callback: RemoveFromCollectionFn;

  /**
   * The specified location that the modal should redirect to, if one or more
   * invocations of the callback triggered an error that should be handled with
   * redirection.
   */
  redirectRequest: RedirectLocation | null;
}

const COLLECTION_COUNTERS_FRAGMENT = gql`
  fragment CollectionCounters on UserCounterCollection {
    counterIds
    dateLastUpdated
  }
`;

interface CollectionCountersFragment {
  counterIds: readonly string[];
  dateLastUpdated: Date;
}

function useRemoveFromCollectionCallback(counterId: string): HookResults {
  // Define hook state
  const [
    redirectRequest,
    setRedirectRequest,
  ] = useState<RedirectLocation | null>(null);

  // Connect with GraphQL
  const [
    removeCounterFromCollectionMutation,
  ] = useRemoveCounterFromCollectionMutation({
    update: (cache, { data }): void => {
      if (
        !data ||
        data.removeCounterFromCollection.result !==
          RemoveCounterFromCollectionResult.Success
      ) {
        return;
      }

      cache.modify({
        fields: {
          userCounterCollections: (
            currentRefs: readonly Reference[] = []
          ): readonly Reference[] => {
            const cacheId = `UserCounterCollection:${data.removeCounterFromCollection.collectionId}`;
            const collectionFrag = cache.readFragment<CollectionCountersFragment | null>(
              {
                fragment: COLLECTION_COUNTERS_FRAGMENT,
                id: cacheId,
              }
            );
            if (!collectionFrag) {
              return currentRefs;
            }

            const updatedCollection: CollectionCountersFragment = {
              counterIds: collectionFrag.counterIds.filter(
                (collectionCounterId): boolean =>
                  collectionCounterId !==
                  data.removeCounterFromCollection.counterId
              ),
              dateLastUpdated: new Date(),
            };

            cache.writeFragment({
              data: updatedCollection,
              fragment: COLLECTION_COUNTERS_FRAGMENT,
              id: cacheId,
            });

            return currentRefs;
          },
        },
      });
    },
  });

  // Create a wrapper function to act as the callback
  const callback = useCallback(
    async (collectionId: string): Promise<void> => {
      const result = await removeCounterFromCollectionMutation({
        variables: {
          collectionId,
          counterId,
        },
      });

      if (!result.data) {
        return;
      }

      switch (result.data.removeCounterFromCollection.result) {
        case RemoveCounterFromCollectionResult.Success:
        case RemoveCounterFromCollectionResult.ErrorCollectionDoesNotExist:
        case RemoveCounterFromCollectionResult.ErrorRateLimited:
        case RemoveCounterFromCollectionResult.ErrorNotInCollection:
        case RemoveCounterFromCollectionResult.ErrorCouldNotRemove: {
          return;
        }
        case RemoveCounterFromCollectionResult.ErrorCounterDoesNotExist: {
          setRedirectRequest("explore-landing-page");
          return;
        }
        case RemoveCounterFromCollectionResult.ErrorNotAuthenticated: {
          setRedirectRequest("profile");
          return;
        }
      }
    },
    [removeCounterFromCollectionMutation, counterId]
  );

  // Return the public API
  return {
    callback,
    redirectRequest,
  };
}

export default useRemoveFromCollectionCallback;
