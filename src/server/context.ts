import { AuthorizationCookie } from "./authorization/types";
import { PrismaDataSource } from "./datasources/PrismaDataSource";

export interface ServerContextDataSources {
  database: PrismaDataSource;
}

export interface ServerContext {
  authCookie: AuthorizationCookie;
  dataSources: ServerContextDataSources;
}
