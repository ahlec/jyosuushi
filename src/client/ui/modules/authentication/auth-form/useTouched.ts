import { useCallback, useState } from "react";

import { AuthFormFieldDefinition } from "./types";

export type TouchSpecificFieldFn<TFieldNames extends string> = (
  field: TFieldNames
) => void;

export type TouchAllFieldsFn = () => void;

function useTouched<TFieldNames extends string>(
  fields: readonly AuthFormFieldDefinition<TFieldNames>[]
): [
  ReadonlySet<TFieldNames>,
  TouchSpecificFieldFn<TFieldNames>,
  TouchAllFieldsFn
] {
  // Define state
  const [fieldsTouched, setFieldsTouched] = useState(new Set<TFieldNames>());

  // Create a callback to touch a specific field if it hasn't already been
  // touched.
  const touchSpecificField = useCallback(
    (field: TFieldNames): void =>
      setFieldsTouched((current) => {
        if (current.has(field)) {
          return current;
        }

        const next = new Set(current);
        next.add(field);
        return next;
      }),
    []
  );

  // Create a callback that marks all fields in the form as touched.
  const touchAllFields = useCallback(
    (): void =>
      setFieldsTouched((current) => {
        // If every field has already been marked as touched, then return the
        // current object so we avoid a rerender.
        if (fields.every(({ fieldName }) => current.has(fieldName))) {
          return current;
        }

        // At least one field hasn't been touched, so we should return a new
        // set with all fields touched.
        const next = new Set<TFieldNames>(
          fields.map(({ fieldName }): TFieldNames => fieldName)
        );
        return next;
      }),
    [fields]
  );

  // Return public API
  return [fieldsTouched, touchSpecificField, touchAllFields];
}

export default useTouched;
