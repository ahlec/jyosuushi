import * as React from "react";

import Modal from "@jyosuushi/ui/Modal";

import "./AbortConfirmationModal.scss";

interface ComponentProps {
  isOpen: boolean;
  onConfirm: () => void;
  onRequestClose: () => void;
}

export default class AbortConfirmationModal extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        className="AbortConfirmationModal"
        header="End Quiz Early?"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <p>Are you sure you want to end the current quiz early?</p>
        <div className="buttons">
          <button className="cancel" onClick={onRequestClose}>
            No
          </button>
          <button className="confirm" onClick={this.onClickConfirm}>
            Yes
          </button>
        </div>
      </Modal>
    );
  }

  private onClickConfirm = () => {
    const { onConfirm, onRequestClose } = this.props;
    onConfirm();
    onRequestClose();
  };
}
