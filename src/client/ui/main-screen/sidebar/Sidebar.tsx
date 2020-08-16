import React from "react";
import { defineMessages } from "react-intl";

import { useSidebarCurrentUserQuery } from "@jyosuushi/graphql/types.generated";

import {
  EXPLORE_PAGE,
  FEEDBACK_PAGE,
  LOGIN_PAGE,
  PREPARE_PAGE,
  PROFILE_PAGE,
  RELEASE_NOTES_PAGE,
  SETTINGS_PAGE,
  PageDefinition,
} from "@jyosuushi/ui/main-screen/pages";

import ExplorePageIcon from "./explore-icon.svg";
import FeedbackPageIcon from "./feedback-icon.svg";
import LoginPageIcon from "./login-icon.svg";
import PreparePageIcon from "./prepare-icon.svg";
import ProfilePageIcon from "./profile-icon.svg";
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
  loginPage: {
    defaultMessage: "Login",
    id: "Sidebar.pages.login",
  },
  preparePage: {
    defaultMessage: "Prepare",
    id: "Sidebar.pages.prepare",
  },
  profilePage: {
    defaultMessage: "Your Profile",
    id: "Sidebar.pages.profile",
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
  // Connect to GraphQL to determine whether we're logged in, and who we are if we are
  const { data, loading } = useSidebarCurrentUserQuery();

  // Determine the user-related sidebar link
  let userLinkPage: PageDefinition | null;
  if (loading || !data) {
    userLinkPage = null;
  } else if (data.activeUser) {
    userLinkPage = PROFILE_PAGE;
  } else {
    userLinkPage = LOGIN_PAGE;
  }

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
      <SidebarEntry
        icon={
          !loading && data && data.activeUser ? ProfilePageIcon : LoginPageIcon
        }
        page={userLinkPage}
        text={
          !loading && data && data.activeUser
            ? INTL_MESSAGES.profilePage
            : INTL_MESSAGES.loginPage
        }
      />
    </div>
  );
}

export default Sidebar;
