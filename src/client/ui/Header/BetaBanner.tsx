import classnames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./BetaBanner.scss";

interface ComponentProps {
  className: string;
}

function BetaBanner({ className }: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.betaBanner, className)}>
      <FormattedMessage id="header.betaBanner.contents" defaultMessage="Beta" />
    </div>
  );
}

export default BetaBanner;
