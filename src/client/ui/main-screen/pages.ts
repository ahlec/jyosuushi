import { PageDefinition } from "@jyosuushi/ui/types";

import FeedbackPage from "./feedback/FeedbackPage";
import PreparePage from "./prepare/PreparePage";
import SettingsPage from "./settings/SettingsPage";

import {
  FORGOT_PASSWORD_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  REGISTER_ACCOUNT_PAGE,
  RESET_PASSWORD_PAGE,
  VERIFY_PAGE,
} from "@jyosuushi/ui/modules/authentication/pages";
import { EXPLORE_PAGE } from "@jyosuushi/ui/modules/explore/pages";
import { RELEASE_NOTES_PAGE } from "@jyosuushi/ui/modules/release-notes/pages";

export const PREPARE_PAGE: PageDefinition = {
  aliasPaths: ["/"],
  component: PreparePage,
  primaryPath: "",
};

export const SETTINGS_PAGE: PageDefinition = {
  aliasPaths: [],
  component: SettingsPage,
  primaryPath: "/settings",
};

export const FEEDBACK_PAGE: PageDefinition = {
  aliasPaths: [],
  component: FeedbackPage,
  primaryPath: "/feedback",
};

export const UNORDERED_NESTED_PAGES: ReadonlyArray<PageDefinition> = [
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE,
  PROFILE_PAGE,
  LOGIN_PAGE,
  FORGOT_PASSWORD_PAGE,
  REGISTER_ACCOUNT_PAGE,
  RESET_PASSWORD_PAGE,
  VERIFY_PAGE,
  PROFILE_PAGE,
];

export { EXPLORE_PAGE, RELEASE_NOTES_PAGE };
