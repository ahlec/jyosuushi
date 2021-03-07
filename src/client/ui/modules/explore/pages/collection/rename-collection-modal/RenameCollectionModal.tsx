import React, { useState } from "react";
import { defineMessages } from "react-intl";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import CollectionNameForm, {
  CollectionNameFormError,
} from "@jyosuushi/ui/modules/explore/components/collection-name-form/CollectionNameForm";

import useRenameCollection from "./useRenameCollection";

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
  collectionId,
  currentName,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [
    backendError,
    setBackendError,
  ] = useState<CollectionNameFormError | null>(null);

  // Connect with the backend
  const renameCollection = useRenameCollection(collectionId, {
    onError: setBackendError,
    onSuccess: onRequestClose,
  });

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
        currentError={backendError}
        initialName={currentName}
        onSubmit={renameCollection}
        submitTextButton={INTL_MESSAGES.submitButtonLabel}
      />
    </Modal>
  );
}

export default RenameCollectionModal;
