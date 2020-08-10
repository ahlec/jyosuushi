import { UserTokenValidationError } from "./types";

export function isValidationErrorSuspicious(
  error: UserTokenValidationError
): boolean {
  switch (error) {
    case UserTokenValidationError.BadTokenFormat: {
      return true;
    }
    case UserTokenValidationError.NoSessionExists: {
      return true;
    }
    case UserTokenValidationError.Expired: {
      return false;
    }
  }
}
