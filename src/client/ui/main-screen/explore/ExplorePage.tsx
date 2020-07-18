import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { EXPLORE_COUNTER_PATH, EXPLORE_STUDY_PACK_PATH } from "./pathing";

import AllCounters from "./AllCounters";
import AllStudyPacks from "./AllStudyPacks";
import BreadcrumbBar from "./BreadcrumbBar";
import ExploreCounterPage from "./counter/ExploreCounterPage";
import ExploreStudyPackPage from "./study-pack/ExploreStudyPackPage";

import "./ExplorePage.scss";

export default class ExplorePage extends React.PureComponent {
  public render(): React.ReactNode {
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

  private renderLandingPage = (): React.ReactNode => {
    return (
      <div className="ExplorePageLanding">
        <BreadcrumbBar />
        <div className="contents">
          <AllStudyPacks />
          <AllCounters />
        </div>
      </div>
    );
  };
}
