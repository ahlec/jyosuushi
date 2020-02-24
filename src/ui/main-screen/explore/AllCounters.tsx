import { memoize, values } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { COUNTERS_LOOKUP } from "@data/counters";
import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import CounterLink from "@jyosuushi/ui/main-screen/CounterLink";

import "./AllCounters.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

const getAllCountersSorted = memoize((localization: Localization) => {
  const allCounters = values(COUNTERS_LOOKUP);
  allCounters.sort((a, b) =>
    localization.counterName(a).localeCompare(localization.counterName(b))
  );
  return allCounters;
});

class AllCounters extends React.PureComponent<ReduxProps> {
  public render(): React.ReactNode {
    const { localization } = this.props;
    const allCounters = getAllCountersSorted(localization);
    return (
      <div className="AllCounters">
        <h3>Counters</h3>
        <div className="list">{allCounters.map(this.renderStudyPack)}</div>
      </div>
    );
  }

  private renderStudyPack = (counter: Counter): React.ReactNode => {
    return <CounterLink key={counter.counterId} counter={counter} />;
  };
}

export default connect(mapStateToProps)(AllCounters);
