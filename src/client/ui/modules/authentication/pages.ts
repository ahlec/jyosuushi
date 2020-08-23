import { PageDefinition } from "@jyosuushi/ui/types";

import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterAccountPage from "./pages/register-account/RegisterAccountPage";

export const LOGIN_PAGE: PageDefinition = {
  aliasPaths: [],
  component: LoginPage,
  primaryPath: "/login",
};

export const FORGOT_PASSWORD_PAGE: PageDefinition = {
  aliasPaths: [],
  component: ForgotPasswordPage,
  primaryPath: "/forgot-password",
};

export const REGISTER_ACCOUNT_PAGE: PageDefinition = {
  aliasPaths: [],
  component: RegisterAccountPage,
  primaryPath: "/register",
};
