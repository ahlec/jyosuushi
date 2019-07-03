import { ComponentClass } from "react";

import ExplorePageIcon from "./explore/explore-icon.svg";
import ExplorePage from "./explore/ExplorePage";
import FeedbackPageIcon from "./feedback/feedback-icon.svg";
import FeedbackPage from "./feedback/FeedbackPage";
import PreparePageIcon from "./prepare/prepare-icon.svg";
import PreparePage from "./prepare/PreparePage";
import ReleaseNotesPageIcon from "./release-notes/release-notes-icon.svg";
import ReleaseNotesPage from "./release-notes/ReleaseNotesPage";

export interface PageDefinition {
  component: ComponentClass;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>, any>;
  name: string;
  path: string;
}

const PREPARE_PAGE: PageDefinition = {
  component: PreparePage,
  icon: PreparePageIcon,
  name: "Prepare",
  path: ""
};

const EXPLORE_PAGE: PageDefinition = {
  component: ExplorePage,
  icon: ExplorePageIcon,
  name: "Explore",
  path: "/explore"
};

export const RELEASE_NOTES_PATH = "/release-notes";
const RELEASE_NOTES_PAGE: PageDefinition = {
  component: ReleaseNotesPage,
  icon: ReleaseNotesPageIcon,
  name: "Release Notes",
  path: RELEASE_NOTES_PATH
};

const FEEDBACK_PAGE: PageDefinition = {
  component: FeedbackPage,
  icon: FeedbackPageIcon,
  name: "Feedback",
  path: "/feedback"
};

export const LANDING_PAGE = PREPARE_PAGE;
export const UNORDERED_NESTED_PAGES: ReadonlyArray<PageDefinition> = [
  EXPLORE_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE
];

export const ORDERED_SIDEBAR_PAGES: ReadonlyArray<PageDefinition> = [
  LANDING_PAGE,
  EXPLORE_PAGE,
  RELEASE_NOTES_PAGE,
  FEEDBACK_PAGE
];
