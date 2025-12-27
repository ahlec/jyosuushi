import classnames from "classnames";
import { noop } from "lodash";
import React from "react";
import ReactModal from "react-modal";

import * as styles from "./BasePopup.scss";

interface ComponentProps {
  /**
   * An optional CSS class name that is provided on the root element of the popup
   * that is rendered on the DOM.
   */
  className?: string;

  children: React.ReactNode;

  /**
   * Whether or not this popup is currently open.
   */
  isOpen: boolean;

  /**
   * A callback that can be invoked to request that this popup be closed.
   */
  onRequestClose: () => void;
}

function BasePopup({
  children,
  className,
  isOpen,
  onRequestClose,
}: ComponentProps): React.ReactElement {
  return (
    <ReactModal
      className={classnames(styles.popup, className)}
      overlayClassName={styles.overlay}
      isOpen={isOpen}
      onRequestClose={isOpen ? onRequestClose : noop}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      {children}
    </ReactModal>
  );
}

export default BasePopup;
