import React, { useState } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import BugIcon from "@jyosuushi/icons/bug.png";
import CommentsIcon from "@jyosuushi/icons/comments.png";
import CodeIcon from "@jyosuushi/icons/code.png";

import { BugReportModal } from "@jyosuushi/ui/feedback/BugReport";
import { FeatureSuggestionModal } from "@jyosuushi/ui/feedback/FeatureSuggestion";

import styles from "./FeedbackPage.scss";

enum FeedbackPageModal {
  BugReport = "bug-report",
  FeatureSuggestion = "feature-suggestion",
}

type LinkEntry = {
  description: MessageDescriptor;
  icon: string;
  linkText: MessageDescriptor;
} & (
  | {
      type: "external-link";
      url: string;
    }
  | {
      type: "modal";
      id: FeedbackPageModal;
      modal: React.ComponentType<{ onRequestClose: () => void }>;
    }
);

const INTL_MESSAGES = defineMessages({
  contributeDescription: {
    defaultMessage:
      "The project is open source, and if you'd like to join in on working on the project, check out my GitHub!",
    id: "feedbackPage.links.contribute.description",
  },
  contributeLink: {
    defaultMessage: "Help contribute",
    id: "feedbackPage.links.contribute.link",
  },
  pageIntro: {
    defaultMessage:
      "We're in open beta right now and I hope you enjoy the application! Expect updates frequently!",
    id: "feedbackPage.intro",
  },
  reportBugDescription: {
    defaultMessage:
      "Please help me make a more perfect service! A brief description of the problem (or a mistake with Japanese!) will help me track it down and fix it right away!",
    id: "feedbackPage.links.reportBug.description",
  },
  reportBugLink: {
    defaultMessage: "Report a bug",
    id: "feedbackPage.links.reportBug.link",
  },
  submitFeedbackDescription: {
    defaultMessage:
      "Share with me anything that you'd like to see happen, or any ideas on how I can improve this service!",
    id: "feedbackPage.links.submitFeedback.description",
  },
  submitFeedbackLink: {
    defaultMessage: "Submit feedback and ideas",
    id: "feedbackPage.links.submitFeedback.linkText",
  },
});

const LINKS: ReadonlyArray<LinkEntry> = [
  {
    description: INTL_MESSAGES.submitFeedbackDescription,
    icon: CommentsIcon,
    id: FeedbackPageModal.FeatureSuggestion,
    linkText: INTL_MESSAGES.submitFeedbackLink,
    modal: FeatureSuggestionModal,
    type: "modal",
  },
  {
    description: INTL_MESSAGES.reportBugDescription,
    icon: BugIcon,
    id: FeedbackPageModal.BugReport,
    linkText: INTL_MESSAGES.reportBugLink,
    modal: BugReportModal,
    type: "modal",
  },
  {
    description: INTL_MESSAGES.contributeDescription,
    icon: CodeIcon,
    linkText: INTL_MESSAGES.contributeLink,
    type: "external-link",
    url: "https://github.com/ahlec/jyosuushi",
  },
];

function FeedbackPage(): React.ReactElement {
  // Define state
  const [openModal, setOpenModal] = useState<FeedbackPageModal | null>(null);

  // Handle events
  const handleRequestCloseModal = (): void => setOpenModal(null);

  // Render an individual link
  const renderLink = (link: LinkEntry, index: number): React.ReactNode => {
    let linkComponent: React.ReactElement;
    let followupComponent: React.ReactNode;
    switch (link.type) {
      case "external-link": {
        linkComponent = (
          <a
            className={styles.feedbackLink}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={link.icon} alt="" />{" "}
            <FormattedMessage {...link.linkText} tagName="strong" />
          </a>
        );
        followupComponent = null;
        break;
      }
      case "modal": {
        linkComponent = (
          <InlineTrigger
            className={styles.feedbackLink}
            onTrigger={(): void => setOpenModal(link.id)}
          >
            <img src={link.icon} alt="" />{" "}
            <FormattedMessage {...link.linkText} tagName="strong" />
          </InlineTrigger>
        );

        if (openModal && link.id === openModal) {
          const { modal: ModalComponent } = link;
          followupComponent = (
            <ModalComponent onRequestClose={handleRequestCloseModal} />
          );
        } else {
          followupComponent = null;
        }

        break;
      }
    }

    return (
      <p key={index} className={styles.linkEntry}>
        {linkComponent}
        {". "}
        <span className={styles.small}>
          <FormattedMessage {...link.description} />
        </span>
        {followupComponent}
      </p>
    );
  };

  // Render this component
  return (
    <div className={styles.feedbackPage}>
      <p className={styles.intro}>
        <FormattedMessage {...INTL_MESSAGES.pageIntro} />
      </p>
      <hr />
      {LINKS.map(renderLink)}
    </div>
  );
}

export default FeedbackPage;
