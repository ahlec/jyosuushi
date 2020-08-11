import { GraphQLResolveInfo } from "graphql";

import { arePasswordsEqual } from "@server/authentication/password-encryption";
import { ServerContext } from "@server/context";
import { DatabaseUser } from "@server/datasources/PrismaDataSource";

export type UsernamePasswordAuthenticationResult<TErrorValues> =
  | {
      success: false;
      error: TErrorValues;
    }
  | {
      success: true;
      user: DatabaseUser;
    };

export async function handleUsernamePasswordAuthentication<
  TErrorRateLimited,
  TErrorAlreadyAuthenticated,
  TErrorEmailEmpty,
  TErrorPasswordEmpty,
  TErrorEmailPasswordIncorrect
>(
  parent: unknown,
  args: {
    email: string;
    password: string;
  },
  context: ServerContext,
  info: GraphQLResolveInfo,
  errorValues: {
    alreadyAuthenticated: TErrorAlreadyAuthenticated;
    rateLimited: TErrorRateLimited;
    emailEmpty: TErrorEmailEmpty;
    passwordEmpty: TErrorPasswordEmpty;
    emailPasswordIncorrect: TErrorEmailPasswordIncorrect;
  }
): Promise<
  UsernamePasswordAuthenticationResult<
    | TErrorRateLimited
    | TErrorAlreadyAuthenticated
    | TErrorEmailEmpty
    | TErrorPasswordEmpty
    | TErrorEmailPasswordIncorrect
  >
> {
  const { email, password } = args;
  const {
    authCookie,
    dataSources: { database },
    rateLimit,
  } = context;

  // Perform rate limiting
  const rateLimitError = await rateLimit(
    {
      args,
      context,
      info,
      parent,
    },
    {
      identityArgs: ["email"],
      regularWindow: {
        max: 5,
        window: "1m",
      },
      suspiciousRequestWindow: {
        max: 2,
        window: "1m",
      },
    }
  );
  if (rateLimitError) {
    return {
      error: errorValues.rateLimited,
      success: false,
    };
  }

  // Check to see if we're already authenticated
  if (authCookie.current && authCookie.current.valid) {
    return {
      error: errorValues.alreadyAuthenticated,
      success: false,
    };
  }

  // Validate input parameters
  if (!email) {
    return {
      error: errorValues.emailEmpty,
      success: false,
    };
  }

  if (!password) {
    return {
      error: errorValues.passwordEmpty,
      success: false,
    };
  }

  // Fetch the account for the specified email
  const user = await database.getUserByEmail(email);
  if (!user) {
    return {
      error: errorValues.emailPasswordIncorrect,
      success: false,
    };
  }

  const isMatchForPasswords = await arePasswordsEqual(
    user.encryptedPassword,
    password
  );
  if (!isMatchForPasswords) {
    return {
      error: errorValues.emailPasswordIncorrect,
      success: false,
    };
  }

  // We passed all the checks
  return {
    success: true,
    user,
  };
}
