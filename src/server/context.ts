import { PrismaClient } from "@prisma/client";

import { AuthenticationCookie } from "./authentication/types";
import { PrismaDataSource } from "./datasources/PrismaDataSource";
import { EmailApi } from "./email/types";
import { RateLimitFn } from "./rate-limiting/types";

export interface ServerContextDataSources {
  /**
   * @depreciated Favor moving to direct use of Prisma (only scalable solution)
   **/
  database: PrismaDataSource;
  prisma: PrismaClient;
}

export interface ServerContext {
  authCookie: AuthenticationCookie;
  dataSources: ServerContextDataSources;
  emailApi: EmailApi;
  rateLimit: RateLimitFn;
  requestRemoteAddress: string;
}
