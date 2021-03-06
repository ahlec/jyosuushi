import { PageDefinition } from "@jyosuushi/ui/types";

import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePageWrapper from "./pages/profile/ProfilePageWrapper";
import RegisterAccountPage from "./pages/register-account/RegisterAccountPage";
import ResetPasswordPage from "./pages/reset-password/ResetPasswordPage";
import VerifyPage from "./pages/verify/VerifyPage";

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

export const PROFILE_PAGE: PageDefinition = {
  aliasPaths: [],
  component: ProfilePageWrapper,
  primaryPath: "/profile",
};

export const REGISTER_ACCOUNT_PAGE: PageDefinition = {
  aliasPaths: [],
  component: RegisterAccountPage,
  primaryPath: "/register",
};

const UUID_V4_REGEX =
  "[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}";

export const RESET_PASSWORD_PAGE: PageDefinition = {
  aliasPaths: [],
  component: ResetPasswordPage,
  primaryPath: `/reset-password/:firstCode(${UUID_V4_REGEX})/:secondCode(${UUID_V4_REGEX})`,
};

export const VERIFY_PAGE: PageDefinition = {
  aliasPaths: [],
  component: VerifyPage,
  primaryPath: `/verify`,
};
