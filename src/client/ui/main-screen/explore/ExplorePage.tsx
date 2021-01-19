import React, { useCallback } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router-dom";

import {
  StandardCounterCollection,
  UserCounterCollection,
  useAvailableCounterCollectionsQuery,
} from "@jyosuushi/graphql/types.generated";

import LoadingSpinner from "@jyosuushi/ui/components/LoadingSpinner";

import useExploreRoutes from "./hooks/useExploreRoutes";
import LandingView from "./landing/LandingView";

import styles from "./ExplorePage.scss";

const INTL_MESSAGES = defineMessages({
  serverErrorMessage: {
    defaultMessage:
      "An error has occurred. Please try back later, we're working hard to fix it!",
    id: "main.explore.ExplorePage.serverErrorMessage",
  },
});

const EMPTY_STANDARD_COLLECTIONS: readonly StandardCounterCollection[] = [];
const EMPTY_USER_COLLECITONS: readonly UserCounterCollection[] = [];

function ExplorePage(): React.ReactElement {
  // Retrieve the necessary data from the server
  const { data, error, loading } = useAvailableCounterCollectionsQuery();
  const standardCollections =
    data?.standardCounterCollections || EMPTY_STANDARD_COLLECTIONS;
  const userCollections =
    data?.userCounterCollections || EMPTY_USER_COLLECITONS;

  // Create a memoized function to render the fallback, main page
  const renderLandingPage = useCallback(
    (): React.ReactElement => (
      <LandingView
        standardCollections={standardCollections}
        userCollections={userCollections}
      />
    ),
    [standardCollections, userCollections]
  );

  // Process the current data we have into routes
  const routes = useExploreRoutes({
    standardCollections,
    userCollections,
  });

  // Render the component
  if (loading) {
    return (
      <div className={styles.fullPageWrapper}>
        <LoadingSpinner color="pink" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.fullPageWrapper}>
        <FormattedMessage {...INTL_MESSAGES.serverErrorMessage} />
      </div>
    );
  }

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
