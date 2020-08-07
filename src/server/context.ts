import { UserToken } from "./authorization/types";
import { PrismaDataSource } from "./datasources/PrismaDataSource";

export interface ServerContextDataSources {
  database: PrismaDataSource;
}

export interface ServerContext {
  dataSources: ServerContextDataSources;
  userToken: UserToken | null;
}
