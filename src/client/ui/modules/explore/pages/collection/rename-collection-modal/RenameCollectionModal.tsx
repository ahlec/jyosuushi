import React from "react";
import { defineMessages } from "react-intl";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import CollectionNameForm from "@jyosuushi/ui/modules/explore/components/collection-name-form/CollectionNameForm";

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "Rename Collection",
    id: "explore.collections.RenameCollectionModal.modalHeader",
  },
  submitButtonLabel: {
    defaultMessage: "Confirm",
    id: "explore.collections.RenameCollectionModal.submitButtonLabel",
  },
});

interface ComponentProps {
  collectionId: string;
  currentName: string;
  onRequestClose: () => void;
}

function RenameCollectionModal({
  currentName,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  // TODO

  // Render the component
  return (
    <Modal
      canClose={true}
      hasStandardHeight={false}
      header={INTL_MESSAGES.modalHeader}
      isOpen={true}
      onRequestClose={onRequestClose}
    >
      <CollectionNameForm
        initialName={currentName}
        onSubmit={onRequestClose}
        submitTextButton={INTL_MESSAGES.submitButtonLabel}
      />
    </Modal>
  );
}

export default RenameCollectionModal;
