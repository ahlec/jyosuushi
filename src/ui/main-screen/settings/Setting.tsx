import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import * as styles from "./Setting.scss";

interface ComponentProps {
  children: React.ReactNode;
  description: MessageDescriptor;
  header: MessageDescriptor;
}

function Setting({
  children,
  description,
  header,
}: ComponentProps): React.ReactElement {
  return (
    <div>
      <h3 className={styles.header}>
        <FormattedMessage {...header} />
      </h3>
      <div className={styles.description}>
        <FormattedMessage {...description} />
      </div>
      {children}
    </div>
  );
}

export default Setting;
