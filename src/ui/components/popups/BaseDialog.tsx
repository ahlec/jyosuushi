import classnames from "classnames";
import { noop } from "lodash";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import CloseIcon from "@jyosuushi/icons/close.svg";

import BasePopup from "./BasePopup";

import * as styles from "./BaseDialog.scss";

const BUTTON_PADDING = parseInt(styles.sassButtonPadding);

interface ComponentProps {
  /**
   * A boolean that indicates whether this dialog can be closed by the user
   * currently or not. If this is true, then the close button will be enabled
   * and using it or any other mechanism (ESC, clicking overlay) will trigger
   * {@link ComponentProps.onRequestClose}. If this is false, then none of
   * these will operate and {@link ComponentProps.onRequestClose} is guaranteed
   * to not be called.
   */
  canClose: boolean;

  /**
   * An optional CSS class name that is provided on the root element of the dialog
   * that is rendered on the DOM.
   */
  className?: string;

  /**
   * The dimensions, measured in pixels, that the close button should be. This,
   * therefore, acts as a minimum height for the header.
   */
  closeButtonSize: number;

  children: React.ReactNode;

  /**
   * An optional CSS class name that, if provided, is included on the container
   * element for the main contents.
   */
  contentClassName?: string;

  /**
   * A localized text descriptor that appears as the header of this dialog.
   */
  header: MessageDescriptor;

  /**
   * An optional CSS class name that, if provided, is included on the component
   * wrapping the rendered {@link ComponentProps.header} text.
   */
  headerClassName?: string;

  /**
   * Whether or not this dialog is currently open.
   */
  isOpen: boolean;

  /**
   * A callback that can be invoked to request that this dialog be closed.
   *
   * @note If {@link ComponentProps.canClose} is false, then this will never
   * be invoked.
   */
  onRequestClose: () => void;
}

function BaseDialog({
  canClose,
  children,
  className,
  closeButtonSize,
  contentClassName,
  header,
  headerClassName,
  isOpen,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <BasePopup
      className={classnames(styles.baseDialog, className)}
      isOpen={isOpen}
      onRequestClose={canClose ? onRequestClose : noop}
    >
      <header
        className={styles.header}
        style={{ minHeight: closeButtonSize + BUTTON_PADDING * 2 }}
      >
        <button
          className={classnames(styles.closeButton)}
          disabled={!canClose}
          onClick={canClose ? onRequestClose : noop}
          style={{
            height: closeButtonSize,
            width: closeButtonSize,
          }}
        >
          <CloseIcon />
        </button>
        <span className={headerClassName}>
          <FormattedMessage {...header} />
        </span>
      </header>
      <div className={classnames(styles.content, contentClassName)}>
        {children}
      </div>
    </BasePopup>
  );
}

export default BaseDialog;
