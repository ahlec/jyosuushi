import { PrismaClient } from "@prisma/client";
import { isFuture } from "date-fns";
import { validate as uuidValidate } from "uuid";

import { UserTokenValidationError, UserTokenValidation } from "./types";

export async function validateSessionById(
  rawTokenValue: string,
  prismaClient: PrismaClient
): Promise<UserTokenValidation> {
  /**
   * Validate the format of the token value before we even begin to
   * look at the contents.
   */
  if (!uuidValidate(rawTokenValue)) {
    return {
      error: UserTokenValidationError.BadTokenFormat,
      valid: false,
    };
  }

  /**
   * Find the session with this ID in the database.
   */
  const activeSession = await prismaClient.activeUserSession.findOne({
    where: {
      id: rawTokenValue,
    },
  });
  if (!activeSession) {
    return {
      error: UserTokenValidationError.NoSessionExists,
      valid: false,
    };
  }

  /**
   * Check to see if the session has expired (and if it has, remove it from the
   * database).
   */
  if (!isFuture(activeSession.expiration)) {
    await prismaClient.activeUserSession.delete({
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
    sessionId: activeSession.id,
    userId: activeSession.userId,
    valid: true,
  };
}
