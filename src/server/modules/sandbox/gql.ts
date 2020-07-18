import { resolve } from "path";

import { loadGraphQlFile } from "@server/modules/gql-utils";

export const SANDBOX_GQL = loadGraphQlFile(
  resolve(__dirname, "./sandbox.graphql")
);
