import * as React from "react";

import Localization, {
  CreditsPiece,
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_ICON_CREDIT_LINK
} from "../../localization";

import PackSelection from "./PackSelection";

import "./index.scss";

interface ComponentProps {
  localization: Localization;
}

export default class IntroPage extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="IntroPage">
        <p>
          Welcome to <strong>助数詞を練習</strong>! This is a tool that's meant
          to help you study{" "}
          <a
            href="https://en.wikipedia.org/wiki/Japanese_counter_word"
            target="_blank"
          >
            Japanese counters
          </a>
          . It's simple! We take a random type of item and a random number, and
          then you tell us what the proper conjugation of the number + counter
          is!
        </p>
        <p>
          To start, choose one or more study pack below. Don't worry, you can
          change this at any time:
        </p>
        <PackSelection localization={localization} />
        <div className="flex" />
        <div className="credits">
          {localization.credits.map(this.renderCredit)}
        </div>
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
      default:
        return piece;
    }
  };
}
