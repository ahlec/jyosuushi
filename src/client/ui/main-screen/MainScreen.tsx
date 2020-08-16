import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { State } from "@jyosuushi/redux";

import Sidebar from "./sidebar/Sidebar";

import {
  PREPARE_PAGE,
  PageDefinition,
  RELEASE_NOTES_PAGE,
  UNORDERED_NESTED_PAGES,
} from "./pages";

import styles from "./MainScreen.scss";

interface ReduxProps {
  shouldRedirectToReleaseNotes: boolean;
}

function mapStateToProps(state: State): ReduxProps {
  const { lastAccessedVersion } = state.user;
  return {
    shouldRedirectToReleaseNotes:
      !!lastAccessedVersion && lastAccessedVersion !== JYOSUUSHI_CURRENT_SEMVER,
  };
}

class MainScreen extends React.PureComponent<ReduxProps> {
  public render(): React.ReactNode {
    const { shouldRedirectToReleaseNotes } = this.props;
    return (
      <div className={styles.mainScreen}>
        <Sidebar />
        <div className={styles.content}>
          <Switch>
            {UNORDERED_NESTED_PAGES.map(this.renderRoute)}
            {this.renderRoute(PREPARE_PAGE)}
          </Switch>
        </div>
        {shouldRedirectToReleaseNotes && (
          <Redirect to={RELEASE_NOTES_PAGE.primaryPath} />
        )}
      </div>
    );
  }

  private renderRoute = ({
    component,
    primaryPath,
  }: PageDefinition): React.ReactNode => {
    return (
      <Route
        key={primaryPath}
        path={primaryPath || "/"}
        component={component}
      />
    );
  };
}

export default connect(mapStateToProps)(MainScreen);
