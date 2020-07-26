import React, { useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import { BugReportModal } from "@jyosuushi/ui/feedback/BugReport";
import { FeatureSuggestionModal } from "@jyosuushi/ui/feedback/FeatureSuggestion";

import BugIcon from "@jyosuushi/icons/bug.png";
import CommentsIcon from "@jyosuushi/icons/comments.png";

import styles from "./FeedbackFooter.scss";

enum UserFeedbackModal {
  BugReport = "bug-report",
  Suggestion = "suggestion",
}

const INTL_MESSAGES = defineMessages({
  contents: {
    defaultMessage:
      "Your thoughts are super appreciated! {reportBug} or {submitFeedback}.",
    id: "FeedbackFooter.contents",
  },
  reportBugLink: {
    defaultMessage: "Report a Bug",
    id: "FeedbackFooter.reportBugLink",
  },
  submitFeedbackLink: {
    defaultMessage: "Submit Feedback",
    id: "FeedbackFooter.submitFeedbackLink",
  },
});

function FeedbackFooter(): React.ReactElement {
  // Define component state
  const [currentModal, setCurrentModal] = useState<UserFeedbackModal | null>(
    null
  );

  // Handle events
  const handleReportBugClick = (): void =>
    setCurrentModal(UserFeedbackModal.BugReport);
  const handleSuggestFeedbackClick = (): void =>
    setCurrentModal(UserFeedbackModal.Suggestion);
  const handleRequestCloseModal = (): void => setCurrentModal(null);

  // Render the component
  return (
    <div className={styles.feedbackFooter}>
      <FormattedMessage
        {...INTL_MESSAGES.contents}
        values={{
          reportBug: (
            <InlineTrigger
              className={styles.modalLink}
              onTrigger={handleReportBugClick}
            >
              <img className={styles.icon} src={BugIcon} alt="" />{" "}
              <span className={styles.label}>
                <FormattedMessage {...INTL_MESSAGES.reportBugLink} />
              </span>
            </InlineTrigger>
          ),
          submitFeedback: (
            <InlineTrigger
              className={styles.modalLink}
              onTrigger={handleSuggestFeedbackClick}
            >
              <img className={styles.icon} src={CommentsIcon} alt="" />{" "}
              <span className={styles.label}>
                <FormattedMessage {...INTL_MESSAGES.submitFeedbackLink} />
              </span>
            </InlineTrigger>
          ),
        }}
      />
      {currentModal === UserFeedbackModal.BugReport && (
        <BugReportModal onRequestClose={handleRequestCloseModal} />
      )}
      {currentModal === UserFeedbackModal.Suggestion && (
        <FeatureSuggestionModal onRequestClose={handleRequestCloseModal} />
      )}
    </div>
  );
}

export default FeedbackFooter;
