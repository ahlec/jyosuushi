import React, { useCallback, useState } from "react";
import { defineMessages } from "react-intl";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

import { MIN_PASSWORD_LENGTH, ONE_SECOND, ONE_MINUTE } from "@shared/constants";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import { AUTH_MUTATION_REFETCH_QUERIES } from "@jyosuushi/graphql/authentication";
import {
  useRedeemPasswordResetMutation,
  RedeemPasswordResetError,
} from "@jyosuushi/graphql/types.generated";

import AuthPageLayout from "@jyosuushi/ui/modules/authentication/components/AuthPageLayout";
import {
  ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
  ERROR_MESSAGE_PASSWORD_TOO_SHORT,
  ERROR_MESSAGE_UNKNOWN_ERROR,
} from "@jyosuushi/ui/modules/authentication/error-messages";

import ResetPasswordForm, {
  ResetPasswordFormError,
  ResetPasswordFormValues,
} from "./ResetPasswordForm";

const INTL_MESSAGES = defineMessages({
  errorRateLimited: {
    defaultMessage:
      "You have attempted to reset your password too many times too quickly. Please try again after a minute.",
    id: "reset-password.errors.rateLimited",
  },
  formPurpose: {
    defaultMessage:
      "Choose a new password for your account. It should be at least {minLength, plural, one {# character} other {# characters}} long and include at least one numeral.",
    id: "reset-password.description",
  },
  header: {
    defaultMessage: "Reset Password",
    id: "reset-password.header",
  },
});

export interface ResetPasswordPagePathParams {
  firstCode: string;
  secondCode: string;
}

type ComponentProps = RouteComponentProps<ResetPasswordPagePathParams>;

enum RedirectError {
  CodesBadFormat = "codes-bad-format",
  CodesInvalidOrExpired = "codes-invalid-or-expired",
}

const PURPOSE_VALUES: Record<string, unknown> = {
  minLength: MIN_PASSWORD_LENGTH,
};

function ResetPasswordPage({
  match: {
    params: { firstCode, secondCode },
  },
}: ComponentProps): React.ReactElement {
  const authStatus = useAuthenticationStatus();

  // // Manage state
  const [redirectError, setRedirectError] = useState<RedirectError | null>(
    null
  );
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState<
    boolean
  >(false);

  // // Handle the submission of the login form
  const [redeemPasswordReset] = useRedeemPasswordResetMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
  });
  const handleSubmit = useCallback(
    async ({
      password,
    }: ResetPasswordFormValues): Promise<ResetPasswordFormError | null> => {
      const result = await redeemPasswordReset({
        variables: {
          firstCode,
          password,
          secondCode,
        },
      });

      if (!result.data) {
        return {
          dismissal: {
            method: "time-elapsed",
            milliseconds: ONE_SECOND * 20,
          },
          message: ERROR_MESSAGE_UNKNOWN_ERROR,
          specificField: null,
        };
      }

      const { error, user } = result.data.redeemPasswordReset;
      if (error) {
        switch (error) {
          case RedeemPasswordResetError.FirstCodeBadFormat:
          case RedeemPasswordResetError.SecondCodeBadFormat: {
            setRedirectError(RedirectError.CodesBadFormat);
            return null;
          }
          case RedeemPasswordResetError.CodesInvalid: {
            setRedirectError(RedirectError.CodesInvalidOrExpired);
            return null;
          }
          case RedeemPasswordResetError.PasswordTooShort: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_TOO_SHORT,
              specificField: "password",
            };
          }
          case RedeemPasswordResetError.PasswordMissingNumeral: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
              specificField: "password",
            };
          }
          case RedeemPasswordResetError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: { message: INTL_MESSAGES.errorRateLimited },
              specificField: null,
            };
          }
          case RedeemPasswordResetError.AlreadyAuthenticated: {
            setShouldRedirectToProfile(true);
            return null;
          }
          default: {
            return error;
          }
        }
      }

      if (user) {
        setShouldRedirectToProfile(true);
        return null;
      }

      return {
        dismissal: {
          method: "time-elapsed",
          milliseconds: ONE_SECOND * 20,
        },
        message: ERROR_MESSAGE_UNKNOWN_ERROR,
        specificField: null,
      };
    },
    [redeemPasswordReset, firstCode, secondCode]
  );

  // Redirect to the profile page if we're supposed to
  if (
    authStatus === AuthenticationStatus.Authenticated ||
    shouldRedirectToProfile
  ) {
    return <Redirect to="/profile" />;
  }

  // Redirect to the login screen if we have an error that requires
  // redirection
  if (redirectError) {
    return <Redirect to="/login" />;
  }

  // Render the appropriate form on the page
  return (
    <AuthPageLayout
      title={INTL_MESSAGES.header}
      purpose={INTL_MESSAGES.formPurpose}
      purposeValues={PURPOSE_VALUES}
    >
      <ResetPasswordForm onSubmit={handleSubmit} />
    </AuthPageLayout>
  );
}

export default ResetPasswordPage;
