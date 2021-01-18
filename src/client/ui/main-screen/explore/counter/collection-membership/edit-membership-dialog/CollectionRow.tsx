import React, { useCallback } from "react";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import ToggleMembershipButton from "./ToggleMembershipButton";

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
  // Handle events
  const handleAdd = useCallback(
    (): Promise<void> => onAddToCollection(collection.id),
    [collection.id, onAddToCollection]
  );

  const handleRemove = useCallback(
    (): Promise<void> => onRemoveFromCollection(collection.id),
    [collection.id, onRemoveFromCollection]
  );

  // Render the component
  return (
    <div className={styles.collectionRow}>
      <ToggleMembershipButton
        isCounterInCollection={isCounterInCollection}
        onToggle={isCounterInCollection ? handleRemove : handleAdd}
      />
      <div className={styles.name}>{collection.name}</div>
    </div>
  );
}

export default CollectionRow;
