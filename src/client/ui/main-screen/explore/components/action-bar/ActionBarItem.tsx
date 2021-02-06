import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./ActionBarItem.scss";

interface ComponentProps {
  icon: SvgIcon;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  text: MessageDescriptor;
}

function ActionBarItem({
  icon: Icon,
  isActive,
  isDisabled,
  onClick,
  text,
}: ComponentProps): React.ReactElement {
  return (
    <button
      className={classnames(styles.container, isActive && styles.active)}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon className={styles.icon} />
      <FormattedMessage {...text} />
    </button>
  );
}

export default ActionBarItem;
