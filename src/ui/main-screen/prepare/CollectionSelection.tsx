import React, { useCallback } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { CounterCollection } from "@jyosuushi/interfaces";

import CollectionToggleButton from "./CollectionToggleButton";

import * as styles from "./CollectionSelection.scss";

interface ComponentProps {
  /**
   * A readonly array of all counter collections available.
   */
  collections: readonly CounterCollection[];

  /**
   * An immutable set of IDs (all of which are guaranteed to correspond to
   * collections defined in {@link ComponentProps.collections} that represent
   * the collections the user has currently toggled on for the quiz.
   */
  currentlySelectedCollectionIds: ReadonlySet<string>;

  /**
   * A callback that should be invoked whenever the user has made some change
   * to which collections are selected. The value passed in to the callback
   * should be the complete set of all collections that should be selected
   * (that is, the set with all mutations already applied to it).
   */
  onSelectionChange: (next: ReadonlySet<string>) => void;
}

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage: "Collections",
    id: "preparePage.CollectionSelection.header",
  },
  subheader: {
    defaultMessage: "(select 1 or more)",
    id: "preparePage.CollectionSelection.subheader",
  },
});

function CollectionSelection({
  collections,
  currentlySelectedCollectionIds,
  onSelectionChange,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleCollectionToggled = useCallback(
    (collectionId: string): void => {
      const next = new Set(currentlySelectedCollectionIds);
      if (next.has(collectionId)) {
        next.delete(collectionId);
      } else {
        next.add(collectionId);
      }

      onSelectionChange(next);
    },
    [currentlySelectedCollectionIds, onSelectionChange]
  );

  // Render the component
  return (
    <div className={styles.collectionSelection}>
      <div className={styles.fieldset}>
        <div className={styles.header}>
          <FormattedMessage {...INTL_MESSAGES.header} tagName="strong" />{" "}
          <span className={styles.subheader}>
            <FormattedMessage {...INTL_MESSAGES.subheader} />
          </span>
        </div>
        {collections.map(
          (collection): React.ReactElement => (
            <CollectionToggleButton
              key={collection.id}
              collectionId={collection.id}
              name={collection.name}
              numCounters={collection.counterIds.length}
              isSelected={currentlySelectedCollectionIds.has(collection.id)}
              onToggle={handleCollectionToggled}
            />
          )
        )}
      </div>
    </div>
  );
}

export default CollectionSelection;
