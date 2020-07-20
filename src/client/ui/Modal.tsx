import classnames from "classnames";
import * as React from "react";
import ReactModal from "react-modal";

import CloseIcon from "@jyosuushi/icons/close.svg";

import "./Modal.scss";
import { KeyCode } from "@jyosuushi/constants";

interface ComponentProps {
  className?: string;
  header: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default class Modal extends React.Component<ComponentProps> {
  public render(): React.ReactNode {
    const { children, className, header, isOpen } = this.props;
    return (
      <ReactModal
        className={classnames("Modal", className)}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <header>
          <div
            className="button"
            onClick={this.onRequestClose}
            onKeyPress={this.handleCloseButtonKeyPress}
            role="button"
            tabIndex={0}
          >
            <CloseIcon />
          </div>
          {header}
        </header>
        <div className="content">{children}</div>
      </ReactModal>
    );
  }

  private handleCloseButtonKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    switch (e.which) {
      case KeyCode.Space:
      case KeyCode.Enter: {
        this.onRequestClose();
        break;
      }
    }
  };

  private onRequestClose = (): void => {
    const { isOpen, onRequestClose } = this.props;
    if (!isOpen) {
      return;
    }

    onRequestClose();
  };
}
