import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import aws from "aws-sdk";
import CookieParser from "cookie-parser";
import express from "express";
import graphqlDepthLimit from "graphql-depth-limit";

import ExpressAuthenticationCookie from "./authentication/ExpressAuthenticationCookie";
import { createDataSources } from "./datasources";
import { loadEnvironment, Environment } from "./environment";
import EmailTemplatesEmailApi from "./email/EmailTemplatesEmailApi";
import { EmailApi } from "./email/types";
import { SERVER_MODULES } from "./modules";
import { createRateLimiter } from "./rate-limiting/create";
import { RESOLVERS } from "./resolvers";
import { ServerContext } from "./context";
import { startHttpServer } from "./http-server";

function loadAndVerifyAwsConfiguration({
  awsRegion,
}: Environment): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    aws.config.getCredentials((err): void => {
      if (err) {
        reject(new Error("Loading the credentials produced an error."));
        return;
      }

      const { credentials } = aws.config;
      if (
        !credentials ||
        !credentials.accessKeyId ||
        !credentials.secretAccessKey
      ) {
        reject(
          new Error(
            "AWS credentials did not fail to load, but were not present."
          )
        );
        return;
      }

      if (!awsRegion) {
        reject(new Error("The environment's `awsRegion` was empty."));
        return;
      }

      aws.config.update({
        region: awsRegion,
      });

      resolve();
    })
  );
}

function instantiateEmailApi(environment: Environment): EmailApi {
  return new EmailTemplatesEmailApi(
    environment.useAwsSimpleEmailService
      ? {
          fromEmail: environment.fromEmailAddress,
          mode: "aws-ses",
        }
      : {
          mode: "local-filesystem",
        },
    environment.webClientBaseUrl
  );
}

async function main(): Promise<void> {
  const environment = loadEnvironment();
  console.log("⚙️ Environment:", environment);

  if (environment.useAwsSimpleEmailService) {
    console.group("🖇️ AWS: Loading configuration and connecting.");
    try {
      await loadAndVerifyAwsConfiguration(environment);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    console.log("Connected.");
    console.groupEnd();
  }

  const emailApi = instantiateEmailApi(environment);

  const prisma = new PrismaClient();

  const rateLimit = createRateLimiter();
  const server = new ApolloServer({
    context: async ({ req, res }): Promise<ServerContext> => {
      const authCookie = await ExpressAuthenticationCookie.load(
        environment,
        req,
        res,
        prisma
      );
      return {
        authCookie,
        dataSources: createDataSources(prisma),
        emailApi,
        rateLimit,
        requestRemoteAddress: req.ip,
      };
    },
    introspection: environment.shouldProvidePlayground, // needed for playground?
    playground: environment.shouldProvidePlayground,
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

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [...environment.corsOrigins], // Cannot pass in readonly array
    },
    path: "/",
  });

  startHttpServer(environment.serverConfig, app, (url): void => {
    console.log(`🚀 Server ready at ${url}${server.graphqlPath}`);
  });
}

main();
