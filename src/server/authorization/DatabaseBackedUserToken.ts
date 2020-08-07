import { PrismaClient } from "@prisma/client";
import { isFuture } from "date-fns";
import { validate as uuidValidate } from "uuid";

import {
  UserToken,
  UserTokenValidationError,
  UserTokenValidationResult,
} from "./types";

class DatabaseBackedUserToken implements UserToken {
  /**
   * If multiple attempts to validate the token are made, we
   * should only validate it one time and then distribute the
   * one result to the multiple places asking for it.
   *
   * Additionally, if someone asks for us to validate the token
   * after we've validated it once already, immediately give them
   * the earlier result.
   */
  private singleValidationPromise: Promise<
    UserTokenValidationResult
  > | null = null;

  public constructor(
    private readonly rawTokenValue: string,
    private readonly prismaClient: PrismaClient
  ) {}

  public validate(): Promise<UserTokenValidationResult> {
    if (!this.singleValidationPromise) {
      this.singleValidationPromise = this.performValidation();
    }

    return this.singleValidationPromise;
  }

  private async performValidation(): Promise<UserTokenValidationResult> {
    /**
     * Validate the format of the token value before we even begin to
     * look at the contents.
     */
    if (!uuidValidate(this.rawTokenValue)) {
      return {
        error: UserTokenValidationError.BadTokenFormat,
        valid: false,
      };
    }

    /**
     * Find the session with this ID in the database.
     */
    const activeSession = await this.prismaClient.activeUserSession.findOne({
      where: {
        id: this.rawTokenValue,
      },
    });
    if (!activeSession) {
      return {
        error: UserTokenValidationError.NoSession,
        valid: false,
      };
    }

    /**
     * Check to see if the session has expired (and if it has, remove it from the
     * database).
     */
    if (!isFuture(activeSession.expiration)) {
      await this.prismaClient.activeUserSession.delete({
        where: {
          id: activeSession.id,
        },
      });

      return {
        error: UserTokenValidationError.Expired,
        valid: false,
      };
    }

    /**
     * There's an active session identified by this UUID, proceed.
     */
    return {
      userSession: {
        userId: activeSession.userId,
      },
      valid: true,
    };
  }
}

export default DatabaseBackedUserToken;
