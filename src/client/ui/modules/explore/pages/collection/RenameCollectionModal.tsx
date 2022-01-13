import React, { useCallback } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollectionManager } from "@jyosuushi/interfaces";
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
  manager: UserCounterCollectionManager;
  onRequestClose: () => void;
}

function RenameCollectionModal({
  collectionId,
  currentName,
  manager,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleSubmit = useCallback(
    (name: string): void => {
      manager.rename(collectionId, name).then(onRequestClose);
    },
    [collectionId, manager, onRequestClose]
  );

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
        onSubmit={handleSubmit}
        submitTextButton={INTL_MESSAGES.submitButtonLabel}
      />
    </Modal>
  );
}

export default RenameCollectionModal;
