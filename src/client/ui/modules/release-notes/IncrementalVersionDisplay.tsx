import React from "react";
import { defineMessages } from "react-intl";

import {
  BugFixEntry,
  ConsumerFacingEntry,
  IncrementalVersion,
} from "@changelog";

import BugFixEntryDisplay from "./components/BugFixEntryDisplay";
import FeatureEntryDisplay from "./components/FeatureEntryDisplay";
import ReleaseNotesSection from "./components/ReleaseNotesSection";

import styles from "./IncrementalVersionDisplay.scss";

const INTL_MESSAGES = defineMessages({
  sectionHeaderBugFixes: {
    defaultMessage: "Bug Fixes",
    id: "releaseNotes.sectionHeaders.bugFixes",
  },
  sectionHeaderImprovements: {
    defaultMessage: "Improvements",
    id: "releaseNotes.sectionHeaders.improvements",
  },
  sectionHeaderNewFeatures: {
    defaultMessage: "New Features",
    id: "releaseNotes.sectionHeaders.newFeatures",
  },
});

interface ComponentProps {
  version: IncrementalVersion;
}

function renderBugFixEntry(entry: BugFixEntry): React.ReactElement {
  return <BugFixEntryDisplay entry={entry} />;
}

function renderFeatureEntry(entry: ConsumerFacingEntry): React.ReactElement {
  return <FeatureEntryDisplay entry={entry} />;
}

function IncrementalVersionDisplay({
  version,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.container}>
      {version.newFeatures.length > 0 && (
        <ReleaseNotesSection
          entries={version.newFeatures}
          header={INTL_MESSAGES.sectionHeaderNewFeatures}
          renderEntry={renderFeatureEntry}
        />
      )}
      {version.improvements.length > 0 && (
        <ReleaseNotesSection
          entries={version.improvements}
          header={INTL_MESSAGES.sectionHeaderImprovements}
          renderEntry={renderFeatureEntry}
        />
      )}
      {version.bugFixes.length > 0 && (
        <ReleaseNotesSection
          entries={version.bugFixes}
          header={INTL_MESSAGES.sectionHeaderBugFixes}
          renderEntry={renderBugFixEntry}
        />
      )}
    </div>
  );
}

export default IncrementalVersionDisplay;
