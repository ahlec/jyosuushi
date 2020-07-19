import { PrismaDataSource } from "./datasources/PrismaDataSource";

export interface ServerContextDataSources {
  database: PrismaDataSource;
}

export interface ServerContext {
  dataSources: ServerContextDataSources;
}
