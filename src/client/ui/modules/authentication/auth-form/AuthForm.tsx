import React, { useCallback, useEffect, useState } from "react";
import { MessageDescriptor } from "react-intl";

import useIsMounted from "@jyosuushi/hooks/useIsMounted";

import ActionBar from "@jyosuushi/ui/components/forms/ActionBar";
import ErrorDisplay from "@jyosuushi/ui/components/forms/ErrorDisplay";
import Form from "@jyosuushi/ui/components/forms/Form";
import FormButton from "@jyosuushi/ui/components/forms/FormButton";

import AuthFormFieldDisplay from "./AuthFormFieldDisplay";
import {
  AuthFormContext,
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "./types";
import useTouched from "./useTouched";
import useValidation from "./useValidation";

interface ComponentProps<TFieldNames extends string> {
  children?: React.ReactElement;
  context: AuthFormContext | null;
  fields: readonly AuthFormFieldDefinition<TFieldNames>[];
  onSubmit: (
    values: AuthFormValues<TFieldNames>
  ) => Promise<AuthFormError<TFieldNames> | null>;
  submitButtonLabel: MessageDescriptor;
}

function AuthForm<TFieldNames extends string>({
  children,
  context,
  fields,
  onSubmit,
  submitButtonLabel,
}: ComponentProps<TFieldNames>): React.ReactElement {
  const isMounted = useIsMounted();

  // Define state
  const [values, setValues] = useState<AuthFormValues<TFieldNames>>(
    (): AuthFormValues<TFieldNames> => {
      const initial: AuthFormValues<string> = {};
      fields.forEach(({ fieldName }): void => {
        initial[fieldName] = "";
      });

      return initial;
    }
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<AuthFormError<
    TFieldNames
  > | null>(null);

  // Integrate hooks
  const [fieldsTouched, touchSpecificField, touchAllFields] = useTouched(
    fields
  );
  const [validationFailures, areAllFieldsValid] = useValidation(
    fields,
    values,
    fieldsTouched
  );

  // Dismiss errors that are time based
  useEffect(() => {
    if (!currentError || currentError.dismissal.method !== "time-elapsed") {
      return;
    }

    const timeoutId = window.setTimeout(
      (): void => setCurrentError(null),
      currentError.dismissal.milliseconds
    );
    return (): void => {
      window.clearTimeout(timeoutId);
    };
  }, [currentError]);

  // Handle events from individual fields
  const handleFieldChange = useCallback(
    (field: TFieldNames, next: string): void =>
      setValues((current) => {
        if (current[field] === next) {
          return current;
        }

        return {
          ...current,
          [field]: next,
        };
      }),
    []
  );

  const handleFieldBlured = useCallback(
    (field: TFieldNames): void => {
      touchSpecificField(field);
    },
    [touchSpecificField]
  );

  const handleClearError = useCallback((): void => setCurrentError(null), []);

  // Handle submission
  const handleSubmit = async (): Promise<void> => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Touch all fields once we've submitted
      touchAllFields();

      // Validate and make sure that all of the fields are in a good spot to
      // submit.
      if (!areAllFieldsValid()) {
        return;
      }

      // Run the submit function and process the results.
      const submitError = await onSubmit(values);
      if (isMounted.current) {
        setCurrentError(submitError);
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  // Render the page
  return (
    <Form onSubmit={handleSubmit}>
      {context && context.username && (
        <input
          type="text"
          value={context.username}
          style={{ display: "none" }}
        />
      )}
      {fields.map(
        (definition): React.ReactElement => (
          <AuthFormFieldDisplay
            key={definition.fieldName}
            currentError={currentError}
            definition={definition}
            onBlur={handleFieldBlured}
            onClearError={handleClearError}
            onChange={handleFieldChange}
            validationError={
              validationFailures.get(definition.fieldName) || null
            }
            value={values[definition.fieldName]}
          />
        )
      )}
      {!!currentError && currentError.specificField === null && (
        <ErrorDisplay
          text={currentError.message.message}
          values={currentError.message.messageValues}
          variant="form-error"
        />
      )}
      <ActionBar>
        {children}
        <FormButton
          action="submit"
          disabled={!!currentError || validationFailures.size > 0}
          text={submitButtonLabel}
          variant="primary"
        />
      </ActionBar>
    </Form>
  );
}

export default AuthForm;
