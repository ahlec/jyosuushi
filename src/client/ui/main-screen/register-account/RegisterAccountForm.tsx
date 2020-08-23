import React from "react";
import { defineMessages } from "react-intl";

import AuthForm, { AuthFormError } from "@jyosuushi/ui/components/AuthForm";

export { AuthFormError };

const INTL_MESSAGES = defineMessages({
  buttonRegister: {
    defaultMessage: "Register",
    id: "register-account.RegisterAccountForm.buttons.register",
  },
});

interface ComponentProps {
  onSubmit: (fields: {
    email: string;
    password: string;
  }) => Promise<AuthFormError | null>;
}

function RegisterAccountForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      onSubmit={onSubmit}
      submitButton={INTL_MESSAGES.buttonRegister}
      usesPassword={true}
    />
  );
}

export default RegisterAccountForm;
