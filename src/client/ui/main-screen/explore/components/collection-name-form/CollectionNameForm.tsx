import React, { useCallback, useState } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";

import ActionBar from "@jyosuushi/ui/components/forms/ActionBar";
import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import Form from "@jyosuushi/ui/components/forms/Form";
import FormButton from "@jyosuushi/ui/components/forms/FormButton";
import LabeledContainer from "@jyosuushi/ui/components/forms/LabeledContainer";
import StringInput from "@jyosuushi/ui/components/forms/StringInput";

import useCollectionNameValidation from "./useCollectionNameValidation";

import styles from "./CollectionNameForm.scss";

export interface CollectionNameFormError {
  message: MessageDescriptor;
  messageValues: Record<string, unknown>;
}

const INTL_MESSAGES = defineMessages({
  nameLabel: {
    defaultMessage: "Collection Name",
    id:
      "explore.landing.collection-name-form.CollectionNameForm.nameFieldLabel",
  },
});

interface ComponentProps {
  currentError: CollectionNameFormError | null;
  onSubmit: (name: string) => void;
  submitTextButton: MessageDescriptor;
}

function CollectionNameForm({
  currentError,
  onSubmit,
  submitTextButton,
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
          text={submitTextButton}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default CollectionNameForm;
