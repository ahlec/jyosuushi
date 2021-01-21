import { GraphQLResolveInfo } from "graphql";

import {
  RemoveCounterFromCollectionResult,
  RemoveCounterFromCollectionResponse,
  MutationAddCounterToCollectionArgs,
} from "@server/graphql.generated";

import { ServerContext } from "@server/context";

import { COUNTER_IDS } from "@server/modules/counter-collections/counter-ids.data";

import { getCollection } from "./utils";

export async function removeCounterFromCollection(
  parent: unknown,
  args: MutationAddCounterToCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<RemoveCounterFromCollectionResponse> {
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
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorRateLimited,
    };
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorNotAuthenticated,
    };
  }

  // Retrieve the collection being referenced
  const collection = await getCollection(prisma, args.collectionId, userToken);
  if (!collection) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorCollectionDoesNotExist,
    };
  }

  // Validate that the counter being referenced is valid
  if (!COUNTER_IDS.has(args.counterId)) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorCounterDoesNotExist,
    };
  }

  // Check to make sure that the counter is in the collection
  const existingEntry = collection.entries.find(
    (entry): boolean => entry.counterId === args.counterId
  );
  if (!existingEntry) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorNotInCollection,
    };
  }

  // Remove the counter from the collection
  try {
    await prisma.userCounterCollectionEntry.delete({
      where: {
        collectionId_counterId: {
          collectionId: args.collectionId,
          counterId: args.counterId,
        },
      },
    });
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.Success,
    };
  } catch (e) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: RemoveCounterFromCollectionResult.ErrorCouldNotRemove,
    };
  }
}
