import { GraphQLResolveInfo } from "graphql";

import {
  DeleteCollectionResponse,
  DeleteCollectionResult,
  MutationDeleteCollectionArgs,
} from "@server/graphql.generated";

import { ServerContext } from "@server/context";

import { getCollection } from "./utils";

export async function deleteCollection(
  parent: unknown,
  args: MutationDeleteCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<DeleteCollectionResponse> {
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
        max: 10,
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
      result: DeleteCollectionResult.ErrorRateLimited,
    };
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return {
      collectionId: args.collectionId,
      result: DeleteCollectionResult.ErrorNotAuthenticated,
    };
  }

  // Retrieve the collection being referenced
  const collection = await getCollection(prisma, args.collectionId, userToken);
  if (!collection) {
    return {
      collectionId: args.collectionId,
      result: DeleteCollectionResult.ErrorCollectionDoesNotExist,
    };
  }

  // Create the collection
  try {
    await prisma.userCounterCollectionEntry.deleteMany({
      where: {
        collectionId: collection.id,
      },
    });
    await prisma.userCounterCollection.delete({
      where: {
        id: collection.id,
      },
    });
    return {
      collectionId: args.collectionId,
      result: DeleteCollectionResult.Success,
    };
  } catch (e) {
    return {
      collectionId: args.collectionId,
      result: DeleteCollectionResult.ErrorCouldNotDelete,
    };
  }
}
