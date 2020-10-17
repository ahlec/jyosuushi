import { MessageDescriptor } from "react-intl";

export type AuthFormValues<TFieldNames extends string> = {
  [field in TFieldNames]: string;
};

export type AuthFormFieldValidation =
  | {
      valid: true;
    }
  | {
      valid: false;
      reason: MessageDescriptor;
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
  message: MessageDescriptor;
  messageValues?: Record<string, unknown>;
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
