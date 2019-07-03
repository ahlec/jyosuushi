import * as React from "react";

import BugIcon from "../../FeedbackFooter/bug.png";
import CommentsIcon from "../../FeedbackFooter/comments.png";

import "./BetaExplanation.scss";

export default class BetaExplanation extends React.PureComponent {
  public render() {
    return (
      <div className="BetaExplanation">
        We're in open beta right now! I hope you enjoy the application and give
        me{" "}
        <a href={CONFIG_FEEDBACK_FORM_LINK} target="_blank">
          <img src={CommentsIcon} /> <span>your feedback and ideas</span>
        </a>{" "}
        for improving it! But also, please expect the unfortunate bug or
        mistake, and use the{" "}
        <a href={CONFIG_BUG_REPORT_FORM_LINK} target="_blank">
          <img src={BugIcon} /> <span>bug report</span>
        </a>{" "}
        link to let me know! Expect updates frequently!
      </div>
    );
  }
}
