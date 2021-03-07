import classnames from "classnames";
import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import IconNewCollection from "./icon-new-collection.svg";

import styles from "./CreateCollectionTile.scss";

const INTL_MESSAGES = defineMessages({
  buttonText: {
    defaultMessage: "New Custom Collection",
    id: "explore.landing.CreateCollectionTile.buttonText",
  },
});

interface ComponentProps {
  isModalOpen: boolean;
  onClick: () => void;
}

function CreateCollectionTile({
  isModalOpen,
  onClick,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Handle events
  const handleMouseOver = useCallback((): void => setIsHovered(true), []);
  const handleMouseOut = useCallback((): void => setIsHovered(false), []);

  // Render the component
  return (
    <button
      className={classnames(
        styles.tile,
        (isHovered || isModalOpen) && styles.active
      )}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
    >
      <IconNewCollection className={styles.icon} />
      <div className={styles.text}>
        <FormattedMessage {...INTL_MESSAGES.buttonText} />
      </div>
    </button>
  );
}

export default CreateCollectionTile;
