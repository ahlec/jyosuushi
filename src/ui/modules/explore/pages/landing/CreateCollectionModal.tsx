import React, { useCallback } from "react";
import { defineMessages } from "react-intl";

import { CreateUserCounterCollectionFn } from "@jyosuushi/interfaces";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import CollectionNameForm from "@jyosuushi/ui/modules/explore/components/collection-name-form/CollectionNameForm";

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "Create Custom Collection",
    id: "explore.landing.CreateCollectionModal.modalHeader",
  },
  submitButtonLabel: {
    defaultMessage: "Create",
    id: "explore.landing.CreateCollectionModal.submitButtonLabel",
  },
});

interface ComponentProps {
  createUserCollection: CreateUserCounterCollectionFn;
  onCancel: () => void;
  onSuccess: (collectionId: string) => void;
}

function CreateCollectionModal({
  createUserCollection,
  onCancel,
  onSuccess,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleSubmit = useCallback(
    (name: string): void => {
      createUserCollection(name).then(onSuccess);
    },
    [createUserCollection, onSuccess],
  );

  // Render the component
  return (
    <Modal
      canClose={true}
      hasStandardHeight={false}
      header={INTL_MESSAGES.modalHeader}
      isOpen={true}
      onRequestClose={onCancel}
    >
      <CollectionNameForm
        initialName=""
        onSubmit={handleSubmit}
        submitTextButton={INTL_MESSAGES.submitButtonLabel}
      />
    </Modal>
  );
}

export default CreateCollectionModal;
