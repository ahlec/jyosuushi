import classnames from "classnames";
import { clamp } from "lodash";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import IconClose from "@jyosuushi/icons/close.svg";

import { ONE_SECOND } from "@jyosuushi/constants";

import { Toast, ToastVariant } from "./types";
import useToast from "./useToast";

import * as styles from "./ToastDisplay.scss";

interface ComponentProps {
  /**
   * A CSS class name that will be included on the root element
   * rendered by this component.
   */
  className: string;

  /**
   * The toast that should be displayed in this component.
   */
  toast: Toast;
}

const MIN_DISPLAY_TIME = ONE_SECOND * 4;
const MAX_DISPLAY_TIME = ONE_SECOND * 16;

const TIME_TO_READ_FLAT_OFFSET = ONE_SECOND * 2;
const TIME_TO_READ_PER_CHARACTER = 75;

const VARIANT_TO_CSS_CLASS_NAME: { [variant in ToastVariant]: string } = {
  success: styles.success,
};

function ToastDisplay({
  className,
  toast,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const intl = useIntl();
  const { closeToast } = useToast();

  // Determine how long the toast should be displayed for, and then start
  // a time-to-live timer
  useEffect(() => {
    const timeToRead =
      TIME_TO_READ_FLAT_OFFSET +
      TIME_TO_READ_PER_CHARACTER * intl.formatMessage(toast.message).length;
    const displayTime = clamp(timeToRead, MIN_DISPLAY_TIME, MAX_DISPLAY_TIME);

    const timeoutId = window.setTimeout(
      (): void => closeToast(toast.id),
      displayTime,
    );
    return (): void => window.clearTimeout(timeoutId);
  }, [intl, toast.id, toast.message, closeToast]);

  // Handle the user dismissing this toast
  const handleDismissClick = (): void => closeToast(toast.id);

  // Render the component
  return (
    <div
      className={classnames(
        styles.toastDisplay,
        VARIANT_TO_CSS_CLASS_NAME[toast.variant],
        className,
      )}
    >
      <FormattedMessage {...toast.message}>
        {(text) => <div className={styles.message}>{text}</div>}
      </FormattedMessage>
      <div className={styles.dismissContainer}>
        <IconClose className={styles.icon} onClick={handleDismissClick} />
      </div>
    </div>
  );
}

export default ToastDisplay;
