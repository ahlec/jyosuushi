import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import * as styles from "./FormButton.scss";

interface ComponentProps {
  action: "submit" | "reset" | (() => void);

  /**
   * An optional boolean to indicate whether this button is disabled
   * or not. If true, the button will visually be represented in a
   * disabled state, and will have no effect if interacted with.
   *
   * Defaults to false.
   */
  disabled?: boolean;
  text: MessageDescriptor;
  variant: "primary";
}

function FormButton({
  action,
  disabled = false,
  text,
  variant,
}: ComponentProps): React.ReactElement {
  // Interpret the action property
  let type: "submit" | "reset" | "button";
  let handleClick: (() => void) | undefined;
  switch (action) {
    case "submit": {
      type = "submit";
      handleClick = undefined;
      break;
    }
    case "reset": {
      type = "reset";
      handleClick = undefined;
      break;
    }
    default: {
      type = "button";
      handleClick = action;
      break;
    }
  }

  // Render the component
  return (
    <StandardButton
      className={classnames(
        styles.formButton,
        variant === "primary" && styles.variantPrimary,
      )}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      <FormattedMessage {...text} />
    </StandardButton>
  );
}

export default FormButton;
