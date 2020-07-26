import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./Setting.scss";

interface ComponentProps {
  children: React.ReactNode;
  className: string;
  description: MessageDescriptor;
  header: MessageDescriptor;
}

function Setting({
  children,
  className,
  description,
  header,
}: ComponentProps): React.ReactElement {
  return (
    <div className={className}>
      <FormattedMessage {...header}>
        {(text) => <h3 className={styles.header}>{text}</h3>}
      </FormattedMessage>
      <FormattedMessage {...description}>
        {(text) => <div className={styles.description}>{text}</div>}
      </FormattedMessage>
      {children}
    </div>
  );
}

export default Setting;
