import { ComponentClass } from "react";

import ExplorePage from "./explore/ExplorePage";
import FeedbackPage from "./feedback/FeedbackPage";
import PreparePage from "./prepare/PreparePage";
import ReleaseNotesPage from "./release-notes/ReleaseNotesPage";
import SettingsPage from "./settings/SettingsPage";

export interface PageDefinition {
  component: ComponentClass;
  path: string;
}

const PREPARE_PAGE: PageDefinition = {
  component: PreparePage,
  path: ""
};

const EXPLORE_PAGE: PageDefinition = {
  component: ExplorePage,
  path: "/explore"
};

const SETTINGS_PAGE: PageDefinition = {
  component: SettingsPage,
  path: "/settings"
};

const RELEASE_NOTES_PAGE: PageDefinition = {
  component: ReleaseNotesPage,
  path: "/release-notes"
};

const FEEDBACK_PAGE: PageDefinition = {
  component: FeedbackPage,
  path: "/feedback"
};

export const LANDING_PAGE = PREPARE_PAGE;
export const UNORDERED_NESTED_PAGES: ReadonlyArray<PageDefinition> = [
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE
];

export const ORDERED_SIDEBAR_PAGES: ReadonlyArray<PageDefinition> = [
  LANDING_PAGE,
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE
];
