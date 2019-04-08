import * as React from "react";
import ReactModal from "react-modal";

import CloseIcon from "./close.svg";

import "./Modal.scss";

interface ComponentProps {
  children: React.ReactNode;
  header: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default class Modal extends React.PureComponent<ComponentProps> {
  public render() {
    const { children, header, isOpen, onRequestClose } = this.props;
    return (
      <ReactModal
        className="Modal"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <header>
          <div className="close-button" onClick={this.onClickClose}>
            <CloseIcon />
          </div>
          {header}
        </header>
        {children}
      </ReactModal>
    );
  }

  private onClickClose = () => {
    const { isOpen, onRequestClose } = this.props;
    if (!isOpen) {
      return;
    }

    onRequestClose();
  };
}
