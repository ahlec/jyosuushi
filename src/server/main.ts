import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import aws from "aws-sdk";
import CookieParser from "cookie-parser";
import express from "express";
import graphqlDepthLimit from "graphql-depth-limit";

import ExpressAuthenticationCookie from "./authentication/ExpressAuthenticationCookie";
import { createDataSources } from "./datasources";
import { Environment } from "./environment";
import EmailTemplatesEmailApi from "./email/EmailTemplatesEmailApi";
import { EmailApi } from "./email/types";
import { SERVER_MODULES } from "./modules";
import { createRateLimiter } from "./rate-limiting/create";
import { RESOLVERS } from "./resolvers";
import { ServerContext } from "./context";

function getRuntimeEnvironment(): Environment {
  const {
    AWS_REGION = "us-east-1",
    EMAIL_ADDRESS = "donotreply@jyosuushi.com",
    LOCAL_DEVELOPMENT = "",
    USE_AWS = "",
    WEB_CLIENT_URL,
  } = process.env;

  const isLocalDevelopment = LOCAL_DEVELOPMENT === "true";
  const hasAwsUseFlag = USE_AWS === "true";

  if (!isLocalDevelopment && !hasAwsUseFlag) {
    throw new Error("Cannot be in a production environment with AWS disabled.");
  }

  let webClientBaseUrl = WEB_CLIENT_URL;
  if (!webClientBaseUrl) {
    webClientBaseUrl = isLocalDevelopment
      ? "http://localhost:8080"
      : "https://www.jyosuushi.com";
  }

  const useAws = !isLocalDevelopment || hasAwsUseFlag;
  return {
    awsRegion: AWS_REGION,
    canUseSecureCookies: !isLocalDevelopment,
    fromEmailAddress: EMAIL_ADDRESS,
    useAws,
    useAwsSimpleEmailService: useAws,
    webClientBaseUrl,
  };
}

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
          fromEmail: "donotreply@jyosuushi.com",
          mode: "aws-ses",
        }
      : {
          mode: "local-filesystem",
        },
    environment.webClientBaseUrl
  );
}

async function main(): Promise<void> {
  const environment = getRuntimeEnvironment();
  console.log("⚙️ Environment:", environment);

  if (environment.useAws) {
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
      origin: ["http://localhost:8080"],
    },
    path: "/",
  });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}

main();
