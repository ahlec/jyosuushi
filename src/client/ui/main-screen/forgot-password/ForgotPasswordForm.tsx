import React, { useCallback } from "react";
import { defineMessages } from "react-intl";

import AuthForm, { AuthFormError } from "@jyosuushi/ui/components/AuthForm";

type ForgotPasswordFormError = Omit<AuthFormError, "specificField"> & {
  specificField: Exclude<AuthFormError["specificField"], "password">;
};

export { ForgotPasswordFormError };

const INTL_MESSAGES = defineMessages({
  buttonResetPassword: {
    defaultMessage: "Reset Password",
    id: "forgot-password.form.button.resetPassword",
  },
});

interface ComponentProps {
  onSubmit: (fields: {
    email: string;
  }) => Promise<ForgotPasswordFormError | null>;
}

function ForgotPasswordForm({ onSubmit }: ComponentProps): React.ReactElement {
  // Intercept the AuthForm `onSubmit` and the parent `onSubmit`
  const handleSubmit = useCallback(
    async ({ email }: { email: string }): Promise<AuthFormError | null> =>
      onSubmit({ email }),
    [onSubmit]
  );

  // Render the form
  return (
    <AuthForm
      onSubmit={handleSubmit}
      submitButton={INTL_MESSAGES.buttonResetPassword}
      usesPassword={false}
    />
  );
}

export default ForgotPasswordForm;
