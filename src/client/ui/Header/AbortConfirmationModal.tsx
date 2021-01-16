import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import StandardButton from "@jyosuushi/ui/components/StandardButton";
import Modal from "@jyosuushi/ui/components/popups/Modal";

import styles from "./AbortConfirmationModal.scss";

const INTL_MESSAGES = defineMessages({
  buttonNo: {
    defaultMessage: "No",
    description:
      "Clicking this buttons indicates the user wants to stay in the quiz.",
    id: "header.AbortConfirmationModal.buttonNo",
  },
  buttonYes: {
    defaultMessage: "Yes",
    description:
      "Clicking this button confirms the user's intent to leave the quiz.",
    id: "header.AbortConfirmationModal.buttonYes",
  },
  modalHeader: {
    defaultMessage: "End Quiz Early?",
    id: "header.AbortConfirmationModal.header",
  },
  question: {
    defaultMessage: "Are you sure you want to end the current quiz early?",
    id: "header.AbortConfirmationModal.question",
  },
});

interface ComponentProps {
  isOpen: boolean;
  onConfirm: () => void;
  onRequestClose: () => void;
}

export default class AbortConfirmationModal extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        className={styles.abortConfirmationModal}
        contentClassName={styles.content}
        hasStandardHeight={false}
        header={INTL_MESSAGES.modalHeader}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <FormattedMessage {...INTL_MESSAGES.question} tagName="p" />
        <div className={styles.buttons}>
          <StandardButton onClick={onRequestClose}>
            <FormattedMessage {...INTL_MESSAGES.buttonNo} />
          </StandardButton>
          <StandardButton
            className={styles.confirm}
            onClick={this.onClickConfirm}
          >
            <FormattedMessage {...INTL_MESSAGES.buttonYes} />
          </StandardButton>
        </div>
      </Modal>
    );
  }

  private onClickConfirm = (): void => {
    const { onConfirm, onRequestClose } = this.props;
    onConfirm();
    onRequestClose();
  };
}
