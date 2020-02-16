import * as React from "react";
import { connect } from "react-redux";

import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import "./CounterLink.scss";

interface ProvidedProps {
  counter: Counter;
}

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class CounterLink extends React.PureComponent<ComponentProps> {
  public render() {
    const { counter, localization } = this.props;
    return (
      <div className="CounterLink">
        <div className="kanji">{counter.kanji}</div>
        <div className="name">{localization.counterName(counter)}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CounterLink);
