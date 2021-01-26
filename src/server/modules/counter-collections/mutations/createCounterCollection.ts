import { GraphQLResolveInfo } from "graphql";

import {
  MAX_COLLECTION_NAME_LENGTH,
  MIN_COLLECTION_NAME_LENGTH,
} from "@shared/constants";

import {
  CreateCounterCollectionError,
  CreateCounterCollectionResult,
  MutationCreateCounterCollectionArgs,
} from "@server/graphql.generated";

import { ServerContext } from "@server/context";

import { convertPrismaUserCollectionToGql } from "@server/modules/counter-collections/utils";

import { coerceCollectionName } from "./utils";

export async function createCounterCollection(
  parent: unknown,
  args: MutationCreateCounterCollectionArgs,
  context: ServerContext,
  info: GraphQLResolveInfo
): Promise<CreateCounterCollectionResult> {
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
      error: CreateCounterCollectionError.RateLimited,
    };
  }

  // Make sure that we're authenticated
  if (!userToken || !userToken.valid) {
    return {
      error: CreateCounterCollectionError.NotAuthenticated,
    };
  }

  // Validate incoming parameters
  const name = coerceCollectionName(args.name);
  if (!name) {
    return {
      error: CreateCounterCollectionError.NameMissingOrEmpty,
    };
  }

  if (name.length < MIN_COLLECTION_NAME_LENGTH) {
    return {
      error: CreateCounterCollectionError.NameTooShort,
    };
  }

  if (name.length > MAX_COLLECTION_NAME_LENGTH) {
    return {
      error: CreateCounterCollectionError.NameTooLong,
    };
  }

  // Create the collection
  try {
    const collection = await prisma.userCounterCollection.create({
      data: {
        name,
        user: {
          connect: {
            id: userToken.userId,
          },
        },
      },
      include: {
        entries: true,
      },
    });
    return {
      collection: convertPrismaUserCollectionToGql(collection),
    };
  } catch (e) {
    return {
      error: CreateCounterCollectionError.CouldNotCreate,
    };
  }
}
