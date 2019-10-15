import * as React from "react";
import { connect } from "react-redux";

import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import Localization, {
  CreditsPiece,
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_FAVICON_CREDIT_LINK,
  VARIABLE_ICON_CREDIT_LINK,
  VARIABLE_SILK_ICONS_CREDIT_LINK
} from "@jyosuushi/localization";

import "./CreditsFooter.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

class CreditsFooter extends React.PureComponent<ReduxProps> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="CreditsFooter">
        {localization.credits.map(this.renderCredit)}
      </div>
    );
  }

  private renderCredit = (piece: CreditsPiece) => {
    switch (piece) {
      case VARIABLE_ALEC_DEITLOFF:
        return (
          <a
            key={VARIABLE_ALEC_DEITLOFF}
            href="http://alec.deitloff.com"
            target="_blank"
          >
            {this.props.localization.alecDeitloff}
          </a>
        );
      case VARIABLE_ICON_CREDIT_LINK:
        return (
          <React.Fragment key={VARIABLE_ICON_CREDIT_LINK}>
            <a
              href="https://www.iconfinder.com/iconsets/core-ui-outlined"
              target="_blank"
            >
              Core - UI - Outlined
            </a>
          </React.Fragment>
        );
      case VARIABLE_FAVICON_CREDIT_LINK:
        return (
          <a
            key={VARIABLE_FAVICON_CREDIT_LINK}
            href="https://www.flaticon.com/packs/chinese-new-year-12"
            target="_blank"
          >
            Freepik
          </a>
        );
      case VARIABLE_SILK_ICONS_CREDIT_LINK:
        return (
          <a
            key={VARIABLE_SILK_ICONS_CREDIT_LINK}
            href="http://www.famfamfam.com/lab/icons/silk/"
            target="_blank"
          >
            Silk
          </a>
        );
      default:
        return piece;
    }
  };
}

export default connect(mapStateToProps)(CreditsFooter);
