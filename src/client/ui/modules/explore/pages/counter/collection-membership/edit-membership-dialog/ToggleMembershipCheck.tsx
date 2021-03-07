import classnames from "classnames";
import React from "react";

import IconCheck from "@jyosuushi/ui/main-screen/check.svg";

import LoadingSpinner from "@jyosuushi/ui/components/LoadingSpinner";

import styles from "./ToggleMembershipCheck.scss";

export type CheckState = "in-collection" | "not-in-collection" | "toggling";

interface ComponentProps {
  /**
   * A string representing the current state that this check representation
   * should display as.
   */
  state: CheckState;
}

function ToggleMembershipCheck({ state }: ComponentProps): React.ReactElement {
  // Determine the contents of this component
  let contents: React.ReactElement;
  switch (state) {
    case "toggling": {
      contents = <LoadingSpinner color="blue" size={18} thickness={3} />;
      break;
    }
    case "in-collection":
    case "not-in-collection": {
      contents = (
        <IconCheck
          className={classnames(
            styles.icon,
            state === "in-collection"
              ? styles.alreadyInCollection
              : styles.notInCollection
          )}
        />
      );

      break;
    }
  }

  // Render the component
  return <div className={styles.container}>{contents}</div>;
}

export default ToggleMembershipCheck;
