import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { COUNTERS_LOOKUP } from "../../../../../data/counters";
import { Counter } from "../../../../interfaces";
import Localization from "../../../../localization";
import { State } from "../../../../redux";
import { getLocalization } from "../../../../redux/selectors";

import BreadcrumbBar from "../BreadcrumbBar";

import ConjugationsSection from "./ConjugationsSection";
import InfoSection from "./InfoSection";
import ItemsSection from "./ItemsSection";

import "./ExploreCounterPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & RouteComponentProps<{ counterId: string }>;

class ExploreCounterPage extends React.PureComponent<ComponentProps> {
  private get counter(): Counter | null {
    const {
      match: {
        params: { counterId }
      }
    } = this.props;
    return COUNTERS_LOOKUP[counterId] || null;
  }

  public render() {
    const {
      counter,
      props: { localization }
    } = this;
    if (!counter) {
      return <Redirect to="/explore" />;
    }

    return (
      <div className="ExploreCounterPage">
        <BreadcrumbBar />
        <div className="contents">
          <h3>{localization.counterName(counter)}</h3>
          <div className="kanji">{counter.kanji}</div>
          <InfoSection counter={counter} localization={localization} />
          <ConjugationsSection counter={counter} localization={localization} />
          <ItemsSection counter={counter} localization={localization} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExploreCounterPage);
