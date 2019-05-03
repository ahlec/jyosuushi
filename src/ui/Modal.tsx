import classnames from "classnames";
import * as React from "react";
import ReactModal from "react-modal";

import CloseIcon from "./close.svg";

import "./Modal.scss";

interface ComponentProps {
  className?: string;
  header: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default class Modal extends React.Component<ComponentProps> {
  public render() {
    const { children, className, header, isOpen } = this.props;
    return (
      <ReactModal
        className={classnames("Modal", className)}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <header>
          <div className="button" onClick={this.onRequestClose}>
            <CloseIcon />
          </div>
          {header}
        </header>
        <div className="content">{children}</div>
      </ReactModal>
    );
  }

  private onRequestClose = () => {
    const { isOpen, onRequestClose } = this.props;
    if (!isOpen) {
      return;
    }

    onRequestClose();
  };
}
