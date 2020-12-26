import React, { useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import { EXPLORE_COUNTER_PATH, EXPLORE_STUDY_PACK_PATH } from "./pathing";

import AllCounters from "./AllCounters";
import AllStudyPacks from "./AllStudyPacks";
import BreadcrumbBar from "./BreadcrumbBar";
import ExploreCounterPage from "./counter/ExploreCounterPage";
import ExploreStudyPackPage from "./study-pack/ExploreStudyPackPage";

import styles from "./ExplorePage.scss";

function ExplorePage(): React.ReactElement {
  // Create a memoized function to render the fallback, main page
  const renderLandingPage = useCallback(
    (): React.ReactElement => (
      <div className={styles.explorePageLanding}>
        <BreadcrumbBar />
        <div className={styles.contents}>
          <AllStudyPacks />
          <AllCounters />
        </div>
      </div>
    ),
    []
  );

  // Render the component
  return (
    <Switch>
      <Route path={EXPLORE_STUDY_PACK_PATH} component={ExploreStudyPackPage} />
      <Route path={EXPLORE_COUNTER_PATH} component={ExploreCounterPage} />
      <Route render={renderLandingPage} />
    </Switch>
  );
}

export default ExplorePage;
