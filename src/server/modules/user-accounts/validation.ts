import { validate as validateEmailFormat } from "email-validator";
import { validate as uuidValidate } from "uuid";

import {
  PasswordValidationError,
  validatePassword as validatePasswordInternal,
} from "@shared/authentication";

export function validateEmail<TEmpty, TInvalidFormat>(
  str: string,
  errorValues: {
    empty: TEmpty;
    invalidFormat: TInvalidFormat;
  }
): TEmpty | TInvalidFormat | null {
  if (!str) {
    return errorValues.empty;
  }

  if (!validateEmailFormat(str)) {
    return errorValues.invalidFormat;
  }

  return null;
}

function validateUuidCode<TEmpty, TInvalidFormat>(
  str: string,
  errorValues: {
    empty: TEmpty;
    invalidFormat: TInvalidFormat;
  }
): TEmpty | TInvalidFormat | null {
  if (!str) {
    return errorValues.empty;
  }

  if (!uuidValidate(str)) {
    return errorValues.invalidFormat;
  }

  return null;
}

export const validateEmailVerificationCode = validateUuidCode;
export const validatePasswordResetCode = validateUuidCode;

export function validatePassword<TTooShort, TMissingNumeral>(
  str: string,
  errorValues: {
    tooShort: TTooShort;
    missingNumeral: TMissingNumeral;
  }
): TTooShort | TMissingNumeral | null {
  const error = validatePasswordInternal(str);
  if (!error) {
    return null;
  }

  switch (error) {
    case PasswordValidationError.TooShort: {
      return errorValues.tooShort;
    }
    case PasswordValidationError.MissingNumeral: {
      return errorValues.missingNumeral;
    }
  }
}
