import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./ErrorDisplay.scss";

interface ComponentProps {
  text: MessageDescriptor;
  variant: "form-error" | "field-error";
}

function ErrorDisplay({ text, variant }: ComponentProps): React.ReactElement {
  return (
    <div
      className={classnames(
        styles.errorDisplay,
        variant === "form-error" && styles.variantForm,
        variant === "field-error" && styles.variantField
      )}
    >
      <FormattedMessage {...text} />
    </div>
  );
}

export default ErrorDisplay;
