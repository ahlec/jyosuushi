import classnames from "classnames";
import React, { useCallback } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import { KeyCode } from "@jyosuushi/constants";

import CloseIcon from "@jyosuushi/icons/close.svg";

import BasePopup from "./BasePopup";

import styles from "./Modal.scss";

interface ComponentProps {
  /**
   * An optional boolean which, if false, means that the ability for the user
   * to close this modal is removed. That is,
   * {@link ComponentProps.onRequestClose} will not be invoked while this prop
   * is false.
   *
   * Defaults to true if not provided.
   */
  canClose?: boolean;

  /**
   * An optional CSS class name that is provided on the root element of the modal
   * that is rendered on the DOM.
   */
  className?: string;

  children: React.ReactNode;
  contentClassName?: string;

  /**
   * A localized text descriptor that appears as the header of this modal.
   */
  header: MessageDescriptor;

  /**
   * An optional property that configures whether this modal has a standard
   * height or not. If true, this means that the modal will appear at the typical/
   * max height, even if there isn't enough content to fill it. If false, this
   * means that the modal will be the height of the content until it hits the
   * max height, after which it will scroll.
   *
   * If omitted, defaults to true.
   */
  hasStandardHeight?: boolean;

  isOpen: boolean;

  /**
   * A callback that is invoked any time that a user has indicated they wish to
   * close this modal. This will not be invoked when
   * {@link ComponentProps.canClose} is explicitly set to false.
   */
  onRequestClose: () => void;
}

function Modal({
  canClose = true,
  children,
  className,
  contentClassName,
  hasStandardHeight = true,
  header,
  isOpen,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleRequestClose = useCallback((): void => {
    if (!isOpen || !canClose) {
      return;
    }

    onRequestClose();
  }, [canClose, isOpen, onRequestClose]);

  const handleCloseButtonKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      switch (e.keyCode) {
        case KeyCode.Space:
        case KeyCode.Enter: {
          handleRequestClose();
          break;
        }
      }
    },
    [handleRequestClose]
  );

  // Render the component
  return (
    <BasePopup
      className={classnames(styles.modal, className)}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
    >
      <header className={styles.header}>
        <div
          className={classnames(
            styles.closeButton,
            !canClose && styles.disabled
          )}
          onClick={handleRequestClose}
          onKeyPress={handleCloseButtonKeyPress}
          role={canClose ? "button" : "text"}
          tabIndex={canClose ? 0 : undefined}
        >
          <CloseIcon />
        </div>
        <FormattedMessage {...header} />
      </header>
      <div
        className={classnames(
          styles.content,
          contentClassName,
          hasStandardHeight && styles.hasStandardHeight
        )}
      >
        {children}
      </div>
    </BasePopup>
  );
}

export default Modal;
