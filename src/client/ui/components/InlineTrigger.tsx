import classnames from "classnames";
import React from "react";
import { KeyCode } from "@jyosuushi/constants";

import styles from "./InlineTrigger.scss";

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  onTrigger: () => void;
}

/**
 * A component that looks like an <a> element or Link element, but which
 * when clicked or interacted with will trigger some event rather than
 * navigating to a new loation.
 */
function InlineTrigger({
  children,
  className,
  onTrigger,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onTrigger();
        break;
      }
    }
  };

  // Render the trigger
  return (
    <span
      className={classnames(styles.inlineTrigger, className)}
      onClick={onTrigger}
      onKeyPress={handleKeyPress}
      role="link"
      tabIndex={0}
    >
      {children}
    </span>
  );
}

export default InlineTrigger;
