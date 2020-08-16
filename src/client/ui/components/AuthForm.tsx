import React, { useCallback, useEffect, useState } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";

import useIsMounted from "@jyosuushi/hooks/useIsMounted";

import ActionBar from "./forms/ActionBar";
import ErrorDisplay from "./forms/ErrorDisplay";
import Form from "./forms/Form";
import FormButton from "./forms/FormButton";
import LabeledContainer from "./forms/LabeledContainer";
import StringInput from "./forms/StringInput";

const INTL_MESSAGES = defineMessages({
  labelEmail: {
    defaultMessage: "Email",
    id: "components.AuthForm.email.label",
  },
  labelPassword: {
    defaultMessage: "Password",
    id: "components.AuthForm.password.label",
  },
});

export interface AuthFormError {
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
  children?: React.ReactElement;
  onSubmit: (values: {
    email: string;
    password: string;
  }) => Promise<AuthFormError | null>;
  submitButton: MessageDescriptor;
  usesPassword: boolean;
}

function AuthForm({
  children,
  onSubmit,
  submitButton,
  usesPassword,
}: ComponentProps): React.ReactElement {
  const isMounted = useIsMounted();

  // Define state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<AuthFormError | null>(null);

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
      const submitError = await (usesPassword
        ? onSubmit({ email, password })
        : onSubmit({ email, password: "" }));
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
      {usesPassword ? (
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
      ) : null}
      {!!currentError && currentError.specificField === null && (
        <ErrorDisplay text={currentError.message} variant="form-error" />
      )}
      <ActionBar>
        {children}
        <FormButton
          action="submit"
          disabled={!!currentError}
          text={submitButton}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default AuthForm;
