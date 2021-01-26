import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./ActionBarItem.scss";

interface ComponentProps {
  icon: SvgIcon;
  onClick: () => void;
  text: MessageDescriptor;
}

function ActionBarItem({
  icon: Icon,
  onClick,
  text,
}: ComponentProps): React.ReactElement {
  return (
    <button className={styles.container} onClick={onClick}>
      <Icon className={styles.icon} />
      <FormattedMessage {...text} />
    </button>
  );
}

export default ActionBarItem;
