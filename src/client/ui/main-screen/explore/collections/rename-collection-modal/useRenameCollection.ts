import { Reference } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";
import { defineMessages } from "react-intl";

import {
  MAX_COLLECTION_NAME_LENGTH,
  MIN_COLLECTION_NAME_LENGTH,
} from "@shared/constants";

import {
  RenameCollectionResult,
  useRenameCollectionMutation,
} from "@jyosuushi/graphql/types.generated";

import { CollectionNameFormError } from "@jyosuushi/ui/main-screen/explore/components/collection-name-form/CollectionNameForm";

const INTL_MESSAGES = defineMessages({
  errorNameIncorrectLength: {
    defaultMessage:
      "The name of a collection must be between {minLength} and {maxLength} characters.",
    id: "explore.collections.useRenameCollection.errors.nameIncorrectLength",
  },
  errorNotAuthenticated: {
    defaultMessage:
      "Only authenticated users are able to use custom collections. Please log in or register and try again.",
    id: "explore.collections.useRenameCollection.errors.notAuthenticated",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to rename this collection too many times recently. Please wait a few minutes before trying again.",
    id: "explore.collections.useRenameCollection.errors.rateLimited",
  },
  unknownError: {
    defaultMessage:
      "An error has occurred and the collection couldn't be rename. Please try again in a few minutes.",
    id: "explore.collections.useRenameCollection.errors.unknown",
  },
});

const COLLECTION_NAME_FRAGMENT = gql`
  fragment CollectionCounters on UserCounterCollection {
    dateLastUpdated
    name
  }
`;

interface CollectionNameFragment {
  dateLastUpdated: Date;
  name: string;
}

interface HookOptions {
  onError: (error: CollectionNameFormError) => void;
  onSuccess: () => void;
}

type HookResult = (name: string) => Promise<void>;

function useRenameCollection(
  collectionId: string,
  { onError, onSuccess }: HookOptions
): HookResult {
  // Connect with the backend
  const [renameCollectionMutation] = useRenameCollectionMutation({
    update: (cache, { data }): void => {
      if (
        !data ||
        data.renameCollection.result !== RenameCollectionResult.Success
      ) {
        return;
      }

      cache.modify({
        fields: {
          userCounterCollections: (
            currentRefs: readonly Reference[] = []
          ): readonly Reference[] => {
            const cacheId = `UserCounterCollection:${data.renameCollection.collectionId}`;
            const collectionFrag = cache.readFragment<CollectionNameFragment | null>(
              {
                fragment: COLLECTION_NAME_FRAGMENT,
                id: cacheId,
              }
            );
            if (!collectionFrag) {
              return currentRefs;
            }

            const updatedCollection: CollectionNameFragment = {
              dateLastUpdated: new Date(),
              name: data.renameCollection.name,
            };

            cache.writeFragment({
              data: updatedCollection,
              fragment: COLLECTION_NAME_FRAGMENT,
              id: cacheId,
            });

            return currentRefs;
          },
        },
      });
    },
  });

  // Create the public function that will invoke the backend and process the
  // results.
  return useCallback(
    async (name: string): Promise<void> => {
      try {
        const result = await renameCollectionMutation({
          variables: {
            collectionId,
            name,
          },
        });

        if (!result.data) {
          onError({
            message: INTL_MESSAGES.unknownError,
            messageValues: {},
          });
          return;
        }

        switch (result.data.renameCollection.result) {
          case RenameCollectionResult.ErrorRateLimited: {
            onError({
              message: INTL_MESSAGES.errorRateLimited,
              messageValues: {},
            });
            return;
          }
          case RenameCollectionResult.ErrorNotAuthenticated: {
            onError({
              message: INTL_MESSAGES.errorNotAuthenticated,
              messageValues: {},
            });
            return;
          }
          case RenameCollectionResult.ErrorNameMissingOrEmpty:
          case RenameCollectionResult.ErrorNameTooShort:
          case RenameCollectionResult.ErrorNameTooLong: {
            onError({
              message: INTL_MESSAGES.errorNameIncorrectLength,
              messageValues: {
                maxLength: MAX_COLLECTION_NAME_LENGTH,
                minLength: MIN_COLLECTION_NAME_LENGTH,
              },
            });
            return;
          }
          case RenameCollectionResult.ErrorCollectionDoesNotExist:
          case RenameCollectionResult.ErrorCouldNotRename: {
            onError({
              message: INTL_MESSAGES.unknownError,
              messageValues: {},
            });
            return;
          }
          case RenameCollectionResult.Success: {
            onSuccess();
            return;
          }
          default: {
            // This will only produce a TypeScript error if you haven't
            // handled one of the possible enum values in the switch
            // statement.
            return result.data.renameCollection.result;
          }
        }
      } catch {
        onError({
          message: INTL_MESSAGES.unknownError,
          messageValues: {},
        });
      }
    },
    [collectionId, renameCollectionMutation, onError, onSuccess]
  );
}

export default useRenameCollection;
