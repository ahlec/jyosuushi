import React, { useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import { PageComponentProps } from "@jyosuushi/ui/types";

import useExploreRoutes from "./hooks/useExploreRoutes";
import LandingView from "./pages/landing/LandingView";

function ExplorePage({
  userCollections,
  userCollectionsManager,
}: PageComponentProps): React.ReactElement {
  // Create a memoized function to render the fallback, main page
  const renderLandingPage = useCallback(
    (): React.ReactElement => (
      <LandingView
        userCollections={userCollections}
        userCollectionsManager={userCollectionsManager}
      />
    ),
    [userCollections, userCollectionsManager]
  );

  // Process the current data we have into routes
  const routes = useExploreRoutes({
    userCollections,
    userCollectionsManager,
  });

  // Render the component
  return (
    <Switch>
      {routes.map(
        (route): React.ReactElement => (
          <Route key={route.key} path={route.path} render={route.component} />
        )
      )}
      <Route render={renderLandingPage} />
    </Switch>
  );
}

export default ExplorePage;
