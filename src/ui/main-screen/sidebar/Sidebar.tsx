import React from "react";
import { defineMessages } from "react-intl";

import {
  EXPLORE_PAGE,
  FEEDBACK_PAGE,
  PREPARE_PAGE,
  RELEASE_NOTES_PAGE,
  SETTINGS_PAGE,
} from "@jyosuushi/ui/main-screen/pages";

import ExplorePageIcon from "./explore-icon.svg";
import FeedbackPageIcon from "./feedback-icon.svg";
import PreparePageIcon from "./prepare-icon.svg";
import ReleaseNotesPageIcon from "./release-notes-icon.svg";
import SettingsPageIcon from "./settings-icon.svg";

import SidebarEntry from "./SidebarEntry";
import styles from "./Sidebar.scss";

const INTL_MESSAGES = defineMessages({
  explorePage: {
    defaultMessage: "Explore",
    id: "Sidebar.pages.explore",
  },
  feedbackPage: {
    defaultMessage: "Feedback",
    id: "Sidebar.pages.feedback",
  },
  preparePage: {
    defaultMessage: "Prepare",
    id: "Sidebar.pages.prepare",
  },
  releaseNotesPage: {
    defaultMessage: "Release Notes",
    id: "Sidebar.pages.releaseNotes",
  },
  settingsPage: {
    defaultMessage: "Settings",
    id: "Sidebar.pages.settings",
  },
});

function Sidebar(): React.ReactElement {
  // Render the component
  return (
    <div className={styles.sidebar}>
      <SidebarEntry
        icon={PreparePageIcon}
        page={PREPARE_PAGE}
        text={INTL_MESSAGES.preparePage}
      />
      <SidebarEntry
        icon={ExplorePageIcon}
        page={EXPLORE_PAGE}
        text={INTL_MESSAGES.explorePage}
      />
      <SidebarEntry
        icon={SettingsPageIcon}
        page={SETTINGS_PAGE}
        text={INTL_MESSAGES.settingsPage}
      />
      <SidebarEntry
        icon={ReleaseNotesPageIcon}
        page={RELEASE_NOTES_PAGE}
        text={INTL_MESSAGES.releaseNotesPage}
      />
      <SidebarEntry
        icon={FeedbackPageIcon}
        page={FEEDBACK_PAGE}
        text={INTL_MESSAGES.feedbackPage}
      />
    </div>
  );
}

export default Sidebar;
