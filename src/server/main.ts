import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

import DatabaseBackedUserToken from "./authorization/DatabaseBackedUserToken";
import { createDataSources } from "./datasources";
import { SERVER_MODULES } from "./modules";
import { RESOLVERS } from "./resolvers";
import { ServerContext } from "./context";

async function main(): Promise<void> {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    context: ({ req }): ServerContext => ({
      dataSources: createDataSources(prisma),
      userToken: req.headers.authorization
        ? new DatabaseBackedUserToken(req.headers.authorization, prisma)
        : null,
    }),
    resolvers: RESOLVERS,
    typeDefs: SERVER_MODULES.map((module) => module.typeDefs),
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main();
