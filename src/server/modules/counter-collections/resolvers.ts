/**
 * On new checkouts, you're going to be missing this file. This
 * is autogenerated and therefore not checked into the repository.
 * Generate this file automatically using `yarn gql:codegen`.
 */
import {
  Resolvers,
  StandardCounterCollection,
  UserCounterCollection,
} from "@server/graphql.generated";

import { STANDARD_COLLECTIONS } from "@data/standard-collections";

import { ServerContext } from "@server/context";

type SomeCounterCollection = StandardCounterCollection | UserCounterCollection;

export const COUNTER_COLLECTIONS_RESOLVERS: Resolvers = {
  CounterCollection: {
    __resolveType: (
      obj: SomeCounterCollection
    ): "UserCounterCollection" | "StandardCounterCollection" => {
      if ("dateCreated" in obj) {
        return "UserCounterCollection";
      }

      return "StandardCounterCollection";
    },
  },
  Query: {
    standardCounterCollections: (): StandardCounterCollection[] =>
      STANDARD_COLLECTIONS.map(
        (collection): StandardCounterCollection => ({
          counterIds: [...collection.counterIds],
          dateLastUpdated: new Date(collection.dateLastUpdated),
          id: collection.id,
          name: collection.name,
        })
      ),
    userCounterCollections: async (
      _: unknown,
      _args: unknown,
      {
        authCookie: { current: userToken },
        dataSources: { prisma },
      }: ServerContext
    ): Promise<UserCounterCollection[]> => {
      if (!userToken || !userToken.valid) {
        return [];
      }

      try {
        const collections = await prisma.userCounterCollection.findMany({
          include: {
            entries: true,
          },
          where: {
            userId: userToken.userId,
          },
        });

        return collections.map(
          (collection): UserCounterCollection => ({
            counterIds: collection.entries.map(
              (entry): string => entry.counterId
            ),
            dateCreated: collection.dateCreated,
            dateLastUpdated:
              collection.dateLastUpdated || collection.dateCreated,
            id: collection.id,
            name: collection.name,
          })
        );
      } catch (e) {
        return [];
      }
    },
  },
};
