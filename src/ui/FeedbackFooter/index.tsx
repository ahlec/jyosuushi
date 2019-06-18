import * as React from "react";

import Localization, {
  FeedbackFooterPiece,
  VARIABLE_REPORT_BUG_LINK,
  VARIABLE_SUBMIT_FEEDBACK_LINK
} from "../../localization";

import BugIcon from "./bug.png";
import CommentsIcon from "./comments.png";
import "./index.scss";

interface ComponentProps {
  localization: Localization;
}

export default class FeedbackFooter extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="FeedbackFooter">
        {localization.feedbackFooter.map(this.renderPiece)}
      </div>
    );
  }

  private renderPiece = (piece: FeedbackFooterPiece) => {
    const { localization } = this.props;
    switch (piece) {
      case VARIABLE_REPORT_BUG_LINK:
        return (
          <span
            key={VARIABLE_REPORT_BUG_LINK}
            className="link"
            onClick={this.onClickBug}
          >
            <img src={BugIcon} /> {localization.reportABug}
          </span>
        );
      case VARIABLE_SUBMIT_FEEDBACK_LINK:
        return (
          <a
            key={VARIABLE_SUBMIT_FEEDBACK_LINK}
            href={CONFIG_FEEDBACK_FORM_LINK}
            target="_blank"
          >
            <img src={CommentsIcon} /> {localization.submitFeedback}
          </a>
        );
      default:
        return piece;
    }
  };

  /* tslint:disable */

  private onClickBug = () => {
    console.log("x");
  };
}
