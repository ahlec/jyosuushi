import React, { useCallback, useEffect, useState } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { Link } from "react-router-dom";

import useIsMounted from "@jyosuushi/hooks/useIsMounted";

import ActionBar from "@jyosuushi/ui/components/forms/ActionBar";
import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import Form from "@jyosuushi/ui/components/forms/Form";
import FormButton from "@jyosuushi/ui/components/forms/FormButton";
import LabeledContainer from "@jyosuushi/ui/components/forms/LabeledContainer";
import StringInput from "@jyosuushi/ui/components/forms/StringInput";

import styles from "./LoginForm.scss";

const INTL_MESSAGES = defineMessages({
  buttonLogin: {
    defaultMessage: "Login",
    id: "login-page.login-form.buttons.login",
  },
  labelEmail: {
    defaultMessage: "Email",
    id: "login-page.login-form.email.label",
  },
  labelPassword: {
    defaultMessage: "Password",
    id: "login-page.login-form.password.label",
  },
  linkForgotPassword: {
    defaultMessage: "Forgot password?",
    id: "login-page.login-for.forgot-password",
  },
});

export interface LoginFormError {
  message: MessageDescriptor;
  dismissal:
    | {
        method: "field-change";
      }
    | {
        method: "time-elapsed";
        milliseconds: number;
      };
  specificField: "email" | "password" | null;
}

interface ComponentProps {
  onSubmit: (email: string, password: string) => Promise<LoginFormError | null>;
}

function LoginForm({ onSubmit }: ComponentProps): React.ReactElement {
  const isMounted = useIsMounted();

  // Define state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<LoginFormError | null>(null);

  // Dismiss errors that are time based
  useEffect(() => {
    if (!currentError || currentError.dismissal.method !== "time-elapsed") {
      return;
    }

    const timeoutId = window.setTimeout(
      (): void => setCurrentError(null),
      currentError.dismissal.milliseconds
    );
    return (): void => {
      window.clearTimeout(timeoutId);
    };
  }, [currentError]);

  // Handle fields being changed
  const handleEmailChange = useCallback(
    (next: string): void => {
      if (
        currentError &&
        currentError.dismissal.method === "field-change" &&
        (currentError.specificField === null ||
          currentError.specificField === "email")
      ) {
        // If the error disappears when we change email (either specifically, or change
        // any form field) wipe the error.
        setCurrentError(null);
      }

      setEmail(next);
    },
    [currentError]
  );

  const handlePasswordChange = useCallback(
    (next: string): void => {
      if (
        currentError &&
        currentError.dismissal.method === "field-change" &&
        (currentError.specificField === null ||
          currentError.specificField === "password")
      ) {
        // If the error disappears when we change password (either specifically, or change
        // any form field) wipe the error.
        setCurrentError(null);
      }

      setPassword(next);
    },
    [currentError]
  );

  // Handle submission
  const handleSubmit = async (): Promise<void> => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const submitError = await onSubmit(email, password);
      if (isMounted.current) {
        setCurrentError(submitError);
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  // Render the page
  return (
    <Form onSubmit={handleSubmit}>
      <LabeledContainer label={INTL_MESSAGES.labelEmail}>
        <StringInput
          onChange={handleEmailChange}
          role="username"
          type="email"
          value={email}
        />
        {!!currentError && currentError.specificField === "email" && (
          <ErrorDisplay text={currentError.message} variant="field-error" />
        )}
      </LabeledContainer>
      <LabeledContainer label={INTL_MESSAGES.labelPassword}>
        <StringInput
          onChange={handlePasswordChange}
          role="password"
          type="password"
          value={password}
        />
        {!!currentError && currentError.specificField === "password" && (
          <ErrorDisplay text={currentError.message} variant="field-error" />
        )}
      </LabeledContainer>
      {!!currentError && currentError.specificField === null && (
        <ErrorDisplay text={currentError.message} variant="form-error" />
      )}
      <ActionBar>
        <Link className={styles.forgotPasswordLink} to="/forgot-password">
          <FormattedMessage {...INTL_MESSAGES.linkForgotPassword} />
        </Link>
        <FormButton
          action="submit"
          disabled={!!currentError}
          text={INTL_MESSAGES.buttonLogin}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default LoginForm;
