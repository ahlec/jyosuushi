import classnames from "classnames";
import React, { useCallback } from "react";

import IconCheck from "@jyosuushi/ui/main-screen/check.svg";

import AsyncButton from "@jyosuushi/ui/components/AsyncButton";
import LoadingSpinner from "@jyosuushi/ui/components/LoadingSpinner";

import styles from "./ToggleMembershipButton.scss";

interface ComponentProps {
  /**
   * A boolean which indicates whether the counter in question is currently
   * found in this collection or not.
   */
  isCounterInCollection: boolean;

  /**
   * A callback which will be invoked if the user has attempted to change
   * whether the counter in question is in this collection or not.
   */
  onToggle: () => Promise<void>;
}

function ToggleMembershipButton({
  isCounterInCollection,
  onToggle,
}: ComponentProps): React.ReactElement {
  // Determine how to render the contents of the button
  const renderContents = useCallback(
    (isLoading: boolean): React.ReactElement =>
      isLoading ? (
        <LoadingSpinner color="blue" size={18} thickness={3} />
      ) : (
        <IconCheck
          className={classnames(
            styles.icon,
            isCounterInCollection
              ? styles.alreadyInCollection
              : styles.notInCollection
          )}
        />
      ),
    [isCounterInCollection]
  );

  // Render the component
  return (
    <AsyncButton className={styles.button} onClick={onToggle}>
      {renderContents}
    </AsyncButton>
  );
}

export default ToggleMembershipButton;
