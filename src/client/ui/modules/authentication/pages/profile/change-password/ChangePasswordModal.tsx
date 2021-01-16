import React, { useCallback } from "react";
import { defineMessages } from "react-intl";

import { ONE_SECOND, ONE_MINUTE } from "@shared/constants";

import {
  ChangePasswordError,
  useChangePasswordMutation,
} from "@jyosuushi/graphql/types.generated";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import {
  ERROR_MESSAGE_FIELD_EMPTY,
  ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
  ERROR_MESSAGE_PASSWORD_TOO_SHORT,
  ERROR_MESSAGE_UNKNOWN_ERROR,
} from "@jyosuushi/ui/modules/authentication/error-messages";

import ChangePasswordForm, {
  ChangePasswordFormError,
} from "./ChangePasswordForm";

import styles from "./ChangePasswordModal.scss";

const INTL_MESSAGES = defineMessages({
  errorNoLongerAuthenticated: {
    defaultMessage: "An error has occurred. Please try refreshing the page.",
    id: "profile-page.change-password-modal.errors.noLongerAuthenticated",
  },
  errorOldPasswordIncorrect: {
    defaultMessage: "Password does not match your current password.",
    id: "profile-page.change-password-modal.errors.oldPasswordIncorrect",
  },
  errorRateLimited: {
    defaultMessage:
      "You have attempted to change your password too many times too quickly. Please try again after a minute.",
    id: "profile-page.change-password-modal.errors.rateLimited",
  },
  modalHeader: {
    defaultMessage: "Change Password",
    id: "profile-page.change-password-modal.header",
  },
});

interface ComponentProps {
  onRequestClose: () => void;

  /**
   * The username of the user who is currently logged in and whose password is
   * being changed.
   */
  username: string;
}

function ChangePasswordModal({
  onRequestClose,
  username,
}: ComponentProps): React.ReactElement {
  // Connect with GraphQL
  const [changePassword] = useChangePasswordMutation();

  // Handle the submission of the change password form
  const handleSubmit = useCallback(
    async (
      oldPassword: string,
      newPassword: string
    ): Promise<ChangePasswordFormError | null> => {
      const result = await changePassword({
        variables: {
          newPassword,
          oldPassword,
        },
      });

      if (!result.data) {
        return {
          dismissal: {
            method: "time-elapsed",
            milliseconds: ONE_SECOND * 20,
          },
          message: ERROR_MESSAGE_UNKNOWN_ERROR,
          specificField: null,
        };
      }

      const { error, success } = result.data.changePassword;
      if (error) {
        switch (error) {
          case ChangePasswordError.OldPasswordEmpty: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_FIELD_EMPTY,
              specificField: "oldPassword",
            };
          }
          case ChangePasswordError.OldPasswordNotCorrect: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: {
                message: INTL_MESSAGES.errorOldPasswordIncorrect,
              },
              specificField: "oldPassword",
            };
          }
          case ChangePasswordError.NewPasswordTooShort: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_TOO_SHORT,
              specificField: "newPassword",
            };
          }
          case ChangePasswordError.NewPasswordMissingNumeral: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: ERROR_MESSAGE_PASSWORD_MISSING_NUMERAL,
              specificField: "newPassword",
            };
          }
          case ChangePasswordError.RateLimited: {
            return {
              dismissal: {
                method: "time-elapsed",
                milliseconds: ONE_MINUTE,
              },
              message: { message: INTL_MESSAGES.errorRateLimited },
              specificField: null,
            };
          }
          case ChangePasswordError.NotAuthenticated: {
            return {
              dismissal: {
                method: "field-change",
              },
              message: {
                message: INTL_MESSAGES.errorNoLongerAuthenticated,
              },
              specificField: null,
            };
          }
          default: {
            return error;
          }
        }
      }

      if (!success) {
        return {
          dismissal: {
            method: "time-elapsed",
            milliseconds: ONE_SECOND * 20,
          },
          message: ERROR_MESSAGE_UNKNOWN_ERROR,
          specificField: null,
        };
      }

      onRequestClose();
      return null;
    },
    [changePassword, onRequestClose]
  );

  // Render the component
  return (
    <Modal
      contentClassName={styles.modalContents}
      header={INTL_MESSAGES.modalHeader}
      hasStandardHeight={false}
      isOpen={true}
      onRequestClose={onRequestClose}
    >
      <ChangePasswordForm onSubmit={handleSubmit} username={username} />
    </Modal>
  );
}

export default ChangePasswordModal;
