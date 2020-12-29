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

import { CreateCollectionFormError } from "./types";

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
  onError: (error: CreateCollectionFormError) => void;
  onSuccess: (collection: UserCounterCollection) => void;
}

type HookResult = (name: string) => Promise<void>;

function useCreateCollection({ onError, onSuccess }: HookOptions): HookResult {
  // Connect with the backend
  const [
    createCounterCollectionMutation,
  ] = useCreateCounterCollectionMutation();

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
