import { AuthenticationCookie } from "./authentication/types";
import { PrismaDataSource } from "./datasources/PrismaDataSource";
import { RateLimitFn } from "./rate-limiting/types";

export interface ServerContextDataSources {
  database: PrismaDataSource;
}

export interface ServerContext {
  authCookie: AuthenticationCookie;
  dataSources: ServerContextDataSources;
  rateLimit: RateLimitFn;
  requestRemoteAddress: string;
}
