import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

import { ONE_SECOND, ONE_MINUTE } from "@shared/constants";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import {
  AUTH_MUTATION_REFETCH_QUERIES,
  AUTH_MUTATION_UPDATE_FUNCTION,
} from "@jyosuushi/graphql/authentication";
import {
  useRequestPasswordResetMutation,
  RequestPasswordResetError,
} from "@jyosuushi/graphql/types.generated";

import AuthPageLayout from "@jyosuushi/ui/modules/authentication/components/AuthPageLayout";
import {
  ERROR_MESSAGE_EMAIL_DOESNT_LOOK_LIKE_EMAIL,
  ERROR_MESSAGE_FIELD_EMPTY,
  ERROR_MESSAGE_UNKNOWN_ERROR,
} from "@jyosuushi/ui/modules/authentication/error-messages";

import ForgotPasswordForm, {
  ForgotPasswordFormError,
  ForgotPasswordFormValues,
} from "./ForgotPasswordForm";

import styles from "./ForgotPasswordPage.scss";

const INTL_MESSAGES = defineMessages({
  errorRateLimited: {
    defaultMessage:
      "You have attempted to reset your password too many times too quickly. Please try again after a minute.",
    id: "forgot-password.errors.rateLimited",
  },
  formPurpose: {
    defaultMessage:
      "Use this form to send an email that will guide you through resetting your password.",
    id: "forgot-password.description",
  },
  header: {
    defaultMessage: "Reset Password",
    id: "forgot-password.header",
  },
  possibleSuccess: {
    defaultMessage:
      "<bold>Please check your email inbox.</bold> If the email specified is registered with us, you will receive a link to reset your password shortly.",
    id: "forgot-password.possibleSuccess",
  },
});

function BoldFormatting(...contents: readonly string[]): React.ReactElement {
  return <div className={styles.bold}>{contents}</div>;
}

function ForgotPasswordPage(): React.ReactElement {
  const authStatus = useAuthenticationStatus();

  // Manage state
  const [possibleSuccess, setPossibleSuccess] = useState<boolean>(false);
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState<
    boolean
  >(false);

  // Handle the submission of the login form
  const [requestPasswordReset] = useRequestPasswordResetMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
    update: AUTH_MUTATION_UPDATE_FUNCTION,
  });
  const handleSubmit = useCallback(
    async ({
      email,
    }: ForgotPasswordFormValues): Promise<ForgotPasswordFormError | null> => {
      const result = await requestPasswordReset({
        variables: {
          email,
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

      const { error, possibleSuccess } = result.data.requestPasswordReset;
      if (error) {
        switch (error) {
          case RequestPasswordResetError.EmailEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_FIELD_EMPTY,
              specificField: "email",
            };
          }
          case RequestPasswordResetError.EmailInvalidFormat: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_EMAIL_DOESNT_LOOK_LIKE_EMAIL,
              specificField: "email",
            };
          }
          case RequestPasswordResetError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: { message: INTL_MESSAGES.errorRateLimited },
              specificField: null,
            };
          }
          case RequestPasswordResetError.AlreadyAuthenticated: {
            setShouldRedirectToProfile(true);
            return null;
          }
          default: {
            return error;
          }
        }
      }

      if (possibleSuccess) {
        setPossibleSuccess(true);
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
    [requestPasswordReset]
  );

  // Redirect to the profile page if we're supposed to
  if (
    authStatus === AuthenticationStatus.Authenticated ||
    shouldRedirectToProfile
  ) {
    return <Redirect to="/profile" />;
  }

  // If we've seen a POSSIBLE success, render the post-form page
  if (possibleSuccess) {
    return (
      <AuthPageLayout title={INTL_MESSAGES.header} purpose={null}>
        <div className={styles.emailSent}>
          <FormattedMessage
            {...INTL_MESSAGES.possibleSuccess}
            values={{
              bold: BoldFormatting,
            }}
          />
        </div>
      </AuthPageLayout>
    );
  }

  // Render the appropriate form on the page
  return (
    <AuthPageLayout
      title={INTL_MESSAGES.header}
      purpose={INTL_MESSAGES.formPurpose}
    >
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </AuthPageLayout>
  );
}

export default ForgotPasswordPage;
