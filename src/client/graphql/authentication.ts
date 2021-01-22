import { ApolloCache, PureQueryOptions } from "@apollo/client";

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

export function AUTH_MUTATION_UPDATE_FUNCTION(
  cache: ApolloCache<unknown>
): void {
  cache.evict({ fieldName: "userCounterCollections", id: "ROOT_QUERY" });
}
