import React, { useCallback } from "react";

import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import LabeledContainer from "@jyosuushi/ui/components/forms/LabeledContainer";
import StringInput from "@jyosuushi/ui/components/forms/StringInput";

import { AuthFormError, AuthFormFieldDefinition } from "./types";

interface ComponentProps<TFieldNames extends string> {
  currentError: AuthFormError<TFieldNames> | null;
  definition: AuthFormFieldDefinition<TFieldNames>;
  onBlur: (field: TFieldNames) => void;
  onClearError: () => void;
  onChange: (field: TFieldNames, next: string) => void;
  value: string;
}

function AuthFormFieldDisplay<TFieldNames extends string>({
  currentError,
  definition,
  onBlur,
  onClearError,
  onChange,
  value,
}: ComponentProps<TFieldNames>): React.ReactElement {
  // Handle field being changed
  const handleChange = useCallback(
    (next: string): void => {
      if (
        currentError &&
        currentError.dismissal.method === "field-change" &&
        (currentError.specificField === null ||
          currentError.specificField === definition.fieldName)
      ) {
        // If the error disappears when we change this field (either
        // specifically, or change any form field) wipe the error.
        onClearError();
      }

      onChange(definition.fieldName, next);
    },
    [currentError, definition.fieldName, onChange, onClearError]
  );

  // Handle field events
  const handleBlur = useCallback((): void => onBlur(definition.fieldName), [
    onBlur,
    definition.fieldName,
  ]);

  // Coerce field definition into component properties
  let role: "username" | "password";
  let type: "text" | "password" | "email";
  switch (definition.inputType) {
    case "username": {
      role = "username";
      type = "email";
      break;
    }
    case "password": {
      role = "password";
      type = "password";
      break;
    }
  }

  // Render the page
  return (
    <LabeledContainer label={definition.label}>
      <StringInput
        onBlur={handleBlur}
        onChange={handleChange}
        role={role}
        type={type}
        value={value}
      />
      {!!currentError &&
        currentError.specificField === definition.fieldName && (
          <ErrorDisplay
            text={currentError.message.message}
            values={currentError.message.messageValues}
            variant="field-error"
          />
        )}
    </LabeledContainer>
  );
}

export default AuthFormFieldDisplay;
