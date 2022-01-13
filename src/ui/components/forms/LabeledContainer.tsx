import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./LabeledContainer.scss";

type AllowedChildType = React.ReactElement | false | undefined | null;

interface ComponentProps {
  children: AllowedChildType | readonly AllowedChildType[];
  label: MessageDescriptor;
}

function LabeledContainer({
  children,
  label,
}: ComponentProps): React.ReactElement {
  return (
    <label className={styles.labeledContainer}>
      <div className={styles.label}>
        <FormattedMessage {...label} />
      </div>
      {children}
    </label>
  );
}

export default LabeledContainer;
