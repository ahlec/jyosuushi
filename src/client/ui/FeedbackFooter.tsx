import React, { useState } from "react";

import Localization, {
  FeedbackFooterPiece,
  VARIABLE_REPORT_BUG_LINK,
  VARIABLE_SUBMIT_FEEDBACK_LINK,
} from "@jyosuushi/localization";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import { BugReportModal } from "@jyosuushi/ui/feedback/BugReport";
import { FeatureSuggestionModal } from "@jyosuushi/ui/feedback/FeatureSuggestion";

import BugIcon from "@jyosuushi/icons/bug.png";
import CommentsIcon from "@jyosuushi/icons/comments.png";

import "./FeedbackFooter.scss";

interface ComponentProps {
  localization: Localization;
}

enum UserFeedbackModal {
  BugReport = "bug-report",
  Suggestion = "suggestion",
}

function FeedbackFooter({ localization }: ComponentProps): React.ReactElement {
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
    <div className="FeedbackFooter">
      {localization.feedbackFooter.map(
        (piece: FeedbackFooterPiece): React.ReactNode => {
          switch (piece) {
            case VARIABLE_REPORT_BUG_LINK:
              return (
                <InlineTrigger
                  key={VARIABLE_REPORT_BUG_LINK}
                  className="modal-link"
                  onTrigger={handleReportBugClick}
                >
                  <img className="icon" src={BugIcon} alt="" />{" "}
                  <span className="label">{localization.reportABug}</span>
                </InlineTrigger>
              );
            case VARIABLE_SUBMIT_FEEDBACK_LINK:
              return (
                <InlineTrigger
                  key={VARIABLE_SUBMIT_FEEDBACK_LINK}
                  className="modal-link"
                  onTrigger={handleSuggestFeedbackClick}
                >
                  <img className="icon" src={CommentsIcon} alt="" />{" "}
                  <span className="label">{localization.submitFeedback}</span>
                </InlineTrigger>
              );
            default:
              return piece;
          }
        }
      )}
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