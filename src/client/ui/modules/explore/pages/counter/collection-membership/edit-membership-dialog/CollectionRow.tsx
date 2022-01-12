import { noop } from "lodash";
import React, { useCallback, useState } from "react";

import { UserCounterCollection } from "@jyosuushi/interfaces";

import ToggleMembershipCheck, { CheckState } from "./ToggleMembershipCheck";

import styles from "./CollectionRow.scss";

interface ComponentProps {
  /**
   * The custom user collection that this row represents and allows for
   * manipulation of.
   */
  collection: UserCounterCollection;

  /**
   * A boolean which indicates whether the counter in question is currently
   * found in this collection or not.
   */
  isCounterInCollection: boolean;

  /**
   * A callback which will be invoked if the user has indicated that they
   * wish to add the current counter to this collection.
   *
   * In general, this won't be called when
   */
  onAddToCollection: (collectionId: string) => Promise<void>;

  /**
   * A callback which will be invoked if the user has indicated that they
   * wish to remove the current counter from this collection.
   *
   * In general, this won't be called when
   * {@link ComponentProps.isCounterInCollection} is false.
   */
  onRemoveFromCollection: (collectionId: string) => Promise<void>;
}

function CollectionRow({
  collection,
  isCounterInCollection,
  onAddToCollection,
  onRemoveFromCollection,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isPerforming, setIsPerforming] = useState<boolean>(false);

  // Handle events
  const handleAdd = useCallback(async (): Promise<void> => {
    try {
      setIsPerforming(true);
      await onAddToCollection(collection.id);
    } finally {
      setIsPerforming(false);
    }
  }, [collection.id, onAddToCollection]);

  const handleRemove = useCallback(async (): Promise<void> => {
    try {
      setIsPerforming(true);
      await onRemoveFromCollection(collection.id);
    } finally {
      setIsPerforming(false);
    }
  }, [collection.id, onRemoveFromCollection]);

  // Determine the current state to display
  let checkState: CheckState;
  if (isPerforming) {
    checkState = "toggling";
  } else {
    checkState = isCounterInCollection ? "in-collection" : "not-in-collection";
  }

  // Determine which callback should be used
  let buttonCallback: () => void;
  switch (checkState) {
    case "toggling": {
      buttonCallback = noop;
      break;
    }
    case "not-in-collection": {
      buttonCallback = handleAdd;
      break;
    }
    case "in-collection": {
      buttonCallback = handleRemove;
      break;
    }
  }

  // Render the component
  return (
    <button className={styles.collectionRow} onClick={buttonCallback}>
      <ToggleMembershipCheck state={checkState} />
      <div className={styles.name}>{collection.name}</div>
    </button>
  );
}

export default CollectionRow;
