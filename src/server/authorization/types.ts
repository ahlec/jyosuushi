export interface UserSession {
  sessionId: string;
  userId: string;
}

export enum UserTokenValidationError {
  BadTokenFormat = "bad-token-format",
  Expired = "expired",
  NoSessionExists = "no-session-exists",
}

export type UserTokenValidation =
  | ({
      valid: true;
    } & UserSession)
  | {
      valid: false;
      error: UserTokenValidationError;
    };

export interface AuthorizationCookie {
  /**
   * The current authorization token stored in the cookie, if
   * one was provided.
   */
  current: UserTokenValidation | null;

  /**
   * Sets the cookie to the specified user session.
   */
  set: (session: UserSession) => void;

  /**
   * Clears the current cookie of any user session, valid or
   * invalid.
   */
  delete: () => void;
}
