import { identity, isEqual } from "lodash";
import memoizeOne from "memoize-one";
import { useCallback, useMemo } from "react";

import {
  AuthFormFieldDefinition,
  AuthFormValidationFailure,
  AuthFormValues,
} from "./types";

export type CurrentValidationFailures<TFieldNames extends string> = Map<
  TFieldNames,
  AuthFormValidationFailure
>;

export type AreAllFieldsValidFn = () => boolean;

function areCollectionsEqual<TFieldNames extends string>(
  a: CurrentValidationFailures<TFieldNames>,
  b: CurrentValidationFailures<TFieldNames>
): boolean {
  if (a.size !== b.size) {
    return false;
  }

  let hasEncounteredDifference = false;
  a.forEach((aValue, key): void => {
    if (hasEncounteredDifference) {
      // Stop performing work if we already know the end result.
      return;
    }

    if (!b.has(key)) {
      hasEncounteredDifference = true;
      return;
    }

    const bValue = b.get(key);
    if (!isEqual(aValue, bValue)) {
      hasEncounteredDifference = true;
    }
  });

  return !hasEncounteredDifference;
}

type MemoizeArgs<TFieldNames extends string> = [
  CurrentValidationFailures<TFieldNames>
];

function useValidation<TFieldNames extends string>(
  fields: readonly AuthFormFieldDefinition<TFieldNames>[],
  values: AuthFormValues<TFieldNames>,
  touchedFields: ReadonlySet<TFieldNames>
): [CurrentValidationFailures<TFieldNames>, AreAllFieldsValidFn] {
  // Create an internal utility function to compute and return on demand
  // what the validation object would look like for a particular group of
  // fields.
  const validateFields = useCallback(
    (
      fieldsToValidate: ReadonlySet<TFieldNames>
    ): CurrentValidationFailures<TFieldNames> => {
      const results = new Map<TFieldNames, AuthFormValidationFailure>();
      fields.forEach((definition): void => {
        if (!fieldsToValidate.has(definition.fieldName)) {
          return;
        }

        if (!definition.validation) {
          return;
        }

        const result = definition.validation(values);
        if (result.valid) {
          return;
        }

        results.set(definition.fieldName, { message: result.reason });
      });

      return results;
    },
    [fields, values]
  );

  // Create a memoizing function that helps ensure deep equality on the
  // validation failures object that is returned from this hook.
  const memoizeFailures = useMemo(
    () =>
      memoizeOne(
        identity,
        (
          [next]: MemoizeArgs<TFieldNames>,
          [current]: MemoizeArgs<TFieldNames>
        ): boolean => areCollectionsEqual(current, next)
      ),
    []
  );

  // Perform validation on all of the touched fields
  const failures = useMemo((): CurrentValidationFailures<TFieldNames> => {
    // Return a deeply-memoized collection of validation failures
    // (That is, only return a new reference if some value actually changed)
    return memoizeFailures(validateFields(touchedFields));
  }, [validateFields, touchedFields, memoizeFailures]);

  // Create a function that determines if all fields on the form are currently
  // valid, on demand.
  const areAllFieldsValid = useCallback((): boolean => {
    const results = validateFields(
      new Set(fields.map(({ fieldName }) => fieldName))
    );
    return results.size === 0;
  }, [validateFields, fields]);

  // Return public API
  return [failures, areAllFieldsValid];
}

export default useValidation;
