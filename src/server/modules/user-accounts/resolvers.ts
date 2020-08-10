import { GraphQLResolveInfo } from "graphql";

/**
 * On new checkouts, you're going to be missing this file. This
 * is autogenerated and therefore not checked into the repository.
 * Generate this file automatically using `yarn gql:codegen`.
 */
import {
  ChangePasswordError,
  ChangePasswordPayload,
  LoginError,
  LoginPayload,
  LogoutError,
  LogoutPayload,
  Resolvers,
  UserAccount,
  MutationChangePasswordArgs,
  MutationLoginArgs,
  MutationRegisterAccountArgs,
  MutationVerifyEmailArgs,
  RegisterAccountPayload,
  RegisterAccountError,
  VerifyEmailError,
  VerifyEmailPayload,
} from "@server/graphql.generated";

import {
  arePasswordsEqual,
  encryptPassword,
} from "@server/authentication/password-encryption";
import { UserTokenValidationError } from "@server/authentication/types";
import { ServerContext } from "@server/context";

import { convertDatabaseUserToGraphQLUserAccount, logInUser } from "./utils";
import {
  validateEmail,
  validateEmailVerificationCode,
  validatePassword,
} from "./validation";

export const USER_ACCOUNTS_RESOLVERS: Resolvers = {
  Mutation: {
    changePassword: async (
      parent: unknown,
      args: MutationChangePasswordArgs,
      context: ServerContext,
      info: GraphQLResolveInfo
    ): Promise<ChangePasswordPayload> => {
      const { newPassword, oldPassword } = args;
      const {
        authCookie: { current: userToken },
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
          identityArgs: [],
          regularWindow: {
            max: 10,
            window: "1m",
          },
          suspiciousRequestWindow: {
            max: 1,
            window: "30m",
          },
        }
      );
      if (rateLimitError) {
        return {
          error: ChangePasswordError.RateLimited,
          success: false,
        };
      }

      // Validate old password (only checking format, not
      // verifying that it IS the old password yet)
      if (!oldPassword) {
        return {
          error: ChangePasswordError.OldPasswordEmpty,
          success: false,
        };
      }

      // Validate the new password to ensure it follows the
      // rules
      const newPasswordValidationError = validatePassword(newPassword, {
        empty: ChangePasswordError.NewPasswordTooShort,
        missingNumeral: ChangePasswordError.NewPasswordMissingNumeral,
        tooShort: ChangePasswordError.NewPasswordTooShort,
      });
      if (newPasswordValidationError) {
        return {
          error: newPasswordValidationError,
          success: false,
        };
      }

      // Check to ensure that we're authenticated
      if (!userToken || !userToken.valid) {
        return {
          error: ChangePasswordError.NotAuthenticated,
          success: false,
        };
      }

      // Get the old user. Due to FOREIGN constraints it should never
      // be possible for us to have a valid session without a user, but
      // let's make TypeScript happy all the same.
      const user = await database.getUserById(userToken.userId);
      if (!user) {
        return {
          error: ChangePasswordError.NotAuthenticated,
          success: false,
        };
      }

      // Compare the provided existing password to ensure they are the
      // same.
      const werePasswordsEqual = await arePasswordsEqual(
        user.encryptedPassword,
        oldPassword
      );
      if (!werePasswordsEqual) {
        return {
          error: ChangePasswordError.OldPasswordNotCorrect,
          success: false,
        };
      }

      // Actually change the password
      const encryptedNewPassword = await encryptPassword(newPassword);
      await database.changeUserPassword(user.id, encryptedNewPassword);
      return {
        success: true,
      };
    },
    login: async (
      parent: unknown,
      args: MutationLoginArgs,
      context: ServerContext,
      info: GraphQLResolveInfo
    ): Promise<LoginPayload> => {
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
          error: LoginError.RateLimited,
        };
      }

      // Check to see if we're already authenticated
      if (authCookie.current && authCookie.current.valid) {
        return {
          error: LoginError.AlreadyAuthenticated,
        };
      }

      // Validate input parameters
      if (!email) {
        return {
          error: LoginError.EmailEmpty,
        };
      }

      if (!password) {
        return {
          error: LoginError.PasswordEmpty,
        };
      }

      // Fetch the account for the specified email
      const user = await database.getUserByEmail(email);
      if (!user) {
        return {
          error: LoginError.EmailPasswordCombinationIncorrect,
        };
      }

      const isMatchForPasswords = await arePasswordsEqual(
        user.encryptedPassword,
        password
      );
      if (!isMatchForPasswords) {
        return {
          error: LoginError.EmailPasswordCombinationIncorrect,
        };
      }

      // Only allow users who have verified their emails to log in
      if (!user.hasVerifiedEmail) {
        return {
          error: LoginError.EmailNotVerified,
        };
      }

      // We've authenticated, so let's set up a new session
      await logInUser(user.id, authCookie, database);
      return {
        user: convertDatabaseUserToGraphQLUserAccount(user),
      };
    },
    logout: async (
      parent: unknown,
      args: Record<string, unknown>,
      context: ServerContext,
      info: GraphQLResolveInfo
    ): Promise<LogoutPayload> => {
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
          identityArgs: [],
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
          error: LogoutError.RateLimited,
        };
      }

      // Check to make sure we were even authenticated to begin with
      if (!authCookie.current) {
        return {
          error: LogoutError.WasntAuthenticated,
        };
      }

      // Clean up our session if we previously had a valid session
      if (authCookie.current.valid) {
        await database.endUserSession(authCookie.current.sessionId);
      }

      // Wipe our token and wrap up
      authCookie.delete();
      return {};
    },
    registerAccount: async (
      parent: unknown,
      args: MutationRegisterAccountArgs,
      context: ServerContext,
      info: GraphQLResolveInfo
    ): Promise<RegisterAccountPayload> => {
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
          error: RegisterAccountError.RateLimited,
        };
      }

      // Check to see if we're already authenticated
      if (authCookie.current && authCookie.current.valid) {
        return {
          error: RegisterAccountError.AlreadyAuthenticated,
        };
      }

      // Validate email
      const emailValidationError = validateEmail(email, {
        empty: RegisterAccountError.EmailEmpty,
        invalidFormat: RegisterAccountError.EmailInvalidFormat,
      });
      if (emailValidationError) {
        return {
          error: emailValidationError,
        };
      }

      // Validate password
      const passwordValidationError = validatePassword(password, {
        empty: RegisterAccountError.PasswordTooShort,
        missingNumeral: RegisterAccountError.PasswordMissingNumeral,
        tooShort: RegisterAccountError.PasswordTooShort,
      });
      if (passwordValidationError) {
        return {
          error: passwordValidationError,
        };
      }

      // Check to see if the user already exists
      const doesAccountAlreadyExist = await database.doesAccountExistForEmail(
        email
      );
      if (doesAccountAlreadyExist) {
        return {
          error: RegisterAccountError.AccountAlreadyExists,
        };
      }

      // Register the account
      const encryptedPassword = await encryptPassword(password);
      const newUser = await database.createUser(email, encryptedPassword);
      const verificationCode = await database.createEmailVerificationCode(
        newUser.id
      );
      console.log("verification code:", verificationCode);
      return {
        user: convertDatabaseUserToGraphQLUserAccount(newUser),
      };
    },
    verifyEmail: async (
      parent: unknown,
      args: MutationVerifyEmailArgs,
      context: ServerContext,
      info: GraphQLResolveInfo
    ): Promise<VerifyEmailPayload> => {
      const { code, email } = args;
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
            max: 2,
            window: "1m",
          },
          suspiciousRequestWindow: {
            max: 2,
            window: "5m",
          },
        }
      );
      if (rateLimitError) {
        return {
          error: VerifyEmailError.RateLimited,
        };
      }

      // Validate email (solely whether it's proper format, don't
      // check yet to see if email is in database and thereby allow for
      // probing to see if an email is registered)
      const emailValidationError = validateEmail(email, {
        empty: VerifyEmailError.EmailEmpty,
        invalidFormat: VerifyEmailError.EmailInvalidFormat,
      });
      if (emailValidationError) {
        return {
          error: emailValidationError,
        };
      }

      // Validate code
      const codeValidationError = validateEmailVerificationCode(code, {
        empty: VerifyEmailError.CodeEmpty,
        invalidFormat: VerifyEmailError.CodeInvalidFormat,
      });
      if (codeValidationError) {
        return {
          error: codeValidationError,
        };
      }

      // Attempt to redeem code
      const redemptionResult = await database.redeemEmailVerificationCode(
        email,
        code
      );
      if (!redemptionResult.success) {
        switch (redemptionResult.error) {
          case "email-code-pair-not-found": {
            return {
              error: VerifyEmailError.CodeNotFound,
            };
          }
          case "email-already-verified": {
            return {
              error: VerifyEmailError.AlreadyVerifiedEmail,
            };
          }
        }
      }

      // We've verified so log the user in.
      await logInUser(redemptionResult.user.id, authCookie, database);
      return {
        user: convertDatabaseUserToGraphQLUserAccount(redemptionResult.user),
      };
    },
  },
  Query: {
    activeUser: async (
      _parent: unknown,
      _args: unknown,
      {
        authCookie: { current: userToken },
        dataSources: { database },
      }: ServerContext
    ): Promise<UserAccount | null> => {
      if (!userToken) {
        return null;
      }

      if (!userToken.valid) {
        console.log("validation error:", userToken.error);
        return null;
      }

      const user = await database.getUserById(userToken.userId);
      if (!user) {
        // This shouldn't be possible because of foreign key constraints in the
        // database, but let's quietly handle this as well.
        return null;
      }

      return convertDatabaseUserToGraphQLUserAccount(user);
    },
    hasSessionExpired: (
      parent: unknown,
      args: unknown,
      { authCookie: { current: userToken } }: ServerContext
    ): boolean => {
      return (
        !!userToken &&
        !userToken.valid &&
        userToken.error === UserTokenValidationError.Expired
      );
    },
  },
};
