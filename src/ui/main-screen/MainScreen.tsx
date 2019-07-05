import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { State } from "../../redux";

import Sidebar from "./Sidebar";

import {
  LANDING_PAGE,
  PageDefinition,
  RELEASE_NOTES_PATH,
  UNORDERED_NESTED_PAGES
} from "./pages";

import "./MainScreen.scss";

interface ReduxProps {
  shouldRedirectToReleaseNotes: boolean;
}

function mapStateToProps(state: State): ReduxProps {
  const { lastAccessedVersion } = state.user;
  return {
    shouldRedirectToReleaseNotes:
      !!lastAccessedVersion && lastAccessedVersion !== JYOSUUSHI_CURRENT_SEMVER
  };
}

class MainScreen extends React.PureComponent<ReduxProps> {
  public render() {
    const { shouldRedirectToReleaseNotes } = this.props;
    return (
      <div className="MainScreen">
        <Sidebar />
        <div className="content">
          <Switch>
            {UNORDERED_NESTED_PAGES.map(this.renderRoute)}
            {this.renderRoute(LANDING_PAGE)}
          </Switch>
        </div>
        {shouldRedirectToReleaseNotes && <Redirect to={RELEASE_NOTES_PATH} />}
      </div>
    );
  }

  private renderRoute = ({ component, path }: PageDefinition) => {
    return <Route key={path} path={path || "/"} component={component} />;
  };
}

export default connect(mapStateToProps)(MainScreen);
