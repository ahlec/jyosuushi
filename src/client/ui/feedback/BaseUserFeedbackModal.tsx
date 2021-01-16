import React from "react";
import { MessageDescriptor } from "react-intl";

import Modal from "@jyosuushi/ui/components/popups/Modal";

import styles from "./BaseUserFeedbackModal.scss";

interface ComponentProps {
  /**
   * The React component that will render the form contents of
   * this modal.
   */
  formComponent: React.ComponentType<{
    onSuccess: () => void;
  }>;

  /**
   * Localized text that should appear as the header for this
   * modal.
   */
  header: MessageDescriptor;

  /**
   * A callback that should be invoked when the user has indicated
   * they wish to leave this modal.
   */
  onRequestClose: () => void;
}

function BaseUserFeedbackModal({
  formComponent: FormComponent,
  header,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  return (
    <Modal
      className={styles.baseUserFeedbackModal}
      contentClassName={styles.content}
      header={header}
      isOpen={true}
      onRequestClose={onRequestClose}
    >
      <FormComponent onSuccess={onRequestClose} />
    </Modal>
  );
}

export default BaseUserFeedbackModal;
