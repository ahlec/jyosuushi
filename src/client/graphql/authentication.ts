import { PureQueryOptions } from "@apollo/client";

import {
  AuthenticationCheckDocument,
  AuthenticatedProfileQueryDocument,
} from "./types.generated";

export const AUTH_MUTATION_REFETCH_QUERIES: PureQueryOptions[] = [
  {
    query: AuthenticationCheckDocument,
  },
  {
    query: AuthenticatedProfileQueryDocument,
  },
];
