import React from "react";
import { defineMessages } from "react-intl";

import BaseConfirmationDialog from "@jyosuushi/ui/components/popups/BaseConfirmationDialog";

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "End Quiz Early?",
    id: "header.AbortConfirmationModal.header",
  },
  question: {
    defaultMessage: "Are you sure you want to end the current quiz early?",
    id: "header.AbortConfirmationModal.question",
  },
});

interface ComponentProps {
  isOpen: boolean;
  onConfirm: () => void;
  onRequestClose: () => void;
}

function AbortConfirmationModal({
  isOpen,
  onConfirm,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  return (
    <BaseConfirmationDialog
      header={INTL_MESSAGES.modalHeader}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onRequestClose={onRequestClose}
      prompt={INTL_MESSAGES.question}
    />
  );
}

export default AbortConfirmationModal;
