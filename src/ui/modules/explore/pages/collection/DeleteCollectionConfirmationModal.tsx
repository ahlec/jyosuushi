import React from "react";
import { defineMessages } from "react-intl";

import BaseConfirmationDialog from "@jyosuushi/ui/components/popups/BaseConfirmationDialog";

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage: "Delete Collection",
    id: "explorePage.collections.DeleteCollectionConfirmationModal.header",
  },
  promptMessage: {
    defaultMessage:
      "Are you sure you want to delete this collection? This cannot be undone.",
    id: "explorePage.collections.DeleteCollectionConfirmationModal.promptMessage",
  },
});

interface ComponentProps {
  onConfirm: () => void;
  onRequestClose: () => void;
}

function DeleteCollectionConfirmationModal({
  onConfirm,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  return (
    <BaseConfirmationDialog
      header={INTL_MESSAGES.header}
      isOpen={true}
      onConfirm={onConfirm}
      onRequestClose={onRequestClose}
      prompt={INTL_MESSAGES.promptMessage}
    />
  );
}

export default DeleteCollectionConfirmationModal;
