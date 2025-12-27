import React, { useCallback, useState } from "react";
import { defineMessages, MessageDescriptor } from "react-intl";

import ActionBar from "@jyosuushi/ui/components/forms/ActionBar";
import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import Form from "@jyosuushi/ui/components/forms/Form";
import FormButton from "@jyosuushi/ui/components/forms/FormButton";
import LabeledContainer from "@jyosuushi/ui/components/forms/LabeledContainer";
import StringInput from "@jyosuushi/ui/components/forms/StringInput";

import useCollectionNameValidation from "./useCollectionNameValidation";

import * as styles from "./CollectionNameForm.scss";

const INTL_MESSAGES = defineMessages({
  nameLabel: {
    defaultMessage: "Collection Name",
    id: "explore.landing.collection-name-form.CollectionNameForm.nameFieldLabel",
  },
});

interface ComponentProps {
  initialName: string;
  onSubmit: (name: string) => void;
  submitTextButton: MessageDescriptor;
}

function CollectionNameForm({
  initialName,
  onSubmit,
  submitTextButton,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [rawName, setRawName] = useState<string>(initialName);
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
      <ActionBar>
        <FormButton
          action="submit"
          disabled={currentValidName === null}
          text={submitTextButton}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default CollectionNameForm;
