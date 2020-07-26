import React from "react";
import { defineMessages } from "react-intl";

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

const INTL_MESSAGES = defineMessages({
  formExplanation: {
    defaultMessage:
      "Please describe the bug that you've encountered, including what you were doing when it happened. The more details you give, the more likely we'll be able to fix it.",
    id: "feedback.bugReport.formExplanation",
  },
  modalHeader: {
    defaultMessage: "Report a Bug",
    id: "feedback.bugReport.modalHeader",
  },
  successToast: {
    defaultMessage: "Your bug report has been submitted.",
    id: "feedback.bugReport.successToast",
  },
});

export function BugReportForm({ onSuccess }: FormProps): React.ReactElement {
  return (
    <BaseUserFeedbackForm
      explanation={INTL_MESSAGES.formExplanation}
      mutationHook={useSubmitBugReportMutation}
      onSuccess={onSuccess}
      successToast={INTL_MESSAGES.successToast}
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
      header={INTL_MESSAGES.modalHeader}
      onRequestClose={onRequestClose}
    />
  );
}
