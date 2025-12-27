import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import IconGitHub from "./github.svg";
import IconTwitter from "./twitter.svg";

import FeedbackLink from "./FeedbackLink";
import * as styles from "./FeedbackPage.scss";

const INTL_MESSAGES = defineMessages({
  contributeDescription: {
    defaultMessage:
      "Officially submit bug reports or feature requests. Or, fork the repository and open a pull request — I'd love help on this project!",
    id: "feedbackPage.links.contribute.description",
  },
  contributeLink: {
    defaultMessage: "GitHub Repository",
    id: "feedbackPage.links.contribute.link",
  },
  pageIntro: {
    defaultMessage:
      "The project is open source and accepting bug reports, feature requests, and code contributions!",
    id: "feedbackPage.intro",
  },
  personalTwitterDescription: {
    defaultMessage:
      "Send me a tweet or a direct message if you're not able to go through GitHub.",
    id: "feedbackPage.links.personalTwitter.description",
  },
  personalTwitterText: {
    defaultMessage: "@AlecDeitloff",
    id: "feedbackPage.links.personalTwitter.link",
  },
});

function FeedbackPage(): React.ReactElement {
  return (
    <div className={styles.feedbackPage}>
      <p className={styles.intro}>
        <FormattedMessage {...INTL_MESSAGES.pageIntro} />
      </p>
      <hr />
      <FeedbackLink
        className={styles.linkEntry}
        description={INTL_MESSAGES.contributeDescription}
        icon={IconGitHub}
        text={INTL_MESSAGES.contributeLink}
        url="https://github.com/ahlec/jyosuushi"
      />
      <FeedbackLink
        className={styles.linkEntry}
        description={INTL_MESSAGES.personalTwitterDescription}
        icon={IconTwitter}
        text={INTL_MESSAGES.personalTwitterText}
        url="https://twitter.com/AlecDeitloff"
      />
    </div>
  );
}

export default FeedbackPage;
