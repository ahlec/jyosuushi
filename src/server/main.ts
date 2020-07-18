import { ApolloServer } from "apollo-server";

import { SERVER_MODULES } from "./modules";
import { RESOLVERS } from "./resolvers";
import { ServerModule } from "./modules/ServerModule";

async function main(): Promise<void> {
  const server = new ApolloServer({
    resolvers: RESOLVERS,
    typeDefs: SERVER_MODULES.map((module: ServerModule) => module.typeDefs),
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main();
