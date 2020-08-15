import { PureQueryOptions } from "@apollo/client";

import { AuthenticationCheckDocument } from "./types.generated";

export const AUTH_MUTATION_REFETCH_QUERIES: PureQueryOptions[] = [
  {
    query: AuthenticationCheckDocument,
  },
];
