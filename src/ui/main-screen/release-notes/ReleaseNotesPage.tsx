import * as React from "react";
import { connect } from "react-redux";

import CHANGELOG, {
  ChangelogVersion,
  isFirstVersion,
  ConsumerFacingEntry,
  BugFixEntry
} from "@changelog";

import { State } from "@jyosuushi/redux";
import { markLatestVersion } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import Localization from "@jyosuushi/localization";

import Markdown from "./Markdown";

import "./ReleaseNotesPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

class ReleaseNotesPage extends React.PureComponent<ComponentProps> {
  public componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(markLatestVersion());
  }

  public render(): React.ReactNode {
    return (
      <div className="ReleaseNotesPage">
        {CHANGELOG.map(this.renderVersion)}
      </div>
    );
  }

  private renderVersion = (version: ChangelogVersion): React.ReactNode => {
    return (
      <div key={version.version} className="version-container">
        <div className="version-header">
          {version.version} <span className="date">({version.date})</span>
        </div>
        <div className="contents">
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
      <div className="entries">
        <div className="header">{header}</div>
        <ul>{entries.map(renderEntry)}</ul>
      </div>
    );
  }

  private renderFeatureEntry(
    entry: ConsumerFacingEntry,
    index: number
  ): React.ReactNode {
    return (
      <li key={index} className="entry">
        <span className="label">{entry.label}</span>{" "}
        <Markdown source={entry.details} />
      </li>
    );
  }

  private renderBugFixEntry(
    entry: BugFixEntry,
    index: number
  ): React.ReactNode {
    return (
      <li key={index} className="entry">
        <Markdown source={entry.text} />
      </li>
    );
  }
}

export default connect(mapStateToProps)(ReleaseNotesPage);
