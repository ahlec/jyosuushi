import { useEffect } from "react";

import { ONE_SECOND } from "@shared/constants";

import {
  useAuthenticationCheckQuery,
  useLogoutMutation,
} from "@jyosuushi/graphql/types.generated";
import { AUTH_MUTATION_REFETCH_QUERIES } from "@jyosuushi/graphql/authentication";

const AUTH_POLL_INTERVAL_MILLISECONDS = ONE_SECOND * 15;

function AuthenticationManager(): null {
  /**
   * Set up to query the authentication data at application initialization,
   * and then to poll for it while we're running to ensure we keep up to
   * date.
   */
  const { data } = useAuthenticationCheckQuery({
    pollInterval: AUTH_POLL_INTERVAL_MILLISECONDS,
  });

  /**
   * If we ever discover that our session has expired, we should immediately
   * log out.
   */
  const isDefinitelyUsingExpiredSession = !!data && data.hasSessionExpired;
  const [logout] = useLogoutMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
  });
  useEffect(() => {
    if (!isDefinitelyUsingExpiredSession) {
      return;
    }

    logout();
  }, [isDefinitelyUsingExpiredSession, logout]);

  /**
   * Render nothing (invisible manager component)
   */
  return null;
}

export default AuthenticationManager;
