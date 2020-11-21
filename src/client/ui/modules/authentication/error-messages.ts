import { defineMessages, MessageDescriptor } from "react-intl";

import { MIN_PASSWORD_LENGTH } from "@shared/constants";

const INTL_MESSAGES = defineMessages({
  errorEmailBadFormat: {
    defaultMessage: "This should be an email.",
    id: "authentication.errors.emailBadFormat",
  },
  errorFieldEmpty: {
    defaultMessage: "This field must be specified.",
    id: "authentication.errors.fieldEmpty",
  },
  errorPasswordMissingNumeral: {
    defaultMessage:
      "Your password must have at least one numerical character (0-9).",
    id: "authentication.errors.passwordMissingNumeral",
  },
  errorPasswordTooShort: {
    defaultMessage:
      "Your password must be at least {minLength, plural, one {1 character} other {# characters}} long.",
    id: "authentication.errors.passwordTooShort",
  },
  errorPasswordsDontMatch: {
    defaultMessage: "Passwords do not match.",
    id: "authentication.errors.passwordsDontMatch",
  },
  errorUnknownError: {
    defaultMessage:
      "An error occurred while trying to process your request. Please try again in a moment.",
    id: "authentication.errors.unknown",
  },
});

export interface ErrorMessageDefinition {
  message: MessageDescriptor;
  messageValues?: Record<string, unknown>;
}

export const ERROR_MESSAGE_PASSWORD_TOO_SHORT: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorPasswordTooShort,
  messageValues: {
    minLength: MIN_PASSWORD_LENGTH,
  },
};

export const ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorPasswordMissingNumeral,
};

export const ERROR_MESSAGE_UNKNOWN_ERROR: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorUnknownError,
};

export const ERROR_MESSAGE_EMAIL_DOESNT_LOOK_LIKE_EMAIL: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorEmailBadFormat,
};

export const ERROR_MESSAGE_FIELD_EMPTY: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorFieldEmpty,
};

export const ERROR_MESSAGE_PASSWORDS_DONT_MATCH: ErrorMessageDefinition = {
  message: INTL_MESSAGES.errorPasswordsDontMatch,
};
