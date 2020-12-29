import React, { useCallback, useState } from "react";
import { defineMessages } from "react-intl";

import ActionBar from "@jyosuushi/ui/components/forms/ActionBar";
import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import Form from "@jyosuushi/ui/components/forms/Form";
import FormButton from "@jyosuushi/ui/components/forms/FormButton";
import LabeledContainer from "@jyosuushi/ui/components/forms/LabeledContainer";
import StringInput from "@jyosuushi/ui/components/forms/StringInput";

import { CreateCollectionFormError } from "./types";
import useCollectionNameValidation from "./useCollectionNameValidation";

import styles from "./CreateCollectionForm.scss";

const INTL_MESSAGES = defineMessages({
  nameLabel: {
    defaultMessage: "Collection Name",
    id:
      "explore.landing.create-collection-modal.CreateCollectionForm.nameFieldLabel",
  },
  submitButtonText: {
    defaultMessage: "Create",
    id:
      "explore.landing.create-collection-modal.CreateCollectionForm.submitButtonText",
  },
});

interface ComponentProps {
  currentError: CreateCollectionFormError | null;
  onSubmit: (name: string) => void;
}

function CreateCollectionForm({
  currentError,
  onSubmit,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [rawName, setRawName] = useState<string>("");
  const [hasTouchedName, setHasTouchedName] = useState<boolean>(false);

  // Validate the current input
  const validatedName = useCollectionNameValidation(rawName);

  // Handle events
  const currentValidName: string | null = validatedName.valid
    ? validatedName.name
    : null;
  const handleSubmit = useCallback((): void => {
    if (currentValidName === null) {
      return;
    }

    onSubmit(currentValidName);
  }, [currentValidName, onSubmit]);

  const handleInputBlur = useCallback((): void => {
    setHasTouchedName(true);
  }, []);

  // Render the component
  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <LabeledContainer label={INTL_MESSAGES.nameLabel}>
        <StringInput
          onBlur={handleInputBlur}
          onChange={setRawName}
          type="text"
          value={rawName}
        />
        {hasTouchedName && !validatedName.valid && (
          <ErrorDisplay
            text={validatedName.message}
            values={validatedName.messageValues}
            variant="field-error"
          />
        )}
      </LabeledContainer>
      {!!currentError && (
        <ErrorDisplay
          text={currentError.message}
          values={currentError.messageValues}
          variant="form-error"
        />
      )}
      <ActionBar>
        <FormButton
          action="submit"
          disabled={currentValidName === null || !!currentError}
          text={INTL_MESSAGES.submitButtonText}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default CreateCollectionForm;
