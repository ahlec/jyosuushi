import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./ProfilePageField.scss";

type ValidElement = React.ReactElement | string | false;

interface ComponentProps {
  children: ValidElement | ValidElement[];
  className?: string;
  header: MessageDescriptor;
}

function ProfilePageField({
  children,
  className,
  header,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={classnames(styles.profilePageField, className)}>
      <div className={styles.header}>
        <FormattedMessage {...header} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default ProfilePageField;
