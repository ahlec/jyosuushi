import React, { useState } from "react";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

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
  description: (localization: Localization) => string;
  icon: string;
  linkText: (localization: Localization) => string;
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

const LINKS: ReadonlyArray<LinkEntry> = [
  {
    description: (localization): string =>
      localization.feedbackPageSubmitFeedbackDescription,
    icon: CommentsIcon,
    id: FeedbackPageModal.FeatureSuggestion,
    linkText: (localization): string =>
      localization.feedbackPageSubmitFeedbackLink,
    modal: FeatureSuggestionModal,
    type: "modal",
  },
  {
    description: (localization): string =>
      localization.feedbackPageReportBugDescription,
    icon: BugIcon,
    id: FeedbackPageModal.BugReport,
    linkText: (localization): string => localization.feedbackPageReportBugLink,
    modal: BugReportModal,
    type: "modal",
  },
  {
    description: (localization): string =>
      localization.feedbackPageHelpContributeDescription,
    icon: CodeIcon,
    linkText: (localization): string =>
      localization.feedbackPageHelpContributeLink,
    type: "external-link",
    url: "https://github.com/ahlec/jyosuushi",
  },
];

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state),
  };
}

type ComponentProps = ReduxProps;

function FeedbackPage({ localization }: ComponentProps): React.ReactElement {
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
            <strong>{link.linkText(localization)}</strong>
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
            <strong>{link.linkText(localization)}</strong>
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
        <span className={styles.small}>{link.description(localization)}</span>
        {followupComponent}
      </p>
    );
  };

  // Render this component
  return (
    <div className={styles.feedbackPage}>
      <p className={styles.intro}>{localization.feedbackPageIntro}</p>
      <hr />
      {LINKS.map(renderLink)}
    </div>
  );
}

export default connect(mapStateToProps)(FeedbackPage);
