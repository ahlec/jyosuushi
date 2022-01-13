import React, { useEffect } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import CHANGELOG, { ChangelogVersion, isFirstVersion } from "@changelog";

import { markLatestVersion } from "@jyosuushi/redux/actions";

import IncrementalVersionDisplay from "./IncrementalVersionDisplay";

import styles from "./ReleaseNotesPage.scss";

const INTL_MESSAGES = defineMessages({
  specialVersionNotesInitialRelease: {
    defaultMessage: "Initial release.",
    description:
      "Text to appear in place of release notes for the version that was the initial release.",
    id: "releaseNotes.specialVersionNotes.initialRelease",
  },
});

function ReleaseNotesPage(): React.ReactElement {
  // Connect with the rest of the app
  const dispatch = useDispatch();

  // When the user visits this page, it should mark that the user has seen the
  // patch notes for the latest version
  useEffect((): void => {
    dispatch(markLatestVersion());
  }, [dispatch]);

  // Render the component
  return (
    <div className={styles.releaseNotesPage}>
      {CHANGELOG.map(
        (version: ChangelogVersion): React.ReactNode => {
          return (
            <div key={version.version} className={styles.versionContainer}>
              <div className={styles.versionHeader}>
                {version.version}{" "}
                <span className={styles.date}>({version.date})</span>
              </div>
              <div className={styles.contents}>
                {isFirstVersion(version) ? (
                  <FormattedMessage
                    {...INTL_MESSAGES.specialVersionNotesInitialRelease}
                  />
                ) : (
                  <IncrementalVersionDisplay version={version} />
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default ReleaseNotesPage;
