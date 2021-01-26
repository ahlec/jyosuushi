import {
  PrismaClient,
  UserCounterCollection,
  UserCounterCollectionEntry,
} from "@prisma/client";

import { UserSession } from "@server/authentication/types";

type DbUserCollection = UserCounterCollection & {
  entries: readonly UserCounterCollectionEntry[];
};

export async function getCollection(
  prisma: PrismaClient,
  collectionId: string,
  user: UserSession
): Promise<DbUserCollection | null> {
  if (!collectionId) {
    return null;
  }

  const collection = await prisma.userCounterCollection.findUnique({
    include: {
      entries: true,
    },
    where: {
      id: collectionId,
    },
  });
  if (!collection) {
    return null;
  }

  if (collection.userId !== user.userId) {
    return null;
  }

  return collection;
}

export function coerceCollectionName(rawName: string): string {
  if (!rawName) {
    return "";
  }

  return rawName.trim();
}
