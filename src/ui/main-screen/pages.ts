import { ComponentClass } from "react";

import Localization from "../../localization";

import ExplorePageIcon from "./explore/explore-icon.svg";
import ExplorePage from "./explore/ExplorePage";
import { EXPLORE_PAGE_PATH } from "./explore/pathing";
import FeedbackPageIcon from "./feedback/feedback-icon.svg";
import FeedbackPage from "./feedback/FeedbackPage";
import PreparePageIcon from "./prepare/prepare-icon.svg";
import PreparePage from "./prepare/PreparePage";
import ReleaseNotesPageIcon from "./release-notes/release-notes-icon.svg";
import ReleaseNotesPage from "./release-notes/ReleaseNotesPage";
import SettingsPageIcon from "./settings/settings-icon.svg";
import SettingsPage from "./settings/SettingsPage";

export interface PageDefinition {
  component: ComponentClass;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>, any>;
  getName: (localization: Localization) => string;
  path: string;
}

const PREPARE_PAGE: PageDefinition = {
  component: PreparePage,
  getName: localization => localization.pagePrepare,
  icon: PreparePageIcon,
  path: ""
};

const EXPLORE_PAGE: PageDefinition = {
  component: ExplorePage,
  getName: localization => localization.pageExplore,
  icon: ExplorePageIcon,
  path: EXPLORE_PAGE_PATH
};

const SETTINGS_PAGE: PageDefinition = {
  component: SettingsPage,
  getName: localization => localization.pageSettings,
  icon: SettingsPageIcon,
  path: "/settings"
};

export const RELEASE_NOTES_PATH = "/release-notes";
const RELEASE_NOTES_PAGE: PageDefinition = {
  component: ReleaseNotesPage,
  getName: localization => localization.pageReleaseNotes,
  icon: ReleaseNotesPageIcon,
  path: RELEASE_NOTES_PATH
};

const FEEDBACK_PAGE: PageDefinition = {
  component: FeedbackPage,
  getName: localization => localization.pageFeedback,
  icon: FeedbackPageIcon,
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
