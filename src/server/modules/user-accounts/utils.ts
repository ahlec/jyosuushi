import { addDays } from "date-fns";

import { AuthorizationCookie } from "@server/authorization/types";
import { PrismaDataSource } from "@server/datasources/PrismaDataSource";

function getUserSessionExpiration(): Date {
  return addDays(Date.now(), 7);
}

export async function logInUser(
  userId: string,
  authCookie: AuthorizationCookie,
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
