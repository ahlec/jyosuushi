import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link, Redirect } from "react-router-dom";

import { ONE_SECOND, ONE_MINUTE } from "@shared/constants";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import {
  AUTH_MUTATION_REFETCH_QUERIES,
  AUTH_MUTATION_UPDATE_FUNCTION,
} from "@jyosuushi/graphql/authentication";
import {
  useLoginMutation,
  LoginError,
} from "@jyosuushi/graphql/types.generated";

import AuthPageLayout from "@jyosuushi/ui/modules/authentication/components/AuthPageLayout";
import {
  ERROR_MESSAGE_FIELD_EMPTY,
  ERROR_MESSAGE_UNKNOWN_ERROR,
} from "@jyosuushi/ui/modules/authentication/error-messages";

import LoginForm, { LoginFormError, LoginFormValues } from "./LoginForm";
import ResendVerificationEmailForm from "./ResendVerificationEmailForm";

import styles from "./LoginPage.scss";

const INTL_MESSAGES = defineMessages({
  errorCredentialsInvalid: {
    defaultMessage: "The email/password combination provided was incorrect.",
    id: "login-page.errors.credentialsInvalid",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to log in too many times. Please try again after a minute.",
    id: "login-page.errors.rateLimited",
  },
  headerLogin: {
    defaultMessage: "Sign in",
    id: "login-page.login.header",
  },
  headerResendVerification: {
    defaultMessage: "Verification Required",
    id: "login-page.resend-email-verification.header",
  },
  loginPurpose: {
    defaultMessage:
      "Log in to your account to create custom quizzes and track your results.",
    id: "login-page.login.description",
  },
  registerAccountParagraph: {
    defaultMessage:
      "Or, click <link>here</link> to register an account with us for free.",
    id: "login-page.login.registerAccountParagraph",
  },
});

type LoginPageForm =
  | {
      type: "login";
    }
  | {
      type: "resend-email-verification";
      email: string;
      password: string;
    };

function renderRegisterLink(
  ...contents: readonly string[]
): React.ReactElement {
  return <Link to="/register">{contents}</Link>;
}

function LoginPage(): React.ReactElement {
  const authStatus = useAuthenticationStatus();

  // Define component state
  const [form, setForm] = useState<LoginPageForm>({
    type: "login",
  });
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState<
    boolean
  >(false);

  // Handle the submission of the login form
  const [login] = useLoginMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
    update: AUTH_MUTATION_UPDATE_FUNCTION,
  });
  const handleSubmit = useCallback(
    async ({
      email,
      password,
    }: LoginFormValues): Promise<LoginFormError | null> => {
      const result = await login({
        variables: {
          email,
          password,
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

      const { error, user } = result.data.login;
      if (error) {
        switch (error) {
          case LoginError.EmailEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_FIELD_EMPTY,
              specificField: "email",
            };
          }
          case LoginError.PasswordEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_FIELD_EMPTY,
              specificField: "password",
            };
          }
          case LoginError.EmailPasswordCombinationIncorrect: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: { message: INTL_MESSAGES.errorCredentialsInvalid },
              specificField: null,
            };
          }
          case LoginError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: { message: INTL_MESSAGES.errorRateLimited },
              specificField: null,
            };
          }
          case LoginError.AlreadyAuthenticated: {
            setShouldRedirectToProfile(true);
            return null;
          }
          case LoginError.EmailNotVerified: {
            setForm({
              email,
              password,
              type: "resend-email-verification",
            });
            return null;
          }
          default: {
            return error;
          }
        }
      }

      if (!user) {
        return {
          dismissal: {
            method: "time-elapsed",
            milliseconds: ONE_SECOND * 20,
          },
          message: ERROR_MESSAGE_UNKNOWN_ERROR,
          specificField: null,
        };
      }

      setShouldRedirectToProfile(true);
      return null;
    },
    [login]
  );

  // Handle events coming from the <ResendVerificationEmailForm />
  const handleReturnToLoginForm = useCallback(
    (): void => setForm({ type: "login" }),
    []
  );
  const handleRedirectToProfile = useCallback(
    (): void => setShouldRedirectToProfile(true),
    []
  );

  // Redirect to the profile page if we're supposed to
  if (
    shouldRedirectToProfile ||
    authStatus === AuthenticationStatus.Authenticated
  ) {
    return <Redirect to="/profile" />;
  }

  // Render the appropriate form on the page
  switch (form.type) {
    case "login": {
      return (
        <AuthPageLayout
          title={INTL_MESSAGES.headerLogin}
          purpose={INTL_MESSAGES.loginPurpose}
        >
          <LoginForm onSubmit={handleSubmit} />
          <div className={styles.separator} />
          <p className={styles.registerAccount}>
            <FormattedMessage
              {...INTL_MESSAGES.registerAccountParagraph}
              values={{
                link: renderRegisterLink,
              }}
            />
          </p>
        </AuthPageLayout>
      );
    }
    case "resend-email-verification": {
      return (
        <AuthPageLayout
          title={INTL_MESSAGES.headerResendVerification}
          purpose={null}
        >
          <ResendVerificationEmailForm
            email={form.email}
            onRedirectToProfile={handleRedirectToProfile}
            onReturnToLoginForm={handleReturnToLoginForm}
            password={form.password}
          />
        </AuthPageLayout>
      );
    }
  }
}

export default LoginPage;
