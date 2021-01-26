import classnames from "classnames";
import React from "react";
import { MessageDescriptor } from "react-intl";

import ActionBarItem from "./ActionBarItem";

import styles from "./ActionBar.scss";

export interface ActionBarItemDefinition {
  icon: SvgIcon;
  onClick: () => void;
  text: MessageDescriptor;
}

interface ComponentProps {
  className?: string;
  items: readonly ActionBarItemDefinition[];
}

function ActionBar({
  className,
  items,
}: ComponentProps): React.ReactElement | null {
  if (!items.length) {
    return null;
  }

  return (
    <div className={classnames(styles.container, className)}>
      {items.map((item, index) => [
        index > 0 && (
          <span key={`separator-${index}`} className={styles.separator}>
            |
          </span>
        ),
        <ActionBarItem
          key={index}
          icon={item.icon}
          onClick={item.onClick}
          text={item.text}
        />,
      ])}
    </div>
  );
}

export default ActionBar;
