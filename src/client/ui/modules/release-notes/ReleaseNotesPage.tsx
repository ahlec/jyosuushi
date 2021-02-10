import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import CHANGELOG, { ChangelogVersion, isFirstVersion } from "@changelog";

import { markLatestVersion } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";

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

type ComponentProps = { dispatch: Dispatch };

class ReleaseNotesPage extends React.PureComponent<ComponentProps> {
  public componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(markLatestVersion());
  }

  public render(): React.ReactNode {
    return (
      <div className={styles.releaseNotesPage}>
        {CHANGELOG.map(this.renderVersion)}
      </div>
    );
  }

  private renderVersion = (version: ChangelogVersion): React.ReactNode => {
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
  };
}

export default connect()(ReleaseNotesPage);
