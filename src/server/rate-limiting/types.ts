import { GraphQLResolveInfo } from "graphql";

import { ServerContext } from "@server/context";

type OnlyStrings<T> = T extends string ? T : never;

export interface RateLimitResolverArgs<TResolverArgs> {
  parent: unknown;
  args: TResolverArgs;
  context: ServerContext;
  info: GraphQLResolveInfo;
}

export interface RateLimitWindowConfiguration {
  /**
   * Window duration in millis.
   */
  window: string;

  /**
   * Max number of calls within the `window` duration.
   */
  max: number;
}

export interface RateLimitArgs<TResolverArgsKeys extends string> {
  /**
   * The window to use for regular requests.
   */
  regularWindow: RateLimitWindowConfiguration;

  /**
   * The window to use if this connection seems suspsicious, eg there's
   * auth information provided that is invalid or might indicate a
   * malicious actor.
   */
  suspiciousRequestWindow: RateLimitWindowConfiguration;

  /**
   * Values to build into the key used to identify the resolve call.
   */
  identityArgs: readonly TResolverArgsKeys[];
}

export type RateLimitFn = <
  TResolverArgs extends Record<string, unknown>,
  TResolverArgsKeys extends OnlyStrings<keyof TResolverArgs>
>(
  resolverArgs: RateLimitResolverArgs<TResolverArgs>,
  rateLimitArgs: RateLimitArgs<TResolverArgsKeys>
) => Promise<string | undefined>;
