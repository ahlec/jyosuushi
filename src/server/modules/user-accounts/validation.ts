import { validate as validateEmailFormat } from "email-validator";
import { validate as uuidValidate } from "uuid";

import { MIN_PASSWORD_LENGTH } from "@shared/constants";

const DIGIT_REGEX = /[0-9]/;

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

export function validateEmailVerificationCode<TEmpty, TInvalidFormat>(
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

export function validatePassword<TEmpty, TTooShort, TMissingNumeral>(
  str: string,
  errorValues: {
    empty: TEmpty;
    tooShort: TTooShort;
    missingNumeral: TMissingNumeral;
  }
): TEmpty | TTooShort | TMissingNumeral | null {
  if (!str) {
    return errorValues.empty;
  }

  if (str.length < MIN_PASSWORD_LENGTH) {
    return errorValues.tooShort;
  }

  if (!DIGIT_REGEX.test(str)) {
    return errorValues.missingNumeral;
  }

  return null;
}
