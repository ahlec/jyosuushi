import { useMemo } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";

import {
  MAX_COLLECTION_NAME_LENGTH,
  MIN_COLLECTION_NAME_LENGTH,
} from "@jyosuushi/constants";

const INTL_MESSAGES = defineMessages({
  errorFieldRequired: {
    defaultMessage: "The name of the new collection is required.",
    id:
      "explore.components.collection-name-form.useCollectionNameValidation.errors.fieldRequred",
  },
  errorInvalidLength: {
    defaultMessage:
      "Counter collection names must be between {minLength} and {maxLength} characters long.",
    id:
      "explore.component.collection-name-form.useCollectionNameValidation.errors.invalidLength",
  },
});

export type ValidationResult =
  | {
      valid: true;
      name: string;
    }
  | {
      valid: false;
      message: MessageDescriptor;
      messageValues: Record<string, unknown>;
    };

function useCollectionNameValidation(rawName: string): ValidationResult {
  return useMemo((): ValidationResult => {
    // Trim the current value to remove front/back whitespace
    const name = rawName.trim();

    // Check to make sure it isn't empty
    if (!name) {
      return {
        message: INTL_MESSAGES.errorFieldRequired,
        messageValues: {},
        valid: false,
      };
    }

    // Check to make sure that it's the right length
    if (
      name.length < MIN_COLLECTION_NAME_LENGTH ||
      name.length > MAX_COLLECTION_NAME_LENGTH
    ) {
      return {
        message: INTL_MESSAGES.errorInvalidLength,
        messageValues: {
          maxLength: MAX_COLLECTION_NAME_LENGTH,
          minLength: MIN_COLLECTION_NAME_LENGTH,
        },
        valid: false,
      };
    }

    // The value is valid
    return {
      name,
      valid: true,
    };
  }, [rawName]);
}

export default useCollectionNameValidation;
