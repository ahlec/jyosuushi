import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import AuthForm, {
  AuthFormError,
} from "@jyosuushi/ui/modules/authentication/components/AuthForm";

export { AuthFormError };

import styles from "./LoginForm.scss";

const INTL_MESSAGES = defineMessages({
  buttonLogin: {
    defaultMessage: "Login",
    id: "login-page.login-form.buttons.login",
  },
  linkForgotPassword: {
    defaultMessage: "Forgot password?",
    id: "login-page.login-for.forgot-password",
  },
});

interface ComponentProps {
  onSubmit: (fields: {
    email: string;
    password: string;
  }) => Promise<AuthFormError | null>;
}

function LoginForm({ onSubmit }: ComponentProps): React.ReactElement {
  return (
    <AuthForm
      onSubmit={onSubmit}
      submitButton={INTL_MESSAGES.buttonLogin}
      usesPassword={true}
    >
      <Link className={styles.forgotPasswordLink} to="/forgot-password">
        <FormattedMessage {...INTL_MESSAGES.linkForgotPassword} />
      </Link>
    </AuthForm>
  );
}

export default LoginForm;
