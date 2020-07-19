import React from "react";

import { useSubmitBugReportMutation } from "@jyosuushi/graphql/types.generated";

import BaseUserFeedbackForm from "./BaseUserFeedbackForm";
import BaseUserFeedbackModal from "./BaseUserFeedbackModal";

interface FormProps {
  /**
   * A callback that will be invoked when the user has successfully
   * submitted their bug report.
   */
  onSuccess: () => void;
}

export function BugReportForm({ onSuccess }: FormProps): React.ReactElement {
  return (
    <BaseUserFeedbackForm
      explanation="Please describe the bug that you've encountered, including what you were doing when it happened. The more details you give, the more likely we'll be able to fix it."
      mutationHook={useSubmitBugReportMutation}
      onSuccess={onSuccess}
      successToast="Your bug report has been submitted."
    />
  );
}

interface ModalProps {
  /**
   * A callback that should be invoked when the user has indicated
   * they wish to leave this modal.
   */
  onRequestClose: () => void;
}

export function BugReportModal({
  onRequestClose,
}: ModalProps): React.ReactElement {
  return (
    <BaseUserFeedbackModal
      formComponent={BugReportForm}
      header="Report a Bug"
      onRequestClose={onRequestClose}
    />
  );
}
