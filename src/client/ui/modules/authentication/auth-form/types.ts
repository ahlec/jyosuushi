import { MessageDescriptor } from "react-intl";

import { ErrorMessageDefinition } from "@jyosuushi/ui/modules/authentication/error-messages";

export type AuthFormValues<TFieldNames extends string> = {
  [field in TFieldNames]: string;
};

export type AuthFormFieldValidation =
  | {
      valid: true;
    }
  | {
      valid: false;
      reason: ErrorMessageDefinition;
    };

export interface AuthFormFieldDefinition<TFieldNames extends string> {
  fieldName: TFieldNames;
  label: MessageDescriptor;
  inputType: "username" | "password";
  validation:
    | ((values: AuthFormValues<TFieldNames>) => AuthFormFieldValidation)
    | null;
}

export interface AuthFormError<TFieldNames> {
  message: ErrorMessageDefinition;
  dismissal:
    | {
        method: "field-change";
      }
    | {
        method: "time-elapsed";
        milliseconds: number;
      };
  specificField: TFieldNames | null;
}

export interface AuthFormValidationFailure {
  message: ErrorMessageDefinition;
}
