import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { EXPLORE_STUDY_PACK_PATH } from "./constants";

import AllStudyPacks from "./AllStudyPacks";
import ExploreStudyPackPage from "./study-pack/ExploreStudyPackPage";

export default class ExplorePage extends React.PureComponent {
  public render() {
    return (
      <Switch>
        <Route
          path={EXPLORE_STUDY_PACK_PATH}
          component={ExploreStudyPackPage}
        />
        <Route render={this.renderLandingPage} />
      </Switch>
    );
  }

  private renderLandingPage = () => {
    return <AllStudyPacks />;
  };
}
