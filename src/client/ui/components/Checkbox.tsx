import classnames from "classnames";
import * as React from "react";

import { KeyCode } from "@jyosuushi/constants";

import CheckIcon from "@jyosuushi/ui/main-screen/check.svg";
import CircleIcon from "@jyosuushi/ui/main-screen/circle.svg";

import styles from "./Checkbox.scss";

interface ComponentProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

function Checkbox({
  checked,
  label,
  onChange,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleClick = (): void => onChange(!checked);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onChange(!checked);
        break;
      }
    }
  };

  // Render component
  return (
    <div
      className={classnames(styles.checkbox, checked && styles.checked)}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
    >
      {checked ? (
        <CheckIcon className={styles.icon} />
      ) : (
        <CircleIcon className={styles.icon} />
      )}
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default Checkbox;
