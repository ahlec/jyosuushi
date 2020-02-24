import * as React from "react";

import Localization, {
  FeedbackFooterPiece,
  VARIABLE_REPORT_BUG_LINK,
  VARIABLE_SUBMIT_FEEDBACK_LINK
} from "@jyosuushi/localization";

import BugIcon from "./bug.png";
import CommentsIcon from "./comments.png";
import "./index.scss";

interface ComponentProps {
  localization: Localization;
}

export default class FeedbackFooter extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { localization } = this.props;
    return (
      <div className="FeedbackFooter">
        {localization.feedbackFooter.map(this.renderPiece)}
      </div>
    );
  }

  private renderPiece = (piece: FeedbackFooterPiece): React.ReactNode => {
    const { localization } = this.props;
    switch (piece) {
      case VARIABLE_REPORT_BUG_LINK:
        return (
          <a
            key={VARIABLE_REPORT_BUG_LINK}
            href={CONFIG_BUG_REPORT_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={BugIcon} /> <span>{localization.reportABug}</span>
          </a>
        );
      case VARIABLE_SUBMIT_FEEDBACK_LINK:
        return (
          <a
            key={VARIABLE_SUBMIT_FEEDBACK_LINK}
            href={CONFIG_FEEDBACK_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={CommentsIcon} />{" "}
            <span>{localization.submitFeedback}</span>
          </a>
        );
      default:
        return piece;
    }
  };
}
