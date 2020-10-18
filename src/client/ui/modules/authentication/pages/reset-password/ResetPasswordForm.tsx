import React from "react";
import { defineMessages } from "react-intl";

import AuthForm from "@jyosuushi/ui/modules/authentication/auth-form/AuthForm";
import {
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "@jyosuushi/ui/modules/authentication/auth-form/types";
import { validatePasswordCreationField } from "@jyosuushi/ui/modules/authentication/form-validation";

type ResetPasswordFormFields = "password" | "confirmPassword";

export type ResetPasswordFormError = AuthFormError<ResetPasswordFormFields>;
export type ResetPasswordFormValues = AuthFormValues<ResetPasswordFormFields>;

const INTL_MESSAGES = defineMessages({
  buttonReset: {
    defaultMessage: "Change Password",
    id: "reset-password.reset-password-form.buttons.changePassword",
  },
  labelConfirmPassword: {
    defaultMessage: "Confirm password",
    id: "reset-password.reset-password-form.confirmPassword.label",
  },
  labelPassword: {
    defaultMessage: "Password",
    id: "reset-password.reset-password-form.password.label",
  },
  validationPasswordsDontMatch: {
    defaultMessage: "Passwords do not match.",
    id: "reset-password.reset-password-form.validation.passwordsDontMatch",
  },
});

const RESET_PASSWORD_FORM_FIELDS: readonly AuthFormFieldDefinition<
  ResetPasswordFormFields
>[] = [
  {
    fieldName: "password",
    inputType: "password",
    label: INTL_MESSAGES.labelPassword,
    validation: validatePasswordCreationField,
  },
  {
    fieldName: "confirmPassword",
    inputType: "password",
    label: INTL_MESSAGES.labelConfirmPassword,
    validation: ({ confirmPassword, password }) =>
      password === confirmPassword
        ? { valid: true }
        : {
            reason: { message: INTL_MESSAGES.validationPasswordsDontMatch },
            valid: false,
          },
  },
];

interface ComponentProps {
  onSubmit: (
    fields: ResetPasswordFormValues
  ) => Promise<ResetPasswordFormError | null>;
}

function ResetPasswordForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      fields={RESET_PASSWORD_FORM_FIELDS}
      onSubmit={onSubmit}
      submitButtonLabel={INTL_MESSAGES.buttonReset}
    />
  );
}

export default ResetPasswordForm;
