import { PrismaClient } from "@prisma/client";
import { ServerContextDataSources } from "@server/context";

import { PrismaDataSource } from "./PrismaDataSource";

export function createDataSources(
  prisma: PrismaClient
): ServerContextDataSources {
  return {
    database: new PrismaDataSource(prisma),
    prisma,
  };
}
