import classnames from "classnames";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { KeyCode } from "@jyosuushi/constants";

import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import CheckIcon from "@jyosuushi/ui/main-screen/check.svg";

import styles from "./CollectionToggleButton.scss";

interface ComponentProps {
  collectionId: string;
  isSelected: boolean;
  name: string;
  numCounters: number;
  onToggle: (collectionId: string) => void;
}

const INTL_MESSAGES = defineMessages({
  collectionSize: {
    defaultMessage: "{size, plural, one {# counter} other {# counters}}",
    id: "preparePage.CollectionToggleButton.collectionSizeLabel",
  },
  viewContentsLink: {
    defaultMessage: "View Details",
    id: "preparePage.CollectionToggleButton.viewContentsLink",
  },
});

function CollectionToggleButton({
  collectionId,
  isSelected,
  name,
  numCounters,
  onToggle,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onToggle(collectionId);
        break;
      }
    }
  };

  const handleClick = () => onToggle(collectionId);

  // Render the component
  return (
    <div className={styles.collectionToggleButton}>
      <div
        className={classnames(styles.front, isSelected && styles.checked)}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <CheckIcon className={styles.check} />
        <div className={styles.name}>{name}</div>
        <FormattedMessage
          {...INTL_MESSAGES.collectionSize}
          values={{ size: numCounters }}
          tagName="div"
        />
      </div>
      <Link
        className={styles.viewDetails}
        to={getCounterCollectionPath(collectionId)}
      >
        <FormattedMessage {...INTL_MESSAGES.viewContentsLink} />
      </Link>
    </div>
  );
}

export default CollectionToggleButton;
