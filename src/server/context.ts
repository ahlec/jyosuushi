import { AuthenticationCookie } from "./authentication/types";
import { PrismaDataSource } from "./datasources/PrismaDataSource";
import { EmailApi } from "./email/types";
import { RateLimitFn } from "./rate-limiting/types";

export interface ServerContextDataSources {
  database: PrismaDataSource;
}

export interface ServerContext {
  authCookie: AuthenticationCookie;
  dataSources: ServerContextDataSources;
  emailApi: EmailApi;
  rateLimit: RateLimitFn;
  requestRemoteAddress: string;
}
