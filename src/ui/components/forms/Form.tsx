import classnames from "classnames";
import React, { useCallback } from "react";

import * as styles from "./Form.scss";

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: (() => void) | (() => Promise<void>);
}

function Form({
  children,
  className,
  onSubmit,
}: ComponentProps): React.ReactElement {
  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  return (
    <form
      className={classnames(styles.form, className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
