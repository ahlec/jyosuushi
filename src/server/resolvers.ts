/**
 * On new checkouts, you're going to be missing this file. This
 * is autogenerated and therefore not checked into the repository.
 * Generate this file automatically using `yarn gql:codegen`.
 */
import { Resolvers } from "./graphql.generated";

import { SANDBOX_RESOLVERS } from "./modules/sandbox/resolvers";

/**
 * Address issues with TypeScript and string-indexed lookup objects
 * https://github.com/dotansimha/graphql-code-generator/issues/1133#issuecomment-456812621
 */
type StringIndexed<T> = T & {
  /* Required to be `any` in order to comply with apollo-server typings */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [index: string]: any;
};

export const RESOLVERS: StringIndexed<Resolvers>[] = [SANDBOX_RESOLVERS];
