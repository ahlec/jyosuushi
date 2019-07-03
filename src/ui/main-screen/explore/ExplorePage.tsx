import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { EXPLORE_COUNTER_PATH, EXPLORE_STUDY_PACK_PATH } from "./constants";

import AllCounters from "./AllCounters";
import AllStudyPacks from "./AllStudyPacks";
import BreadcrumbBar from "./BreadcrumbBar";
import ExploreCounterPage from "./counter/ExploreCounterPage";
import ExploreStudyPackPage from "./study-pack/ExploreStudyPackPage";

export default class ExplorePage extends React.PureComponent {
  public render() {
    return (
      <Switch>
        <Route
          path={EXPLORE_STUDY_PACK_PATH}
          component={ExploreStudyPackPage}
        />
        <Route path={EXPLORE_COUNTER_PATH} component={ExploreCounterPage} />
        <Route render={this.renderLandingPage} />
      </Switch>
    );
  }

  private renderLandingPage = () => {
    return (
      <div className="ExplorePage">
        <BreadcrumbBar />
        <AllStudyPacks />
        <AllCounters />
      </div>
    );
  };
}
