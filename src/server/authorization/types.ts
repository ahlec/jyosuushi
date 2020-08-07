export interface UserSession {
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
