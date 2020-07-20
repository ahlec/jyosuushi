import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import { getCounterLink } from "./explore/pathing";

import "./CounterTile.scss";

interface ProvidedProps {
  counter: Counter;
}

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state),
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class CounterTile extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { counter, localization } = this.props;
    return (
      <Link className="CounterTile" to={getCounterLink(counter)}>
        <div className="kanji">{getPrimaryJapaneseRepresentation(counter)}</div>
        <div className="name">{localization.counterName(counter)}</div>
      </Link>
    );
  }
}

export default connect(mapStateToProps)(CounterTile);