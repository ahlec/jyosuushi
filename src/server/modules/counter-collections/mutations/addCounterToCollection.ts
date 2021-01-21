import { GraphQLResolveInfo } from "graphql";

import {
  AddCounterToCollectionResult,
  AddCounterToCollectionResponse,
  MutationAddCounterToCollectionArgs,
} from "@server/graphql.generated";

import { ServerContext } from "@server/context";

import { COUNTER_IDS } from "@server/modules/counter-collections/counter-ids.data";

import { getCollection } from "./utils";

export async function addCounterToCollection(
  parent: unknown,
  args: MutationAddCounterToCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<AddCounterToCollectionResponse> {
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
      result: AddCounterToCollectionResult.ErrorRateLimited,
    };
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.ErrorNotAuthenticated,
    };
  }

  // Retrieve the collection being referenced
  const collection = await getCollection(prisma, args.collectionId, userToken);
  if (!collection) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.ErrorCollectionDoesNotExist,
    };
  }

  // Validate that the counter being referenced is valid
  if (!COUNTER_IDS.has(args.counterId)) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.ErrorCounterDoesNotExist,
    };
  }

  // Check to make sure that the counter is not already in the collection
  const existingEntry = collection.entries.find(
    (entry): boolean => entry.counterId === args.counterId
  );
  if (existingEntry) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.ErrorAlreadyInCollection,
    };
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
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.Success,
    };
  } catch (e) {
    return {
      collectionId: args.collectionId,
      counterId: args.counterId,
      result: AddCounterToCollectionResult.ErrorCouldNotAdd,
    };
  }
}
