import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor, PrimitiveType } from "react-intl";

import * as styles from "./ErrorDisplay.scss";

interface ComponentProps {
  text: MessageDescriptor;
  values: Record<string, React.ReactNode | PrimitiveType> | undefined;
  variant: "form-error" | "field-error";
}

function ErrorDisplay({
  text,
  values,
  variant,
}: ComponentProps): React.ReactElement {
  return (
    <div
      className={classnames(
        styles.errorDisplay,
        variant === "form-error" && styles.variantForm,
        variant === "field-error" && styles.variantField,
      )}
    >
      <FormattedMessage {...text} values={values} />
    </div>
  );
}

export default ErrorDisplay;
