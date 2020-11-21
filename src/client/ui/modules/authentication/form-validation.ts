import {
  PasswordValidationError,
  validatePassword,
} from "@shared/authentication";

import { AuthFormFieldValidation } from "@jyosuushi/ui/modules/authentication/auth-form/types";
import {
  ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
  ERROR_MESSAGE_PASSWORD_TOO_SHORT,
  ERROR_MESSAGE_PASSWORDS_DONT_MATCH,
} from "@jyosuushi/ui/modules/authentication/error-messages";

export function makePasswordCreationFieldValidation<
  TPasswordFieldName extends string
>(
  field: TPasswordFieldName
): (fields: Record<TPasswordFieldName, string>) => AuthFormFieldValidation {
  return (values): AuthFormFieldValidation => {
    const error = validatePassword(values[field]);
    if (!error) {
      return {
        valid: true,
      };
    }

    switch (error) {
      case PasswordValidationError.TooShort: {
        return {
          reason: ERROR_MESSAGE_PASSWORD_TOO_SHORT,
          valid: false,
        };
      }
      case PasswordValidationError.MissingNumeral: {
        return {
          reason: ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
          valid: false,
        };
      }
    }
  };
}

export function makePasswordConfirmationFieldValidation<
  TPasswordFieldName extends string,
  TConfirmFieldName extends string
>(
  passwordField: TPasswordFieldName,
  confirmField: TConfirmFieldName
): (
  fields: Record<TPasswordFieldName | TConfirmFieldName, string>
) => AuthFormFieldValidation {
  return (values): AuthFormFieldValidation => {
    if (values[passwordField] === values[confirmField]) {
      return {
        valid: true,
      };
    }

    return {
      reason: ERROR_MESSAGE_PASSWORDS_DONT_MATCH,
      valid: false,
    };
  };
}
