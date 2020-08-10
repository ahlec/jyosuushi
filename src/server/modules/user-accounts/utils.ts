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
