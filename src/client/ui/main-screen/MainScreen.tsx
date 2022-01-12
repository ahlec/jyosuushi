import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { State } from "@jyosuushi/redux";
import { PageDefinition } from "@jyosuushi/ui/types";

import Sidebar from "./sidebar/Sidebar";

import {
  PREPARE_PAGE,
  RELEASE_NOTES_PAGE,
  UNORDERED_NESTED_PAGES,
} from "./pages";

import styles from "./MainScreen.scss";

function MainScreen(): React.ReactElement {
  // Determine whether a new version has been released since the user last
  // visited and they should be redirected to the release notes page
  const shouldRedirectToReleaseNotes = useSelector((state: State): boolean => {
    const { lastAccessedVersion } = state.user;
    return (
      !!lastAccessedVersion && lastAccessedVersion !== JYOSUUSHI_CURRENT_SEMVER
    );
  });

  // Make a render function that converts a `PageDefinition` into a `<Route />`
  const renderPageRoute = ({
    component: PageComponent,
    primaryPath,
  }: PageDefinition): React.ReactElement => (
    <Route
      key={primaryPath}
      path={primaryPath || "/"}
      render={(): React.ReactElement => <PageComponent />}
    />
  );

  // Render the component
  return (
    <div className={styles.mainScreen}>
      <Sidebar />
      <div className={styles.content}>
        <Switch>
          {UNORDERED_NESTED_PAGES.map(renderPageRoute)}
          {renderPageRoute(PREPARE_PAGE)}
        </Switch>
      </div>
      {shouldRedirectToReleaseNotes && (
        <Redirect to={RELEASE_NOTES_PAGE.primaryPath} />
      )}
    </div>
  );
}

export default MainScreen;
