import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";

import CHANGELOG, {
  ChangelogVersion,
  isFirstVersion,
  ConsumerFacingEntry,
  BugFixEntry,
  BugFixBrowser,
} from "@changelog";

import { markLatestVersion } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";

import Markdown from "./Markdown";

import styles from "./ReleaseNotesPage.scss";

const BROWSER_NAMES: { [browser in BugFixBrowser]: string } = {
  chrome: "Chrome",
  edge: "Microsoft Edge",
  firefox: "Firefox",
  ie: "Internet Explorer",
  safari: "Safari",
};

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
            "Initial release."
          ) : (
            <React.Fragment>
              {this.renderNotesSection(
                "New Features",
                version.newFeatures,
                this.renderFeatureEntry
              )}
              {this.renderNotesSection(
                "Improvements",
                version.improvements,
                this.renderFeatureEntry
              )}
              {this.renderNotesSection(
                "Bug Fixes",
                version.bugFixes,
                this.renderBugFixEntry
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  };

  private renderNotesSection<TEntry>(
    header: string,
    entries: readonly TEntry[],
    renderEntry: (entry: TEntry, index: number) => React.ReactNode
  ): React.ReactNode {
    if (!entries.length) {
      return null;
    }

    return (
      <div className={styles.notesContainer}>
        <div className={styles.notesHeader}>{header}:</div>
        <ul>{entries.map(renderEntry)}</ul>
      </div>
    );
  }

  private renderFeatureEntry(
    entry: ConsumerFacingEntry,
    index: number
  ): React.ReactNode {
    return (
      <li key={index} className={styles.entry}>
        <span className={styles.label}>{entry.label}</span>{" "}
        <Markdown source={entry.details} />
      </li>
    );
  }

  private renderBugFixEntry(
    entry: BugFixEntry,
    index: number
  ): React.ReactNode {
    return (
      <li key={index} className={classnames(styles.entry, styles.bugfix)}>
        {entry.browser && (
          <React.Fragment>
            [
            <span className={styles.browser}>
              {BROWSER_NAMES[entry.browser]}
            </span>
            ]{" "}
          </React.Fragment>
        )}
        <Markdown source={entry.text} />
      </li>
    );
  }
}

export default connect()(ReleaseNotesPage);
