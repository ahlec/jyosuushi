import React from "react";
import { FormattedMessage, FormattedDate, MessageDescriptor } from "react-intl";

import { AcceptedValueType } from "./types";

import styles from "./SubtitleEntry.scss";

interface ComponentProps {
  message: MessageDescriptor;
  value: AcceptedValueType;
}

function FormattedMessageBold(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return <strong className={styles.bold}>{chunks}</strong>;
}

function SubtitleEntry({ message, value }: ComponentProps): React.ReactElement {
  // Determine how value should be rendered
  let reactValue: string | React.ReactElement;
  if (value instanceof Date || typeof value === "number") {
    reactValue = <FormattedDate value={value} />;
  } else {
    reactValue = value;
  }

  // Render the component
  return (
    <span>
      <FormattedMessage
        {...message}
        values={{
          bold: FormattedMessageBold,
          value: reactValue,
        }}
      />
    </span>
  );
}

export default SubtitleEntry;
