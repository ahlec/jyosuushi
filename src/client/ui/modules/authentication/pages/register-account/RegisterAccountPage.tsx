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
  useRegisterAccountMutation,
  RegisterAccountError,
} from "@jyosuushi/graphql/types.generated";

import {
  ERROR_MESSAGE_EMAIL_DOESNT_LOOK_LIKE_EMAIL,
  ERROR_MESSAGE_FIELD_EMPTY,
  ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
  ERROR_MESSAGE_PASSWORD_TOO_SHORT,
  ERROR_MESSAGE_UNKNOWN_ERROR,
} from "@jyosuushi/ui/modules/authentication/error-messages";

import RegisterAccountForm, {
  RegisterAccountFormError,
  RegisterAccountFormValues,
} from "./RegisterAccountForm";

import styles from "./RegisterAccountPage.scss";

const INTL_MESSAGES = defineMessages({
  errorAccountAlreadyExists: {
    defaultMessage: "An account with this email already exists.",
    id: "register-account.RegisterAccountPage.errors.accountAlreadyExists",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to register an account too many times. Please try again after a minute.",
    id: "register-account.RegisterAccountPage.errors.rateLimited",
  },
  headerRegister: {
    defaultMessage: "Register Account",
    id: "register-account.RegisterAccountPage.header",
  },
  registerPurpose: {
    defaultMessage:
      "Register an account for free to create custom quizzes and track your results.",
    id: "register-account.RegisterAccountPage.description",
  },
  registerSuccess: {
    defaultMessage:
      "Your account has been registered! Please <bold>check your email</bold> to verify your account and log in.",
    id: "register-account.RegisterAccountPage.success",
  },
});

function BoldFormatting(...contents: readonly string[]): React.ReactElement {
  return <div className={styles.bold}>{contents}</div>;
}

function RegisterAccountPage(): React.ReactElement {
  const authStatus = useAuthenticationStatus();

  // Define component state
  const [hasRegisteredAccount, setHasRegisteredAccount] = useState<boolean>(
    false
  );

  // Handle the submission of the login form
  const [registerAccount] = useRegisterAccountMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
    update: AUTH_MUTATION_UPDATE_FUNCTION,
  });
  const handleSubmit = useCallback(
    async ({
      email,
      password,
    }: RegisterAccountFormValues): Promise<RegisterAccountFormError | null> => {
      const result = await registerAccount({
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

      const { error, success } = result.data.registerAccount;
      if (error) {
        switch (error) {
          case RegisterAccountError.EmailEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_FIELD_EMPTY,
              specificField: "email",
            };
          }
          case RegisterAccountError.EmailInvalidFormat: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_EMAIL_DOESNT_LOOK_LIKE_EMAIL,
              specificField: "email",
            };
          }
          case RegisterAccountError.PasswordTooShort: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_TOO_SHORT,
              specificField: "password",
            };
          }
          case RegisterAccountError.PasswordMissingNumeral: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
              specificField: null,
            };
          }
          case RegisterAccountError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: { message: INTL_MESSAGES.errorRateLimited },
              specificField: null,
            };
          }
          case RegisterAccountError.AlreadyAuthenticated: {
            // setShouldRedirectToProfile(true);
            return null;
          }
          case RegisterAccountError.AccountAlreadyExists: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: { message: INTL_MESSAGES.errorAccountAlreadyExists },
              specificField: "email",
            };
          }
          default: {
            return error;
          }
        }
      }

      if (!success) {
        return {
          dismissal: {
            method: "time-elapsed",
            milliseconds: ONE_SECOND * 20,
          },
          message: ERROR_MESSAGE_UNKNOWN_ERROR,
          specificField: null,
        };
      }

      setHasRegisteredAccount(true);
      return null;
    },
    [registerAccount]
  );

  // Redirect to the profile page if we're supposed to
  if (authStatus === AuthenticationStatus.Authenticated) {
    return <Redirect to="/profile" />;
  }

  // Render the register account page
  let pageContents: React.ReactElement;
  if (hasRegisteredAccount) {
    pageContents = (
      <p className={styles.registerSuccess}>
        <FormattedMessage
          {...INTL_MESSAGES.registerSuccess}
          values={{ bold: BoldFormatting }}
        />
      </p>
    );
  } else {
    pageContents = (
      <>
        <p className={styles.formPurpose}>
          <FormattedMessage {...INTL_MESSAGES.registerPurpose} />
        </p>
        <RegisterAccountForm onSubmit={handleSubmit} />
      </>
    );
  }

  return (
    <div className={styles.registerAccountPage}>
      <h1 className={styles.pageHeader}>
        <FormattedMessage {...INTL_MESSAGES.headerRegister} />
      </h1>
      {pageContents}
    </div>
  );
}

export default RegisterAccountPage;
