import React from "react";
import { Route, Routes } from "react-router";

import { PageComponentProps } from "@jyosuushi/ui/types";

import LandingView from "./pages/landing/LandingView";
import useExploreRoutes from "./useExploreRoutes";

function ExplorePage({
  createUserCollection,
  userCollections,
}: PageComponentProps): React.ReactElement {
  // Process the current data we have into routes
  const routes = useExploreRoutes({
    userCollections,
  });

  // Render the component
  return (
    <Routes>
      {routes.map(
        (route): React.ReactElement => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        )
      )}
      <Route
        path="/"
        element={
          <LandingView
            createUserCollection={createUserCollection}
            userCollections={userCollections}
          />
        }
      />
    </Routes>
  );
}

export default ExplorePage;
