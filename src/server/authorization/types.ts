export interface UserSession {
  sessionId: string;
  userId: string;
}

export enum UserTokenValidationError {
  BadTokenFormat = "bad-token-format",
  Expired = "expired",
  NoSession = "no-session",
}

export type UserTokenValidationResult =
  | {
      valid: true;
      userSession: UserSession;
    }
  | {
      valid: false;
      error: UserTokenValidationError;
    };

export interface UserToken {
  /**
   * A function which will validate the token that was
   * provided.
   */
  validate: () => Promise<UserTokenValidationResult>;
}

export interface AuthorizationCookie {
  /**
   * The current authorization token stored in the cookie, if
   * one was provided.
   *
   * NOTE: Just because there is a value here doesn't mean that
   * it's been authenticated or that it's valid. In order to
   * determine that the user is actually authenticated, you'll
   * need to {@link UserToken.validate} the token.
   */
  current: UserToken | null;

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
