import classnames from "classnames";
import React from "react";

import styles from "./StandardButton.scss";

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "reset" | "submit";
}

function StandardButton({
  className,
  children,
  disabled,
  onClick,
  type,
}: ComponentProps): React.ReactElement {
  return (
    <button
      className={classnames(styles.standardButton, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default StandardButton;
