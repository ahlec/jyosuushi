import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

import { ONE_SECOND, ONE_MINUTE } from "@shared/constants";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import { AUTH_MUTATION_REFETCH_QUERIES } from "@jyosuushi/graphql/authentication";
import {
  useLoginMutation,
  LoginError,
} from "@jyosuushi/graphql/types.generated";

import LoginForm, { AuthFormError } from "./LoginForm";
import ResendVerificationEmailForm from "./ResendVerificationEmailForm";

import styles from "./LoginPage.scss";

const INTL_MESSAGES = defineMessages({
  errorCredentialsInvalid: {
    defaultMessage: "The email/password combination provided was incorrect.",
    id: "login-page.errors.credentialsInvalid",
  },
  errorFieldEmpty: {
    defaultMessage: "This field must be specified.",
    id: "login-page.errors.fieldEmpty",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to log in too many times. Please try again after a minute.",
    id: "login-page.errors.rateLimited",
  },
  errorUnknownError: {
    defaultMessage:
      "An error occurred while trying to log in. Please try again in a moment.",
    id: "login-page.errors.unknown",
  },
  headerLogin: {
    defaultMessage: "Sign in",
    id: "login-page.login.header",
  },
  loginPurpose: {
    defaultMessage:
      "Log in to your account to create custom quizzes and track your results.",
    id: "login-page.login.description",
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
  });
  const handleSubmit = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<AuthFormError | null> => {
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
          message: INTL_MESSAGES.errorUnknownError,
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
              message: INTL_MESSAGES.errorFieldEmpty,
              specificField: "email",
            };
          }
          case LoginError.PasswordEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: INTL_MESSAGES.errorFieldEmpty,
              specificField: "password",
            };
          }
          case LoginError.EmailPasswordCombinationIncorrect: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: INTL_MESSAGES.errorCredentialsInvalid,
              specificField: null,
            };
          }
          case LoginError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: INTL_MESSAGES.errorRateLimited,
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
          message: INTL_MESSAGES.errorUnknownError,
          specificField: null,
        };
      }

      setShouldRedirectToProfile(true);
      return null;
    },
    [login]
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
        <div className={styles.loginPage}>
          <h1 className={styles.pageHeader}>
            <FormattedMessage {...INTL_MESSAGES.headerLogin} />
          </h1>
          <p className={styles.formPurpose}>
            <FormattedMessage {...INTL_MESSAGES.loginPurpose} />
          </p>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      );
    }
    case "resend-email-verification": {
      return (
        <div className={styles.loginPage}>
          <ResendVerificationEmailForm
            email={form.email}
            password={form.password}
          />
        </div>
      );
    }
  }
}

export default LoginPage;
