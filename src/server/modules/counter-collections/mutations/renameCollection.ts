import { GraphQLResolveInfo } from "graphql";

import {
  MAX_COLLECTION_NAME_LENGTH,
  MIN_COLLECTION_NAME_LENGTH,
} from "@shared/constants";

import {
  RenameCollectionResponse,
  RenameCollectionResult,
  MutationRenameCollectionArgs,
} from "@server/graphql.generated";

import { ServerContext } from "@server/context";

import { coerceCollectionName, getCollection } from "./utils";

export async function renameCollection(
  parent: unknown,
  args: MutationRenameCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<RenameCollectionResponse> {
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
      name: args.name,
      result: RenameCollectionResult.ErrorRateLimited,
    };
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorNotAuthenticated,
    };
  }

  // Retrieve the collection being referenced
  const collection = await getCollection(prisma, args.collectionId, userToken);
  if (!collection) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorCollectionDoesNotExist,
    };
  }

  // Validate incoming name
  const name = coerceCollectionName(args.name);
  if (!name) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorNameMissingOrEmpty,
    };
  }

  if (name.length < MIN_COLLECTION_NAME_LENGTH) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorNameTooShort,
    };
  }

  if (name.length > MAX_COLLECTION_NAME_LENGTH) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorNameTooLong,
    };
  }

  // Create the collection
  try {
    await prisma.userCounterCollection.update({
      data: {
        dateLastUpdated: new Date(),
        name,
      },
      where: {
        id: collection.id,
      },
    });
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.Success,
    };
  } catch (e) {
    return {
      collectionId: args.collectionId,
      name: args.name,
      result: RenameCollectionResult.ErrorCouldNotRename,
    };
  }
}
