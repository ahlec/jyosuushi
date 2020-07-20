import classnames from "classnames";
import React from "react";

import Localization from "@jyosuushi/localization";

import styles from "./BetaBanner.scss";

interface ComponentProps {
  className: string;
  localization: Localization;
}

function BetaBanner({
  className,
  localization,
}: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.betaBanner, className)}>
      {localization.beta}
    </div>
  );
}

export default BetaBanner;
