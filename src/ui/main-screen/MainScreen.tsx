import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";

import { State } from "@jyosuushi/redux";
import { PageDefinition } from "@jyosuushi/ui/types";

import useUserCollections from "@jyosuushi/hooks/useUserCollections";

import Sidebar from "./sidebar/Sidebar";

import {
  PREPARE_PAGE,
  RELEASE_NOTES_PAGE,
  UNORDERED_NESTED_PAGES,
} from "./pages";

import * as styles from "./MainScreen.scss";

function MainScreen(): React.ReactElement {
  // Retrieve the list of custom user collections
  const { createUserCollection, userCollections } = useUserCollections();

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
  }: PageDefinition): React.ReactElement => {
    let path = primaryPath;
    if (!path.endsWith("/")) {
      path += "/";
    }

    path += "*";

    return (
      <Route
        key={primaryPath}
        path={path}
        element={
          <PageComponent
            createUserCollection={createUserCollection}
            userCollections={userCollections}
          />
        }
      />
    );
  };

  // Render the component
  return (
    <div className={styles.mainScreen}>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          {UNORDERED_NESTED_PAGES.map(renderPageRoute)}
          {renderPageRoute(PREPARE_PAGE)}
        </Routes>
      </div>
      {shouldRedirectToReleaseNotes && (
        <Navigate to={RELEASE_NOTES_PAGE.primaryPath} />
      )}
    </div>
  );
}

export default MainScreen;
