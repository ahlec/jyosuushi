import React from "react";

import styles from "./ActionBar.scss";

type AllowedChildrenTypes = React.ReactElement | undefined;

interface ComponentProps {
  children: AllowedChildrenTypes | readonly AllowedChildrenTypes[];
}

function ActionBar({ children }: ComponentProps): React.ReactElement {
  return <div className={styles.actionBar}>{children}</div>;
}

export default ActionBar;
