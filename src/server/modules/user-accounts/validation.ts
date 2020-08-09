import { validate as validateEmailFormat } from "email-validator";

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
