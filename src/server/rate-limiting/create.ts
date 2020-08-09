import { getGraphQLRateLimiter } from "graphql-rate-limit";

import { ServerContext } from "@server/context";

import { RateLimitFn, RateLimitWindowConfiguration } from "./types";
import { isValidationErrorSuspicious } from "@server/authorization/utils";

function identifyRateLimitContext({
  authCookie: { current: userSession },
  requestRemoteAddress,
}: ServerContext): string {
  if (userSession && userSession.valid) {
    // Open to exploring using `sessionId` instead of `userId` here.
    return userSession.userId;
  }

  return requestRemoteAddress;
}

export function createRateLimiter(): RateLimitFn {
  const internal = getGraphQLRateLimiter({
    identifyContext: identifyRateLimitContext,
  });

  return (
    resolverArgs,
    { regularWindow, suspiciousRequestWindow, ...rateLimitArgs }
  ): Promise<string | undefined> => {
    const { current: userToken } = resolverArgs.context.authCookie;

    let window: RateLimitWindowConfiguration;
    if (
      userToken &&
      !userToken.valid &&
      isValidationErrorSuspicious(userToken.error)
    ) {
      console.log("rate limiting with suspicious window", userToken);
      window = suspiciousRequestWindow;
    } else {
      window = regularWindow;
    }

    return internal(resolverArgs, { ...window, ...rateLimitArgs });
  };
}
