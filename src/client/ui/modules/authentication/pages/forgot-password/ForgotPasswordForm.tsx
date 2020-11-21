import React from "react";
import { defineMessages } from "react-intl";

import AuthForm from "@jyosuushi/ui/modules/authentication/auth-form/AuthForm";
import {
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "@jyosuushi/ui/modules/authentication/auth-form/types";

type ForgotPasswordFormFields = "email";

export type ForgotPasswordFormError = AuthFormError<ForgotPasswordFormFields>;
export type ForgotPasswordFormValues = AuthFormValues<ForgotPasswordFormFields>;

const INTL_MESSAGES = defineMessages({
  buttonResetPassword: {
    defaultMessage: "Reset Password",
    id: "forgot-password.form.button.resetPassword",
  },
  labelEmail: {
    defaultMessage: "Email",
    id: "forgot-password.form.email.label",
  },
});

const FORGOT_PASSWORD_FORM_FIELDS: readonly AuthFormFieldDefinition<
  ForgotPasswordFormFields
>[] = [
  {
    fieldName: "email",
    inputType: "username",
    label: INTL_MESSAGES.labelEmail,
    validation: null,
  },
];

interface ComponentProps {
  onSubmit: (
    fields: ForgotPasswordFormValues
  ) => Promise<ForgotPasswordFormError | null>;
}

function ForgotPasswordForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      context={null}
      fields={FORGOT_PASSWORD_FORM_FIELDS}
      onSubmit={onSubmit}
      submitButtonLabel={INTL_MESSAGES.buttonResetPassword}
    />
  );
}

export default ForgotPasswordForm;
