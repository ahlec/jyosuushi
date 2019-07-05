import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Counter } from "../../interfaces";
import Localization from "../../localization";
import { State } from "../../redux";
import { getLocalization } from "../../redux/selectors";

import { getCounterLink } from "./explore/pathing";

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
      <Link className="CounterLink" to={getCounterLink(counter)}>
        <div className="kanji">{counter.kanji}</div>
        <div className="name">{localization.counterName(counter)}</div>
      </Link>
    );
  }
}

export default connect(mapStateToProps)(CounterLink);
