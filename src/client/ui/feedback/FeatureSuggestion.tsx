import React from "react";
import { defineMessages } from "react-intl";

import { useSubmitSuggestionMutation } from "@jyosuushi/graphql/types.generated";

import BaseUserFeedbackForm from "./BaseUserFeedbackForm";
import BaseUserFeedbackModal from "./BaseUserFeedbackModal";

interface FormProps {
  /**
   * A callback that will be invoked when the user has successfully
   * submitted their suggestion.
   */
  onSuccess: () => void;
}

const INTL_MESSAGES = defineMessages({
  formExplanation: {
    defaultMessage: "What would you like to see come to this site?",
    id: "feedback.submitFeedback.formExplanation",
  },
  modalHeader: {
    defaultMessage: "Submit Feedback",
    id: "feedback.submitFeedback.modalHeader",
  },
  successToast: {
    defaultMessage: "Your suggestion has been submitted.",
    id: "feedback.submitFeedback.successToast",
  },
});

export function FeatureSuggestionForm({
  onSuccess,
}: FormProps): React.ReactElement {
  return (
    <BaseUserFeedbackForm
      explanation={INTL_MESSAGES.formExplanation}
      mutationHook={useSubmitSuggestionMutation}
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

export function FeatureSuggestionModal({
  onRequestClose,
}: ModalProps): React.ReactElement {
  return (
    <BaseUserFeedbackModal
      formComponent={FeatureSuggestionForm}
      header={INTL_MESSAGES.modalHeader}
      onRequestClose={onRequestClose}
    />
  );
}
