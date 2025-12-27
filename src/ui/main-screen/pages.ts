import { PageDefinition } from "@jyosuushi/ui/types";

import FeedbackPage from "./feedback/FeedbackPage";
import PreparePage from "./prepare/PreparePage";
import SettingsPage from "./settings/SettingsPage";

import { EXPLORE_PAGE } from "@jyosuushi/ui/modules/explore/pages";
import { RELEASE_NOTES_PAGE } from "@jyosuushi/ui/modules/release-notes/pages";

export const PREPARE_PAGE: PageDefinition = {
  component: PreparePage,
  primaryPath: "/",
};

export const SETTINGS_PAGE: PageDefinition = {
  component: SettingsPage,
  primaryPath: "/settings",
};

export const FEEDBACK_PAGE: PageDefinition = {
  component: FeedbackPage,
  primaryPath: "/feedback",
};

export const UNORDERED_NESTED_PAGES: ReadonlyArray<PageDefinition> = [
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE,
];

export { EXPLORE_PAGE, RELEASE_NOTES_PAGE };
