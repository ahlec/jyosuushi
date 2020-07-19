import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { DataSource } from "apollo-datasource";

import { createDataSources } from "./datasources";
import { SERVER_MODULES } from "./modules";
import { RESOLVERS } from "./resolvers";
import { ServerContext, ServerContextDataSources } from "./context";

async function main(): Promise<void> {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    dataSources: () =>
      createDataSources(prisma) as {
        [name: string]: DataSource<ServerContext>;
      } & ServerContextDataSources,
    resolvers: RESOLVERS,
    typeDefs: SERVER_MODULES.map((module) => module.typeDefs),
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main();
