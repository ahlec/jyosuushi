import { Reference } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";
import { defineMessages } from "react-intl";

import {
  MAX_COLLECTION_NAME_LENGTH,
  MIN_COLLECTION_NAME_LENGTH,
} from "@shared/constants";

import {
  CreateCounterCollectionError,
  useCreateCounterCollectionMutation,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import { CollectionNameFormError } from "@jyosuushi/ui/modules/explore/components/collection-name-form/CollectionNameForm";

const INTL_MESSAGES = defineMessages({
  errorNameIncorrectLength: {
    defaultMessage:
      "The name of a collection must be between {minLength} and {maxLength} characters.",
    id:
      "explore.landing.create-collection-modal.useCreateCollection.errors.nameIncorrectLength",
  },
  errorNotAuthenticated: {
    defaultMessage:
      "Only authenticated users are able to create custom collections. Please log in or register and try again.",
    id:
      "explore.landing.create-collection-modal.useCreateCollection.errors.notAuthenticated",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to create a collection too many times recently. Please wait a few minutes before trying again.",
    id:
      "explore.landing.create-collection-modal.useCreateCollection.errors.rateLimited",
  },
  unknownError: {
    defaultMessage:
      "An error has occurred and the collection couldn't be created. Please try again in a few minutes.",
    id:
      "explore.landing.create-collection-modal.useCreateCollection.errors.unknown",
  },
});

interface HookOptions {
  onError: (error: CollectionNameFormError) => void;
  onSuccess: (collection: UserCounterCollection) => void;
}

type HookResult = (name: string) => Promise<void>;

const NEW_COLLECTION_FRAGMENT = gql`
  fragment NewUserCounterCollection on UserCounterCollection {
    id
    name
    counterIds
    dateCreated
    dateLastUpdated
  }
`;

function useCreateCollection({ onError, onSuccess }: HookOptions): HookResult {
  // Connect with the backend
  const [createCounterCollectionMutation] = useCreateCounterCollectionMutation({
    update: (cache, { data }): void => {
      if (!data) {
        return;
      }

      const { collection, error } = data.createCounterCollection;
      if (error || !collection) {
        return;
      }

      cache.modify({
        fields: {
          userCounterCollections: (
            currentRefs: readonly Reference[] = [],
            { readField }
          ): readonly Reference[] => {
            const newCollectionRef = cache.writeFragment({
              data: collection,
              fragment: NEW_COLLECTION_FRAGMENT,
            });

            if (
              !newCollectionRef ||
              currentRefs.some((ref) => readField("id", ref) === collection.id)
            ) {
              return currentRefs;
            }

            return [...currentRefs, newCollectionRef];
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
        const result = await createCounterCollectionMutation({
          variables: {
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

        const { collection, error } = result.data.createCounterCollection;
        if (error) {
          switch (error) {
            case CreateCounterCollectionError.RateLimited: {
              onError({
                message: INTL_MESSAGES.errorRateLimited,
                messageValues: {},
              });
              return;
            }
            case CreateCounterCollectionError.NotAuthenticated: {
              onError({
                message: INTL_MESSAGES.errorNotAuthenticated,
                messageValues: {},
              });
              return;
            }
            case CreateCounterCollectionError.NameMissingOrEmpty:
            case CreateCounterCollectionError.NameTooShort:
            case CreateCounterCollectionError.NameTooLong: {
              onError({
                message: INTL_MESSAGES.errorNameIncorrectLength,
                messageValues: {
                  maxLength: MAX_COLLECTION_NAME_LENGTH,
                  minLength: MIN_COLLECTION_NAME_LENGTH,
                },
              });
              return;
            }
            case CreateCounterCollectionError.CouldNotCreate: {
              onError({
                message: INTL_MESSAGES.unknownError,
                messageValues: {},
              });
              return;
            }
            default: {
              // This will only produce a TypeScript error if you haven't
              // handled one of the possible enum values in the switch
              // statement.
              return error;
            }
          }
        }

        if (!collection) {
          onError({
            message: INTL_MESSAGES.unknownError,
            messageValues: {},
          });
          return;
        }

        onSuccess(collection);
      } catch {
        onError({
          message: INTL_MESSAGES.unknownError,
          messageValues: {},
        });
      }
    },
    [createCounterCollectionMutation, onError, onSuccess]
  );
}

export default useCreateCollection;
