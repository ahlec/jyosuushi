import { ApolloServer } from "apollo-server";

import { SANDBOX_GQL } from "./modules/sandbox/gql";
import { RESOLVERS } from "./resolvers";

async function main(): Promise<void> {
  const server = new ApolloServer({
    resolvers: RESOLVERS,
    typeDefs: [SANDBOX_GQL],
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main();
