import * as React from "react";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";

import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import Furigana from "@jyosuushi/ui/Furigana";

import BetaBanner from "./BetaBanner";

import SakuraIcon from "./sakura.svg";

import "./index.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

class Header extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="Header home resting-home">
        <SakuraIcon className="sakura" />{" "}
        <React.Fragment>
          <div className="main">
            <Furigana furigana="じょすうし" text="助数詞" />を
            <Furigana furigana="れんしゅう" text="練習" />
          </div>
          <div className="subheader">{localization.siteTagline}</div>
          <BetaBanner localization={localization} />
        </React.Fragment>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
