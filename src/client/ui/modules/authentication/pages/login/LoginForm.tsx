import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import AuthForm from "@jyosuushi/ui/modules/authentication/auth-form/AuthForm";
import {
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "@jyosuushi/ui/modules/authentication/auth-form/types";

import styles from "./LoginForm.scss";

type LoginFormFields = "email" | "password";

export type LoginFormError = AuthFormError<LoginFormFields>;
export type LoginFormValues = AuthFormValues<LoginFormFields>;

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
    id: "login-page.login-form.forgot-password",
  },
});

const LOGIN_FORM_FIELDS: readonly AuthFormFieldDefinition<LoginFormFields>[] = [
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
  onSubmit: (fields: LoginFormValues) => Promise<LoginFormError | null>;
}

function LoginForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      fields={LOGIN_FORM_FIELDS}
      onSubmit={onSubmit}
      submitButtonLabel={INTL_MESSAGES.buttonLogin}
    >
      <Link className={styles.forgotPasswordLink} to="/forgot-password">
        <FormattedMessage {...INTL_MESSAGES.linkForgotPassword} />
      </Link>
    </AuthForm>
  );
}

export default LoginForm;
