import {
  PrismaClient,
  UserCounterCollection,
  UserCounterCollectionEntry,
} from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

import {
  AddCounterToCollectionResult,
  MutationAddCounterToCollectionArgs,
} from "@server/graphql.generated";

import { UserSession } from "@server/authentication/types";
import { ServerContext } from "@server/context";

import { COUNTER_IDS } from "@server/modules/counter-collections/counter-ids.data";

type DbUserCollection = UserCounterCollection & {
  entries: readonly UserCounterCollectionEntry[];
};

async function getCollection(
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

export async function addCounterToCollection(
  parent: unknown,
  args: MutationAddCounterToCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<AddCounterToCollectionResult> {
  const {
    authCookie: { current: userToken },
    dataSources: { prisma },
    rateLimit,
  } = context;

  // Perform rate limiting
  const rateLimitError = await rateLimit(
    {
      args,
      context,
      info,
      parent,
    },
    {
      identityArgs: [],
      regularWindow: {
        max: 60,
        window: "1m",
      },
      suspiciousRequestWindow: {
        max: 1,
        window: "30m",
      },
    }
  );
  if (rateLimitError) {
    return AddCounterToCollectionResult.ErrorRateLimited;
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return AddCounterToCollectionResult.ErrorNotAuthenticated;
  }

  // Retrieve the collection being referenced
  const collection = await getCollection(prisma, args.collectionId, userToken);
  if (!collection) {
    return AddCounterToCollectionResult.ErrorCollectionDoesNotExist;
  }

  // Validate that the counter being referenced is valid
  if (!COUNTER_IDS.has(args.counterId)) {
    return AddCounterToCollectionResult.ErrorCounterDoesNotExist;
  }

  // Check to make sure that the counter is not already in the collection
  const existingEntry = collection.entries.find(
    (entry): boolean => entry.counterId === args.counterId
  );
  if (existingEntry) {
    return AddCounterToCollectionResult.ErrorAlreadyInCollection;
  }

  // Add the counter to the collection
  try {
    await prisma.userCounterCollectionEntry.create({
      data: {
        collection: {
          connect: {
            id: collection.id,
          },
        },
        counterId: args.counterId,
      },
    });
    return AddCounterToCollectionResult.Success;
  } catch (e) {
    return AddCounterToCollectionResult.ErrorCouldNotAdd;
  }
}
