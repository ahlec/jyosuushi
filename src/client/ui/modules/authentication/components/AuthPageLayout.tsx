import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./AuthPageLayout.scss";

interface ComponentProps {
  children: React.ReactNode;
  purpose: MessageDescriptor | null;
  title: MessageDescriptor;
}

function AuthPageLayout({
  children,
  purpose,
  title,
}: ComponentProps): React.ReactElement {
  return (
    <div className={styles.authPageLayout}>
      <h1 className={styles.pageHeader}>
        <FormattedMessage {...title} />
      </h1>
      {purpose && (
        <p className={styles.purpose}>
          <FormattedMessage {...purpose} />
        </p>
      )}
      {children}
    </div>
  );
}

export default AuthPageLayout;
