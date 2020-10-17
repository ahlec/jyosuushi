import React from "react";
import { defineMessages } from "react-intl";

import AuthForm from "@jyosuushi/ui/modules/authentication/auth-form/AuthForm";
import {
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "@jyosuushi/ui/modules/authentication/auth-form/types";

type RegisterAccountFormFields = "email" | "password";

export type RegisterAccountFormError = AuthFormError<RegisterAccountFormFields>;
export type RegisterAccountFormValues = AuthFormValues<
  RegisterAccountFormFields
>;

const INTL_MESSAGES = defineMessages({
  buttonRegister: {
    defaultMessage: "Register",
    id: "register-account.RegisterAccountForm.buttons.register",
  },
  labelEmail: {
    defaultMessage: "Email",
    id: "register-account.RegisterAccountForm.email.label",
  },
  labelPassword: {
    defaultMessage: "Password",
    id: "register-account.RegisterAccountForm.password.label",
  },
});

const REGISTER_ACCOUNT_FORM_FIELDS: readonly AuthFormFieldDefinition<
  RegisterAccountFormFields
>[] = [
  {
    fieldName: "email",
    inputType: "username",
    label: INTL_MESSAGES.labelEmail,
    validation: null,
  },
  {
    fieldName: "password",
    inputType: "password",
    label: INTL_MESSAGES.labelPassword,
    validation: null,
  },
];

interface ComponentProps {
  onSubmit: (
    fields: RegisterAccountFormValues
  ) => Promise<RegisterAccountFormError | null>;
}

function RegisterAccountForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      fields={REGISTER_ACCOUNT_FORM_FIELDS}
      onSubmit={onSubmit}
      submitButtonLabel={INTL_MESSAGES.buttonRegister}
    />
  );
}

export default RegisterAccountForm;
