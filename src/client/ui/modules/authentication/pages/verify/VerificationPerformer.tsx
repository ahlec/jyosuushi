import { useCallback, useEffect } from "react";

import {
  AUTH_MUTATION_REFETCH_QUERIES,
  AUTH_MUTATION_UPDATE_FUNCTION,
} from "@jyosuushi/graphql/authentication";
import {
  useVerifyEmailMutationMutation,
  VerifyEmailError,
} from "@jyosuushi/graphql/types.generated";

interface ComponentProps {
  code: string;
  email: string;

  /**
   * A callback that will be invoked asynchronously if, after the verification
   * process, it's determined that the user should be redirected to the login
   * screen.
   */
  onRedirectToLogin: () => void;

  /**
   * A callback that will be invoked asynchronously if, during or after the
   * verification process, it's determined that the user should be redirected
   * to their profile page.
   */
  onRedirectToProfile: () => void;
}

function VerificationPerformer({
  code,
  email,
  onRedirectToLogin,
  onRedirectToProfile,
}: ComponentProps): null {
  // Connect to the GraphQL
  const [verifyEmail] = useVerifyEmailMutationMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
    update: AUTH_MUTATION_UPDATE_FUNCTION,
  });

  // Create a wrapper that invokes the mutation and then processes the
  // result
  const performVerification = useCallback(async (): Promise<void> => {
    const result = await verifyEmail({
      variables: {
        code,
        email,
      },
    });

    if (!result.data) {
      onRedirectToLogin();
      return;
    }

    const { error, user } = result.data.verifyEmail;
    if (error) {
      switch (error) {
        case VerifyEmailError.CodeEmpty:
        case VerifyEmailError.CodeInvalidFormat:
        case VerifyEmailError.CodeNotFound:
        case VerifyEmailError.EmailEmpty:
        case VerifyEmailError.EmailInvalidFormat:
        case VerifyEmailError.RateLimited: {
          onRedirectToLogin();
          return;
        }
        case VerifyEmailError.AlreadyVerifiedEmail: {
          onRedirectToProfile();
          return;
        }
        default: {
          // Will not produce a TypeScript error unless this switch statement
          // is missing one or more case statements.
          return error;
        }
      }
    }

    if (!user) {
      onRedirectToLogin();
      return;
    }

    onRedirectToProfile();
  }, [code, email, onRedirectToLogin, onRedirectToProfile, verifyEmail]);

  // Perform the GraphQL mutation
  useEffect(() => {
    performVerification();
  }, [performVerification]);

  // Don't render anything while we're waiting (process should take a short
  // amount of time)
  return null;
}

export default VerificationPerformer;
