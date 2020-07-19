import classnames from "classnames";
import { clamp } from "lodash";
import React, { useEffect } from "react";

import IconClose from "@jyosuushi/icons/close.svg";

import { ONE_SECOND } from "@jyosuushi/constants";

import { Toast } from "./types";
import useToast from "./useToast";

import "./ToastDisplay.scss";

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

function ToastDisplay({
  className,
  toast,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const { closeToast } = useToast();

  // Determine how long the toast should be displayed for, and then start
  // a time-to-live timer
  useEffect(() => {
    const timeToRead =
      TIME_TO_READ_FLAT_OFFSET +
      TIME_TO_READ_PER_CHARACTER * toast.message.length;
    const displayTime = clamp(timeToRead, MIN_DISPLAY_TIME, MAX_DISPLAY_TIME);

    const timeoutId = window.setTimeout(
      (): void => closeToast(toast.id),
      displayTime
    );
    return (): void => window.clearTimeout(timeoutId);
  }, [toast.id, closeToast]);

  // Handle the user dismissing this toast
  const handleDismissClick = (): void => closeToast(toast.id);

  // Render the component
  return (
    <div className={classnames("ToastDisplay", toast.variant, className)}>
      <div className="message">{toast.message}</div>
      <div className="dismiss-container">
        <IconClose className="icon" onClick={handleDismissClick} />
      </div>
    </div>
  );
}

export default ToastDisplay;
