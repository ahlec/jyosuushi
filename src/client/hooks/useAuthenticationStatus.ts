import { useHasActiveUserCheckQuery } from "@jyosuushi/graphql/types.generated";

export enum AuthenticationStatus {
  Loading = "loading",
  Authenticated = "authenticated",
  NotAuthenticated = "not-authenticated",
}

function useAuthenticationStatus(): AuthenticationStatus {
  // Connect with GraphQL
  const { data, loading } = useHasActiveUserCheckQuery();

  // Return the current value
  if (loading || !data) {
    return AuthenticationStatus.Loading;
  }

  if (!data.activeUser) {
    return AuthenticationStatus.NotAuthenticated;
  }

  return AuthenticationStatus.Authenticated;
}

export default useAuthenticationStatus;
