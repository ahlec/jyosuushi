import React, { useState } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import CollectionNameForm, {
  CollectionNameFormError,
} from "@jyosuushi/ui/modules/explore/components/collection-name-form/CollectionNameForm";

import useCreateCollection from "./useCreateCollection";

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
  onCancel: () => void;
  onSuccess: (collection: UserCounterCollection) => void;
}

function CreateCollectionModal({
  onCancel,
  onSuccess,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [
    backendError,
    setBackendError,
  ] = useState<CollectionNameFormError | null>(null);

  // Connect with the backend
  const createCollection = useCreateCollection({
    onError: setBackendError,
    onSuccess,
  });

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
        currentError={backendError}
        initialName=""
        onSubmit={createCollection}
        submitTextButton={INTL_MESSAGES.submitButtonLabel}
      />
    </Modal>
  );
}

export default CreateCollectionModal;
