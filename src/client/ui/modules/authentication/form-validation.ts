import {
  PasswordValidationError,
  validatePassword,
} from "@shared/authentication";

import { AuthFormFieldValidation } from "@jyosuushi/ui/modules/authentication/auth-form/types";
import {
  ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
  ERROR_MESSAGE_PASSWORD_TOO_SHORT,
} from "@jyosuushi/ui/modules/authentication/error-messages";

export function validatePasswordCreationField({
  password,
}: {
  password: string;
}): AuthFormFieldValidation {
  const error = validatePassword(password);
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
}
