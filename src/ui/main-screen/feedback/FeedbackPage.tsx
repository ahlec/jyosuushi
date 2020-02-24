import * as React from "react";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import BugIcon from "@jyosuushi/ui/FeedbackFooter/bug.png";
import CommentsIcon from "@jyosuushi/ui/FeedbackFooter/comments.png";
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
    description: (localization): string =>
      localization.feedbackPageSubmitFeedbackDescription,
    icon: CommentsIcon,
    linkText: (localization): string =>
      localization.feedbackPageSubmitFeedbackLink,
    url: CONFIG_FEEDBACK_FORM_LINK
  },
  {
    description: (localization): string =>
      localization.feedbackPageReportBugDescription,
    icon: BugIcon,
    linkText: (localization): string => localization.feedbackPageReportBugLink,
    url: CONFIG_BUG_REPORT_FORM_LINK
  },
  {
    description: (localization): string =>
      localization.feedbackPageHelpContributeDescription,
    icon: CodeIcon,
    linkText: (localization): string =>
      localization.feedbackPageHelpContributeLink,
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
  public render(): React.ReactNode {
    const { localization } = this.props;
    return (
      <div className="FeedbackPage">
        <p className="intro">{localization.feedbackPageIntro}</p>
        <hr />
        {LINKS.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = (link: LinkEntry): React.ReactNode => {
    const { localization } = this.props;
    return (
      <p key={link.url} className="link-entry">
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.icon} /> <strong>{link.linkText(localization)}</strong>
        </a>
        {". "}
        <span className="small">{link.description(localization)}</span>
      </p>
    );
  };
}

export default connect(mapStateToProps)(FeedbackPage);
