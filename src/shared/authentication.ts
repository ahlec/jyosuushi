import { MIN_PASSWORD_LENGTH } from "./constants";

export enum PasswordValidationError {
  TooShort = "too-short",
  MissingNumeral = "missing-numeral",
}

const DIGIT_REGEX = /[0-9]/;

export function validatePassword(str: string): PasswordValidationError | null {
  if (str.length < MIN_PASSWORD_LENGTH) {
    return PasswordValidationError.TooShort;
  }

  if (!DIGIT_REGEX.test(str)) {
    return PasswordValidationError.MissingNumeral;
  }

  return null;
}
