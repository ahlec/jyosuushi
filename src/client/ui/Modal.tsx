import classnames from "classnames";
import * as React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import ReactModal from "react-modal";

import { KeyCode } from "@jyosuushi/constants";

import CloseIcon from "@jyosuushi/icons/close.svg";

import styles from "./Modal.scss";

interface ComponentProps {
  className?: string;
  contentClassName?: string;
  header: MessageDescriptor;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default class Modal extends React.Component<ComponentProps> {
  public render(): React.ReactNode {
    const {
      children,
      className,
      contentClassName,
      header,
      isOpen,
    } = this.props;
    return (
      <ReactModal
        className={classnames(styles.modal, className)}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <header className={styles.header}>
          <div
            className={styles.closeButton}
            onClick={this.onRequestClose}
            onKeyPress={this.handleCloseButtonKeyPress}
            role="button"
            tabIndex={0}
          >
            <CloseIcon />
          </div>
          <FormattedMessage {...header} />
        </header>
        <div className={classnames(styles.content, contentClassName)}>
          {children}
        </div>
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
