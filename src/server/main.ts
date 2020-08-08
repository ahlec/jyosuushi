import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import CookieParser from "cookie-parser";
import express from "express";

import ExpressAuthorizationCookie from "./authorization/ExpressAuthorizationCookie";
import { createDataSources } from "./datasources";
import { SERVER_MODULES } from "./modules";
import { RESOLVERS } from "./resolvers";
import { ServerContext } from "./context";

async function main(): Promise<void> {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    context: ({ req, res }): ServerContext => ({
      authCookie: new ExpressAuthorizationCookie(req, res, prisma),
      dataSources: createDataSources(prisma),
    }),
    resolvers: RESOLVERS,
    typeDefs: SERVER_MODULES.map((module) => module.typeDefs),
  });

  const app = express();
  app.use(CookieParser());

  server.applyMiddleware({ app, path: "/" });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}

main();
