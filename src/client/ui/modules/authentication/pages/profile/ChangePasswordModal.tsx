import React from "react";
import { defineMessages } from "react-intl";

import Modal from "@jyosuushi/ui/Modal";

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "Change Password",
    id: "profile-page.change-password-modal.header",
  },
});

interface ComponentProps {
  onRequestClose: () => void;
}

function ChangePasswordModal({
  onRequestClose,
}: ComponentProps): React.ReactElement {
  return (
    <Modal
      header={INTL_MESSAGES.modalHeader}
      isOpen={true}
      onRequestClose={onRequestClose}
    >
      Test!
    </Modal>
  );
}

export default ChangePasswordModal;
