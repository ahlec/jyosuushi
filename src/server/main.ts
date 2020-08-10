import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import CookieParser from "cookie-parser";
import express from "express";
import graphqlDepthLimit from "graphql-depth-limit";

import ExpressAuthorizationCookie from "./authorization/ExpressAuthorizationCookie";
import { createDataSources } from "./datasources";
import { Environment } from "./environment";
import { SERVER_MODULES } from "./modules";
import { createRateLimiter } from "./rate-limiting/create";
import { RESOLVERS } from "./resolvers";
import { ServerContext } from "./context";

function getRuntimeEnvironment(): Environment {
  const { LOCAL_DEVELOPMENT = "" } = process.env;
  return {
    canUseSecureCookies: LOCAL_DEVELOPMENT !== "true",
  };
}

async function main(): Promise<void> {
  const environment = getRuntimeEnvironment();
  console.log("⚙️ Environment:", environment);

  const prisma = new PrismaClient();

  const rateLimit = createRateLimiter();
  const server = new ApolloServer({
    context: async ({ req, res }): Promise<ServerContext> => {
      const authCookie = await ExpressAuthorizationCookie.load(
        environment,
        req,
        res,
        prisma
      );
      return {
        authCookie,
        dataSources: createDataSources(prisma),
        rateLimit,
        requestRemoteAddress: req.ip,
      };
    },
    resolvers: RESOLVERS,
    typeDefs: SERVER_MODULES.map((module) => module.typeDefs),
    validationRules: [
      /**
       * Depth limit is arbitrarily chosen based on the schema that we have available
       * right now and non-malicious plausibility for constructable queries. We can raise
       * this at any time if we run into a problem with the client, but should be judicious
       * about picking a good number.
       */
      graphqlDepthLimit(3),
    ],
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
