import { addDays } from "date-fns";

import { AuthenticationCookie } from "@server/authentication/types";
import {
  PrismaDataSource,
  DatabaseUser,
} from "@server/datasources/PrismaDataSource";

import { UserAccount } from "@server/graphql.generated";

function getUserSessionExpiration(): Date {
  return addDays(Date.now(), 7);
}

export async function logInUser(
  userId: string,
  authCookie: AuthenticationCookie,
  database: PrismaDataSource
): Promise<void> {
  const session = await database.startUserSession(
    userId,
    getUserSessionExpiration()
  );
  authCookie.set({
    sessionId: session.id,
    userId: session.userId,
  });
}

export function convertDatabaseUserToGraphQLUserAccount(
  user: DatabaseUser
): UserAccount {
  return {
    dateRegistered: user.dateRegistered,
    username: user.email,
  };
}

/**
 * A function that should take some period of time that it would
 * normally take to dispatch an email. This can be used then to
 * counter timing attacks that could try to learn something about
 * users registered in the database by whether or not an email was
 * sent.
 */
export function fakeWaitEmailSending(): Promise<void> {
  const MIN_TIME_MS = 300;
  const MAX_TIME_MS = 600;
  const timeRange =
    MIN_TIME_MS + Math.round(Math.random() * (MAX_TIME_MS - MIN_TIME_MS));
  return new Promise((resolve) => setTimeout(resolve, timeRange));
}