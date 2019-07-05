import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../../localization";
import { State } from "../../../redux";
import { getLocalization } from "../../../redux/selectors";

import BugIcon from "../../FeedbackFooter/bug.png";
import CommentsIcon from "../../FeedbackFooter/comments.png";
import CodeIcon from "./code.png";

import "./FeedbackPage.scss";

interface LinkEntry {
  description: (localization: Localization) => string;
  icon: string;
  linkText: (localization: Localization) => string;
  url: string;
}

const LINKS: ReadonlyArray<LinkEntry> = [
  {
    description: () =>
      "Share with me anything that you'd like to see happen, or any ideas on how I can improve this service!",
    icon: CommentsIcon,
    linkText: () => "Submit feedback and ideas",
    url: CONFIG_FEEDBACK_FORM_LINK
  },
  {
    description: () =>
      "Please help me make a more perfect service! A brief description of the problem (or a mistake with Japanese!) will help me track it down and fix it right away!",
    icon: BugIcon,
    linkText: () => "Report a bug",
    url: CONFIG_BUG_REPORT_FORM_LINK
  },
  {
    description: () =>
      "The project is open source, and if you'd like to join in on working on the project, check out my GitHub!",
    icon: CodeIcon,
    linkText: () => "Help contribute",
    url: "https://github.com/ahlec/jyosuushi"
  }
];

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

class FeedbackPage extends React.PureComponent<ReduxProps> {
  public render() {
    return (
      <div className="FeedbackPage">
        <p>
          We're in open beta right now! I hope you enjoy the application! Expect
          updates frequently!
        </p>
        <hr />
        {LINKS.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = (link: LinkEntry) => {
    const { localization } = this.props;
    return (
      <p key={link.url}>
        <a href={link.url} target="_blank">
          <img src={link.icon} /> <strong>{link.linkText(localization)}</strong>
        </a>
        {". "}
        <span className="small">{link.description(localization)}</span>
      </p>
    );
  };
}

export default connect(mapStateToProps)(FeedbackPage);
