import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

import { ONE_MINUTE, ONE_SECOND } from "@shared/constants";

import {
  useRequestEmailVerificationMutation,
  RequestEmailVerificationError,
} from "@jyosuushi/graphql/types.generated";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import styles from "./ResendVerificationEmailForm.scss";

const INTL_MESSAGES = defineMessages({
  errorEmailSentTooRecently: {
    defaultMessage:
      "A verification link was recently sent to your inbox. Please wait a few minutes before requesting a new link.",
    id: "login-page.verification-required.errorEmailSentTooRecently",
  },
  errorRateLimited: {
    defaultMessage:
      "You've requested too many verification emails recently. Please wait a few minutes and try again.",
    id: "login-page.verification-required.errorRateLimited",
  },
  errorUnknownError: {
    defaultMessage:
      "An error occurred while trying to request your new verification email. Please try again in a few seconds or reach out to the developers.",
    id: "login-page.verification-required.errorUnknownError",
  },
  explanationBrief: {
    defaultMessage: "You must verify your email before you can log in.",
    id: "login-page.verification-required.explanationBrief",
  },
  explanationDetailed: {
    defaultMessage:
      "A link was sent to your email when you registered; following that link will verify your account and allow you to log in.",
    id: "login-page.verification-required.explanationDetailed",
  },
  explanationResend: {
    defaultMessage:
      "If you haven't received the email or no longer have it, you can click the button below to send a new link to the same address.",
    id: "login-page.verification-required.explanationResend",
  },
  requestSuccessMessage: {
    defaultMessage:
      "A verification link was just sent to your email address. Give it a few seconds to arrive, and check your spam folder to make sure it wasn't caught there.",
    id: "login-page.verification-required.requestSuccessMessage",
  },
  resendButtonLabel: {
    defaultMessage: "Resend Verification Email",
    id: "login-page.verification-required.resendButtonLabel",
  },
});

interface ComponentProps {
  email: string;
  onRedirectToProfile: () => void;
  onReturnToLoginForm: () => void;
  password: string;
}

type RequestResult =
  | {
      success: true;
    }
  | {
      success: false;

      /**
       * The localized error message that should be displayed to the user.
       */
      message: MessageDescriptor;

      /**
       * The amount of time the resend button should be disabled after this
       * error, measured in milliseconds.
       */
      disableDurationMs: number;
    };

function ResendVerificationEmailForm({
  email,
  onRedirectToProfile,
  onReturnToLoginForm,
  password,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [
    latestRequestResult,
    setLatestRequestResult,
  ] = useState<RequestResult | null>(null);

  // Handle the user requesting a new email
  const [requestEmailVerification] = useRequestEmailVerificationMutation({
    variables: {
      email,
      password,
    },
  });
  const handleResendClick = useCallback(async (): Promise<void> => {
    setIsRequesting(true);
    try {
      const result = await requestEmailVerification();
      if (!result.data) {
        // TODO
        return;
      }

      const { error, success } = result.data.requestEmailVerification;
      if (error) {
        switch (error) {
          case RequestEmailVerificationError.EmailEmpty:
          case RequestEmailVerificationError.PasswordEmpty:
          case RequestEmailVerificationError.EmailPasswordCombinationIncorrect:
          case RequestEmailVerificationError.EmailAlreadyVerified: {
            onReturnToLoginForm();
            return;
          }
          case RequestEmailVerificationError.RateLimited: {
            setLatestRequestResult({
              disableDurationMs: ONE_MINUTE,
              message: INTL_MESSAGES.errorRateLimited,
              success: false,
            });
            return;
          }
          case RequestEmailVerificationError.VerificationEmailSentTooRecently: {
            setLatestRequestResult({
              disableDurationMs: ONE_MINUTE,
              message: INTL_MESSAGES.errorEmailSentTooRecently,
              success: false,
            });
            return;
          }
          case RequestEmailVerificationError.AlreadyAuthenticated: {
            onRedirectToProfile();
            return;
          }
          default: {
            setLatestRequestResult(error);
            return;
          }
        }
      }

      if (success) {
        setLatestRequestResult({
          success: true,
        });
        return;
      }

      setLatestRequestResult({
        disableDurationMs: ONE_SECOND * 15,
        message: INTL_MESSAGES.errorUnknownError,
        success: false,
      });
    } catch {
      setLatestRequestResult({
        disableDurationMs: ONE_SECOND * 15,
        message: INTL_MESSAGES.errorUnknownError,
        success: false,
      });
    } finally {
      setIsRequesting(false);
    }
  }, [onRedirectToProfile, onReturnToLoginForm, requestEmailVerification]);

  // Clear the latest result, if we have one
  useEffect(() => {
    if (!latestRequestResult) {
      return;
    }

    const duration = latestRequestResult.success
      ? ONE_SECOND * 30
      : latestRequestResult.disableDurationMs;
    const timeoutId = window.setTimeout(
      (): void => setLatestRequestResult(null),
      duration
    );
    return (): void => window.clearTimeout(timeoutId);
  }, [latestRequestResult]);

  // Render the component
  return (
    <div className={styles.container}>
      <div className={styles.explanationBrief}>
        <FormattedMessage {...INTL_MESSAGES.explanationBrief} />
      </div>
      <div className={styles.explanationNormal}>
        <FormattedMessage {...INTL_MESSAGES.explanationDetailed} />
      </div>
      <div className={styles.explanationNormal}>
        <FormattedMessage {...INTL_MESSAGES.explanationResend} />
      </div>
      <div className={styles.buttonContainer}>
        <StandardButton
          className={styles.resendButton}
          disabled={isRequesting || !!latestRequestResult}
          onClick={handleResendClick}
        >
          <FormattedMessage {...INTL_MESSAGES.resendButtonLabel} />
        </StandardButton>
      </div>
      {latestRequestResult && (
        <div
          className={classnames(
            styles.resendResult,
            !latestRequestResult.success && styles.error
          )}
        >
          {latestRequestResult.success ? (
            <FormattedMessage {...INTL_MESSAGES.requestSuccessMessage} />
          ) : (
            <FormattedMessage {...latestRequestResult.message} />
          )}
        </div>
      )}
    </div>
  );
}

export default ResendVerificationEmailForm;
