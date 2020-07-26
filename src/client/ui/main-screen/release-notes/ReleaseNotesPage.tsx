import classnames from "classnames";
import React from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
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

const INTL_MESSAGES = defineMessages({
  browserChrome: {
    defaultMessage: "Chrome",
    id: "releaseNotes.browserNames.chrome",
  },
  browserEdge: {
    defaultMessage: "Microsoft Edge",
    id: "releaseNotes.browserNames.edge",
  },
  browserFirefox: {
    defaultMessage: "Firefox",
    id: "releaseNotes.browserNames.firefox",
  },
  browserIE: {
    defaultMessage: "Internet Explorer",
    id: "releaseNotes.browserNames.ie",
  },
  browserSafari: {
    defaultMessage: "Safari",
    id: "releaseNotes.browserNames.safari",
  },
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
  specialVersionNotesInitialRelease: {
    defaultMessage: "Initial release.",
    description:
      "Text to appear in place of release notes for the version that was the initial release.",
    id: "releaseNotes.specialVersionNotes.initialRelease",
  },
});

const BROWSER_NAMES: { [browser in BugFixBrowser]: MessageDescriptor } = {
  chrome: INTL_MESSAGES.browserChrome,
  edge: INTL_MESSAGES.browserEdge,
  firefox: INTL_MESSAGES.browserFirefox,
  ie: INTL_MESSAGES.browserIE,
  safari: INTL_MESSAGES.browserSafari,
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
            <FormattedMessage
              {...INTL_MESSAGES.specialVersionNotesInitialRelease}
            />
          ) : (
            <React.Fragment>
              {this.renderNotesSection(
                INTL_MESSAGES.sectionHeaderNewFeatures,
                version.newFeatures,
                this.renderFeatureEntry
              )}
              {this.renderNotesSection(
                INTL_MESSAGES.sectionHeaderImprovements,
                version.improvements,
                this.renderFeatureEntry
              )}
              {this.renderNotesSection(
                INTL_MESSAGES.sectionHeaderBugFixes,
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
    header: MessageDescriptor,
    entries: readonly TEntry[],
    renderEntry: (entry: TEntry, index: number) => React.ReactNode
  ): React.ReactNode {
    if (!entries.length) {
      return null;
    }

    return (
      <div className={styles.notesContainer}>
        <div className={styles.notesHeader}>
          <FormattedMessage {...header} />:
        </div>
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
              <FormattedMessage {...BROWSER_NAMES[entry.browser]} />
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
