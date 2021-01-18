import classnames from "classnames";
import React, { useCallback } from "react";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import IconCheck from "@jyosuushi/ui/main-screen/check.svg";

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
  onAddToCollection: (collectionId: string) => void;

  /**
   * A callback which will be invoked if the user has indicated that they
   * wish to remove the current counter from this collection.
   *
   * In general, this won't be called when
   * {@link ComponentProps.isCounterInCollection} is false.
   */
  onRemoveFromCollection: (collectionId: string) => void;
}

function CollectionRow({
  collection,
  isCounterInCollection,
  onAddToCollection,
  onRemoveFromCollection,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleToggle = useCallback((): void => {
    if (isCounterInCollection) {
      onRemoveFromCollection(collection.id);
      return;
    }

    onAddToCollection(collection.id);
  }, [
    collection.id,
    isCounterInCollection,
    onAddToCollection,
    onRemoveFromCollection,
  ]);

  // Render the component
  return (
    <div className={styles.collectionRow}>
      <IconCheck
        className={classnames(
          styles.toggleIcon,
          isCounterInCollection && styles.inCollection
        )}
        onClick={handleToggle}
      />
      <div className={styles.name}>{collection.name}</div>
    </div>
  );
}

export default CollectionRow;
