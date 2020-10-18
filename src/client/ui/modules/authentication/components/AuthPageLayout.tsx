import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./AuthPageLayout.scss";

interface ComponentProps {
  children: React.ReactNode;
  purpose: MessageDescriptor | null;
  purposeValues?: Record<string, unknown>;
  title: MessageDescriptor;
}

function AuthPageLayout({
  children,
  purpose,
  purposeValues,
  title,
}: ComponentProps): React.ReactElement {
  return (
    <div className={styles.authPageLayout}>
      <h1 className={styles.pageHeader}>
        <FormattedMessage {...title} />
      </h1>
      {purpose && (
        <p className={styles.purpose}>
          <FormattedMessage {...purpose} values={purposeValues} />
        </p>
      )}
      {children}
    </div>
  );
}

export default AuthPageLayout;
