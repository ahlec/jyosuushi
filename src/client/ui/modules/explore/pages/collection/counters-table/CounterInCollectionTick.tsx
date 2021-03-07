import classnames from "classnames";
import React from "react";

import CheckIcon from "@jyosuushi/ui/main-screen/check.svg";

import styles from "./CounterInCollectionTick.scss";

interface ComponentProps {
  className: string;
}

function CounterInCollectionTick({
  className,
}: ComponentProps): React.ReactElement {
  return <CheckIcon className={classnames(styles.icon, className)} />;
}

export default CounterInCollectionTick;
