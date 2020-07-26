import * as React from "react";
import { defineMessages, MessageDescriptor } from "react-intl";
import { ConnectedComponent } from "react-redux";

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

const INTL_MESSAGES = defineMessages({
  exploreName: {
    defaultMessage: "Explore",
    id: "main-screen.pages.explore.name",
  },
  feedbackName: {
    defaultMessage: "Feedback",
    id: "main-screen.pages.feedback.name",
  },
  prepareName: {
    defaultMessage: "Prepare",
    id: "main-screen.pages.prepare.name",
  },
  releaseNotesName: {
    defaultMessage: "Release Notes",
    id: "main-screen.pages.releaseNotes.name",
  },
  settingsName: {
    defaultMessage: "Settings",
    id: "main-screen.pages.settings.name",
  },
});

export interface PageDefinition {
  component:
    | React.ComponentType
    | ConnectedComponent<React.ComponentType, unknown>;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  name: MessageDescriptor;
  path: string;
}

const PREPARE_PAGE: PageDefinition = {
  component: PreparePage,
  icon: PreparePageIcon,
  name: INTL_MESSAGES.prepareName,
  path: "",
};

const EXPLORE_PAGE: PageDefinition = {
  component: ExplorePage,
  icon: ExplorePageIcon,
  name: INTL_MESSAGES.exploreName,
  path: EXPLORE_PAGE_PATH,
};

const SETTINGS_PAGE: PageDefinition = {
  component: SettingsPage,
  icon: SettingsPageIcon,
  name: INTL_MESSAGES.settingsName,
  path: "/settings",
};

export const RELEASE_NOTES_PATH = "/release-notes";
const RELEASE_NOTES_PAGE: PageDefinition = {
  component: ReleaseNotesPage,
  icon: ReleaseNotesPageIcon,
  name: INTL_MESSAGES.releaseNotesName,
  path: RELEASE_NOTES_PATH,
};

const FEEDBACK_PAGE: PageDefinition = {
  component: FeedbackPage,
  icon: FeedbackPageIcon,
  name: INTL_MESSAGES.feedbackName,
  path: "/feedback",
};

export const LANDING_PAGE = PREPARE_PAGE;
export const UNORDERED_NESTED_PAGES: ReadonlyArray<PageDefinition> = [
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE,
];

export const ORDERED_SIDEBAR_PAGES: ReadonlyArray<PageDefinition> = [
  LANDING_PAGE,
  EXPLORE_PAGE,
  SETTINGS_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE,
];
