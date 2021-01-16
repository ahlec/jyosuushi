import React, { useState } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import CreateCollectionForm from "./CreateCollectionForm";
import { CreateCollectionFormError } from "./types";
import useCreateCollection from "./useCreateCollection";

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "Create Custom Collection",
    id: "explore.landing.CreateCollectionModal.modalHeader",
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
  ] = useState<CreateCollectionFormError | null>(null);

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
      <CreateCollectionForm
        currentError={backendError}
        onSubmit={createCollection}
      />
    </Modal>
  );
}

export default CreateCollectionModal;
