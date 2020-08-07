import { ServerModule } from "./ServerModule";

import { BUG_REPORT_RESOLVERS } from "./bug-report/resolvers";
import { CORE_RESOLVERS } from "./core/resolvers";
import { SUGGESTIONS_BOX_RESOLVERS } from "./suggestions-box/resolvers";
import { USER_ACCOUNTS_RESOLVERS } from "./user-accounts/resolvers";

export const SERVER_MODULES: readonly ServerModule[] = [
  /**
   * The central, core module for this server. This defines behaviour intrinsic
   * to the operation of the server at a foundational level. Additionally, this
   * is where we declare the base Query/Mutation types -- all other modules should
   * `extend type` these two, which are defined here.
   */
  new ServerModule("./core/core.graphql", CORE_RESOLVERS),
  /**
   * All modules that are NOT `Core` should EXTEND Query/Mutation. These are
   * true modules that are seen as being able to be "plugged in" or removed.
   */
  new ServerModule("./bug-report/bug-report.graphql", BUG_REPORT_RESOLVERS),
  new ServerModule(
    "./suggestions-box/suggestions-box.graphql",
    SUGGESTIONS_BOX_RESOLVERS
  ),
  new ServerModule(
    "./user-accounts/user-accounts.graphql",
    USER_ACCOUNTS_RESOLVERS
  ),
];
