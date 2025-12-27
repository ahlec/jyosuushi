import React, { useCallback } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import BaseDialog from "./BaseDialog";

import * as styles from "./BaseConfirmationDialog.scss";

const INTL_MESSAGES = defineMessages({
  buttonNo: {
    defaultMessage: "No",
    description:
      "Clicking this buttons cancels/declines the yes/no confirmation prompt given to the user.",
    id: "components.popups.BaseConfirmationDialog.buttonNo",
  },
  buttonYes: {
    defaultMessage: "Yes",
    description:
      "Clicking this button confirms the yes/no confirmation prompt given to the user.",
    id: "components.popups.BaseConfirmationDialog.buttonYes",
  },
});

interface ComponentProps {
  header: MessageDescriptor;
  isOpen: boolean;
  onConfirm: () => void;
  onRequestClose: () => void;
  prompt: MessageDescriptor;
}

function BaseConfirmationDialog({
  header,
  isOpen,
  onConfirm,
  onRequestClose,
  prompt,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleConfirmClick = useCallback((): void => {
    onConfirm();
    onRequestClose();
  }, [onConfirm, onRequestClose]);

  // Render the component
  return (
    <BaseDialog
      canClose={true}
      closeButtonSize={24}
      contentClassName={styles.content}
      header={header}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <p>
        <FormattedMessage {...prompt} />
      </p>
      <div className={styles.buttonsContainer}>
        <StandardButton
          className={styles.cancelButton}
          onClick={onRequestClose}
        >
          <FormattedMessage {...INTL_MESSAGES.buttonNo} />
        </StandardButton>
        <StandardButton
          className={styles.confirmButton}
          onClick={handleConfirmClick}
        >
          <FormattedMessage {...INTL_MESSAGES.buttonYes} />
        </StandardButton>
      </div>
    </BaseDialog>
  );
}

export default BaseConfirmationDialog;
