import { PageDefinition } from "@jyosuushi/ui/types";

import ExplorePage from "./explore/ExplorePage";
import { EXPLORE_PAGE_PATH } from "./explore/pathing";
import FeedbackPage from "./feedback/FeedbackPage";
import PreparePage from "./prepare/PreparePage";
import ReleaseNotesPage from "./release-notes/ReleaseNotesPage";
import SettingsPage from "./settings/SettingsPage";

import {
  FORGOT_PASSWORD_PAGE,
  LOGIN_PAGE,
  REGISTER_ACCOUNT_PAGE,
  RESET_PASSWORD_PAGE,
} from "@jyosuushi/ui/modules/authentication/pages";

export const PREPARE_PAGE: PageDefinition = {
  aliasPaths: ["/"],
  component: PreparePage,
  primaryPath: "",
};

export const EXPLORE_PAGE: PageDefinition = {
  aliasPaths: [],
  component: ExplorePage,
  primaryPath: EXPLORE_PAGE_PATH,
};

export const SETTINGS_PAGE: PageDefinition = {
  aliasPaths: [],
  component: SettingsPage,
  primaryPath: "/settings",
};

export const RELEASE_NOTES_PAGE: PageDefinition = {
  aliasPaths: [],
  component: ReleaseNotesPage,
  primaryPath: "/release-notes",
};

export const FEEDBACK_PAGE: PageDefinition = {
  aliasPaths: [],
  component: FeedbackPage,
  primaryPath: "/feedback",
};

export const PROFILE_PAGE: PageDefinition = {
  aliasPaths: [],
  component: FeedbackPage,
  primaryPath: "/profile",
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
];
