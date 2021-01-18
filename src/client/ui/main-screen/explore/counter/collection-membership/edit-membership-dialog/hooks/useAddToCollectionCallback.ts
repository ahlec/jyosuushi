import { Reference } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useState } from "react";

import {
  AddCounterToCollectionResult,
  useAddCounterToCollectionMutation,
} from "@jyosuushi/graphql/types.generated";

type AddToCollectionFn = (collectionId: string) => Promise<void>;

export type RedirectLocation = "profile" | "explore-landing-page";

interface HookResults {
  /**
   * The callback that can be invoked to add the specified counter to the
   * given collection.
   */
  callback: AddToCollectionFn;

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

function useAddToCollectionCallback(counterId: string): HookResults {
  // Define hook state
  const [
    redirectRequest,
    setRedirectRequest,
  ] = useState<RedirectLocation | null>(null);

  // Connect with GraphQL
  const [addCounterToCollectionMutation] = useAddCounterToCollectionMutation({
    update: (cache, { data }): void => {
      if (
        !data ||
        data.addCounterToCollection.result !==
          AddCounterToCollectionResult.Success
      ) {
        return;
      }

      cache.modify({
        fields: {
          userCounterCollections: (
            currentRefs: readonly Reference[] = []
          ): readonly Reference[] => {
            const cacheId = `UserCounterCollection:${data.addCounterToCollection.collectionId}`;
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
              counterIds: [
                ...collectionFrag.counterIds,
                data.addCounterToCollection.counterId,
              ],
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
      const result = await addCounterToCollectionMutation({
        variables: {
          collectionId,
          counterId,
        },
      });

      if (!result.data) {
        return;
      }

      switch (result.data.addCounterToCollection.result) {
        case AddCounterToCollectionResult.Success:
        case AddCounterToCollectionResult.ErrorCollectionDoesNotExist:
        case AddCounterToCollectionResult.ErrorRateLimited:
        case AddCounterToCollectionResult.ErrorAlreadyInCollection:
        case AddCounterToCollectionResult.ErrorCouldNotAdd: {
          return;
        }
        case AddCounterToCollectionResult.ErrorCounterDoesNotExist: {
          setRedirectRequest("explore-landing-page");
          return;
        }
        case AddCounterToCollectionResult.ErrorNotAuthenticated: {
          setRedirectRequest("profile");
          return;
        }
      }
    },
    [addCounterToCollectionMutation, counterId]
  );

  // Return the public API
  return {
    callback,
    redirectRequest,
  };
}

export default useAddToCollectionCallback;
