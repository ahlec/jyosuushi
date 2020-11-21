import React, { useCallback, useMemo } from "react";
import { defineMessages } from "react-intl";

import AuthForm from "@jyosuushi/ui/modules/authentication/auth-form/AuthForm";
import {
  AuthFormContext,
  AuthFormError,
  AuthFormFieldDefinition,
  AuthFormValues,
} from "@jyosuushi/ui/modules/authentication/auth-form/types";
import {
  makePasswordConfirmationFieldValidation,
  makePasswordCreationFieldValidation,
} from "@jyosuushi/ui/modules/authentication/form-validation";

export type ChangePasswordFormFields =
  | "oldPassword"
  | "newPassword"
  | "confirmPassword";
export type ChangePasswordFormError = AuthFormError<ChangePasswordFormFields>;

interface ComponentProps {
  onSubmit: (
    oldPassword: string,
    newPassword: string
  ) => Promise<ChangePasswordFormError | null>;

  /**
   * The username of the user who is currently logged in and whose password is
   * being changed.
   */
  username: string;
}

const INTL_MESSAGES = defineMessages({
  buttonConfirm: {
    defaultMessage: "Change Password",
    id: "profile.change-password.form.buttons.confirm",
  },
  labelConfirmPassword: {
    defaultMessage: "Confirm New Password",
    id: "profile.change-password.form.confirm-password.label",
  },
  labelNewPassword: {
    defaultMessage: "New Password",
    id: "profile.change-password.form.new-password.label",
  },
  labelOldPassword: {
    defaultMessage: "Current Password",
    id: "profile.change-password.form.old-password.label",
  },
});

const FORM_FIELDS: readonly AuthFormFieldDefinition<
  ChangePasswordFormFields
>[] = [
  {
    fieldName: "oldPassword",
    inputType: "password",
    label: INTL_MESSAGES.labelOldPassword,
    validation: null,
  },
  {
    fieldName: "newPassword",
    inputType: "password",
    label: INTL_MESSAGES.labelNewPassword,
    validation: makePasswordCreationFieldValidation("newPassword"),
  },
  {
    fieldName: "confirmPassword",
    inputType: "password",
    label: INTL_MESSAGES.labelConfirmPassword,
    validation: makePasswordConfirmationFieldValidation(
      "newPassword",
      "confirmPassword"
    ),
  },
];

function ChangePasswordForm({
  onSubmit,
  username,
}: ComponentProps): React.ReactElement {
  // Wrap the submit callback to simplify the signature
  const handleSubmit = useCallback(
    (
      values: AuthFormValues<ChangePasswordFormFields>
    ): Promise<ChangePasswordFormError | null> =>
      onSubmit(values.oldPassword, values.newPassword),
    [onSubmit]
  );

  // Create the form context from incoming parameters
  const context = useMemo((): AuthFormContext => ({ username }), [username]);

  // Render the component
  return (
    <AuthForm
      context={context}
      fields={FORM_FIELDS}
      onSubmit={handleSubmit}
      submitButtonLabel={INTL_MESSAGES.buttonConfirm}
    />
  );
}

export default ChangePasswordForm;
