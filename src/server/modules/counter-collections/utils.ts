import {
  UserCounterCollection as PrismaUserCounterCollection,
  UserCounterCollectionEntry as PrismaUserCounterCollectionEntry,
} from "@prisma/client";

import { UserCounterCollection } from "@server/graphql.generated";

type PrismaUserCollection = PrismaUserCounterCollection & {
  entries: readonly PrismaUserCounterCollectionEntry[];
};

export function convertPrismaUserCollectionToGql(
  prismaCollection: PrismaUserCollection
): UserCounterCollection {
  return {
    counterIds: prismaCollection.entries.map(
      (entry): string => entry.counterId
    ),
    dateCreated: prismaCollection.dateCreated,
    dateLastUpdated:
      prismaCollection.dateLastUpdated || prismaCollection.dateCreated,
    id: prismaCollection.id,
    name: prismaCollection.name,
  };
}
